// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.4;

import "../lib/Math64x64.sol";

/**
 * @dev Proof-of-concept implementation of temporally discounted tokens.
 */
contract TimeToken {
    // -- Constants

    /** Coarse-grain all time calculations to two minutes accuracy
     *  This facilitates services interacting with the network
     *  as transaction execution has a reduced dependency on the
     *  timestamp provided in the block header, and can be easier
     *  predicted and cached.
     */
    uint256 public constant TIME_RESOLUTION = 2 minutes;

    /** One unit of new tokens is issued per period to the source address.
     *  Set to one unit per hour, which approximately matches 24 units per day
     *  as it doesn't account for leap seconds.
     */
    uint256 public constant ISSUANCE_PERIOD = 1 hours;

    /** Arbitrary origin of counting epochs on 10 December 2021
     *  "Hope" is the thing with feathers -
     */
    uint256 public constant ZERO_TIME = uint256(1639094400);

    /** Epoch duration preserves history of balances
     *  at the end of each epoch (sparsely stored);
     *  this is done to express fungeability of tokens
     *  in function of time: it prevents that older tokens
     *  can retroactively lose their fungeability because
     *  trust relations are retracted.
     */
    uint256 public constant EPOCH_DURATION = 1 weeks;

    /** Signup bonus to enable immediate usage for new nodes
     *  is expressed as a number of periods of additional
     *  issuances of tokens.
     */
    uint256 public constant TIME_BONUS = 2 days / ISSUANCE_PERIOD;

    /** Epoch sentinel for storing linked list is set to zero-th Epoch
     *  started at ZERO_TIME which is set in the past
     *  so that all epoch numbers are strictly positive.
     */
    // @dev: by setting the sentinel to zero,
    //       for all holders the linked list is by default instantiated
    //       and contains only the zero epoch
    uint256 public constant SENTINEL_EPOCHS = uint256(0);

    /** Store the signed 128-bit 64.64 representation of 1 as a constant */
    int128 public constant ONE_64x64 = int128(18446744073709551616);

    /** Decimals of tokens are set to 18 */
    uint8 public constant DECIMALS = uint8(18);

    /** EXA factor as 10^18 */
    uint256 public constant EXA = uint256(1000000000000000000);

    // -- Storage

    /** Immutable creation time stores when node has been created */
    uint256 public immutable creationTime;

    /** Half-time value of exponential decay of temporally discounted balances
     *  expressed as a reduction factor gamma
     *  which must be strict smaller than one.
     *    balance(t) = gamma^t * balance(t=0)
     *  gamma64x64 is the signed 128-bit numerator of gamma
     *  expressed as gamma64x64/2**64.
     */
    int128 public immutable gamma64x64;

    /** For calculating the issuance, gamma occurs as
     *    gamma^ISSUANCE_PERIOD in the formula
     *  so for clarity and gas-cost savings, calculate it once and store
     */
    int128 public immutable gammaIssuance64x64;

    /** Beta is a constant stored for re-use during the calculation
     *  of outstanding issuance, stored as a signed 128-bit numerator.
     *    beta = 1 / (1 - gamma')
     *  where gamma' is gammaIssuance64x64
     */
    int128 public immutable beta64x64;

    /** Issue source is address to which new tokens are issued */
    address private issueSource;

    /** Last issuance time stores last epoch time new issuances was given */
    uint256 public lastIssuanceTime;

    /** Holder epochs stores a linked list of the epochs
     *  in which the token holder has a balance
     *  holder => (epoch => epoch)
     */
    mapping(address => mapping(uint256 => uint256)) public holderEpochs;

    /** Last epochs stores the last epoch a holder has a balance at.
     *  No holder can have a balance at zero-th epoch,
     *  indicating zero total balance.
     *  holder => last epoch
     */
    mapping(address => uint256) public lastEpochs;

    /** Last epoch offsets stores the time offset
     *  since the start of the last epoch per holder
     *  holder => last epoch offset
     */
    mapping(address => uint256) public lastEpochOffsets;

    /** Balances per epoch per holder
     *  holder => (epoch => balance)
     */
    mapping(address => mapping(uint256 => uint256)) public epochBalances;

    /** Track total supply for sanity's sake,
     *  will stabilise at the asymptotic value
     *  which roughly equals the half-life tau expressed as gamma
     *    asymp total supply = exp(1/tau) / (exp(1/tau) - 1)
     *                       ~ tau
     *                       ~ - ln gamma
     *  IIF no tokens have been burned (recently)
     */
    uint256 private totalSupplyPrivate;

    /** Also total supply has to be discounted, so keep the timestamp
     *  at which last total supply was stored.
     */
    uint256 private totalSupplyTimestampPrivate;

    // -- External functions

    /** Constructor; replace later with setup function */
    constructor(address _issueSource, int128 _gamma64x64) {
        require(
            _issueSource != address(0),
            "Issue source must not be null address."
        );

        require(
            _gamma64x64 < ONE_64x64,
            "Gamma must be strictly smaller than one."
        );

        // Issue source is set for sourcing new tokens to
        issueSource = _issueSource;

        // register epoch time of creation of this node and
        // set last issuance time
        uint256 timestamp = epochTime();
        creationTime = timestamp;
        lastIssuanceTime = timestamp;

        // store the reduction factor gamma as a rational fraction
        // as signed 64.64-bit numerator
        gamma64x64 = _gamma64x64;

        // store the power of gamma for repeated use during issuance
        // as local variable first, because during constructor
        // we can't read the immutable variables, and we need to calc beta below
        int128 gammaIssuanceMemory = Math64x64.pow(
            _gamma64x64,
            ISSUANCE_PERIOD
        );
        gammaIssuance64x64 = gammaIssuanceMemory;

        // calculate beta as a constant used by the geometric sum
        // when issuing tokens:
        //   beta = 1 / (1 - gamma')
        int128 betaMemory = Math64x64.inv(
            Math64x64.sub(ONE_64x64, gammaIssuanceMemory)
        );
        beta64x64 = betaMemory;

        // Issue an initial balance of notes for the node owner
        uint256 initialSourceBalance = calculateIssuance(
            TIME_BONUS,
            gammaIssuanceMemory,
            betaMemory
        );

        // issue initial source tokens to current epoch
        // todo: this probably can be cleanly lifted into an internal mint
        //       but constructors are special so restructure
        //       after general mint is written
        (uint256 cEpoch, uint256 offset) = currentEpochAndOffset();
        // uint256 currentE = currentEpoch();
        epochBalances[_issueSource][cEpoch] = initialSourceBalance;
        lastEpochs[_issueSource] = cEpoch;
        lastEpochOffsets[_issueSource] = offset;
        // set forward-linked list for source
        holderEpochs[_issueSource][SENTINEL_EPOCHS] = cEpoch;
        // SENTINEL_EPOCHS is 0x00..00 so no need to set it.
        // holderEpochs[_issueSource][cEpoch] = SENTINEL_EPOCHS;
        // set total supply and its timestamp
        totalSupplyPrivate = initialSourceBalance;
        totalSupplyTimestampPrivate = timestamp;
    }

    // -- Public functions

    /** Returns the amount of tokens held by a token holder.
     *  The function signature follows ERC20 and ERC777,
     *  but returns the balance discounted to the time of querying.
     *  The query time is taken from the block timestamp,
     *  but rounded down to the last TIME_RESOLUTION (2 minutes).
     *  This makes services interacting with the tokens
     *  less sensitive to delays of queries.
     */
    function balanceOf(address _tokenHolder) public view returns (uint256) {
        uint256 lastEpoch = lastEpochs[_tokenHolder];
        // if last epoch is the zero-th epoch, then holder has no tokens
        if (lastEpoch == SENTINEL_EPOCHS) return uint256(0);
        uint256 timeLapse = timeLapseSinceEpochOffset(
            lastEpoch,
            lastEpochOffsets[_tokenHolder]
        );
        return balanceAtOffset(_tokenHolder, timeLapse);
    }

    /** Returns the amount of tokens held by a token holder,
     *  and additionally returns the timestamp in unix time
     *  of when this balance was calculated.
     *  This breaks the ERC20 interface but is intended for
     *  services to allow for accurate caching.
     */
    function balanceOfWithTime(address _tokenHolder)
        public
        view
        returns (uint256 balance_, uint256 unixTimestamp_)
    {
        uint256 lastEpoch = lastEpochs[_tokenHolder];
        unixTimestamp_ = ZERO_TIME + epochTime();
        // if last epoch is the zero-th epoch, then holder has no tokens
        if (lastEpoch == SENTINEL_EPOCHS) return (uint256(0), unixTimestamp_);
        // todo: we call epochTime() twice,
        //       so function signatures can be improved
        uint256 timeLapse = timeLapseSinceEpochOffset(
            lastEpoch,
            lastEpochOffsets[_tokenHolder]
        );
        balance_ = balanceAtOffset(_tokenHolder, timeLapse);
    }

    /** Rounds the block timestamp since ZERO_TIME
     *  down to the last hour (TIME_RESOLUTION) and
     *  returns the epoch time in seconds since ZERO_TIME.
     */
    function epochTime() public view returns (uint256) {
        // solidity rounds to zero for integer division; all are uint256
        return
            ((block.timestamp - ZERO_TIME) / TIME_RESOLUTION) * TIME_RESOLUTION;
    }

    /** The current epoch is counted from a recent global ZERO_TIME in the past
     *  (but avoid unix zero time) so that it never returns epoch zero;
     *  offset is the seconds since start of current epoch.
     */
    function currentEpochAndOffset()
        public
        view
        returns (uint256 epoch_, uint256 offset_)
    {
        uint256 time = epochTime();
        // again solidity rounds to zero, so epoch boundaries are as expected
        epoch_ = time / EPOCH_DURATION;
        offset_ = time - epoch_ * EPOCH_DURATION;
    }

    /** Returns the time counting from provided epoch and offset until
     *  current rounded timestamp.
     *  Reverts if epoch or offset result in a future time.
     */
    function timeLapseSinceEpochOffset(uint256 _epoch, uint256 _offset)
        public
        view
        returns (uint256)
    {
        (uint256 cEpoch, ) = currentEpochAndOffset();
        require(_epoch <= cEpoch, "Epoch cannot lie in the future.");
        uint256 currentTimestamp = epochTime();
        uint256 offsetTime = _epoch * EPOCH_DURATION + _offset;
        require(
            offsetTime <= currentTimestamp,
            "Offset cannot lie in the future."
        );
        return currentTimestamp - offsetTime;
    }

    // -- Internal functions

    /** issue new tokens per issuance period to the source address
     *  for the outstanding balance since last called
     */
    function issueToSource() internal {
        uint256 timestamp = epochTime();
        require(
            lastIssuanceTime + ISSUANCE_PERIOD < timestamp,
            "Issuance cannot be called again in one period."
        );

        // calculate the number of outstanding issuance periods that have passed
        uint256 outstandingIssuances = ((timestamp - lastIssuanceTime) /
            ISSUANCE_PERIOD);
        // update state early-on
        lastIssuanceTime = timestamp;

        uint256 outstandingBalance = calculateIssuance(
            outstandingIssuances,
            gammaIssuance64x64,
            beta64x64
        );
        mint(issueSource, outstandingBalance);
    }

    // -- Private functions

    /** mint creates new amount of tokens in the token holders account,
     *  and updates the last epoch of the holder. If the last epoch is
     *  still the current epoch, the existing balance is discounted and
     *  the new minted tokens are added.
     *  If the current epoch is past the last epoch, discount the last epoch
     *  and start new epoch for current epoch.
     */
    // todo: add additional ERC777 params and compliance
    function mint(address _holder, uint256 _amount) private {
        require(_holder != address(0), "ERC777: mint to the zero address");

        // todo: ERC777: call beforeTokenTransfer to msg.sender / operator

        uint256 timestamp = epochTime();
        // (uint256 cEpoch,) = currentEpochAndOffset();

        // update total supply
        totalSupplyPrivate = discountBalance(
            totalSupplyPrivate,
            timestamp - totalSupplyTimestampPrivate,
            gamma64x64
        );
        totalSupplyPrivate += _amount;
        totalSupplyTimestampPrivate = timestamp;

        // update the balance of the holder
        receiveTokens(_holder, _amount);
    }

    /** Receive tokens will update the epoch balances and
     *  add the amount of tokens to the holder account in the current epoch
     */
    function receiveTokens(
        address _holder,
        uint256 _amount // todo add ERC777 params
    ) private {
        (uint256 cEpoch, uint256 offset) = currentEpochAndOffset();
        uint256 lastEpoch = lastEpochs[_holder];

        if (lastEpoch == SENTINEL_EPOCHS) {
            // currently no balance, initiate current epoch as last epoch
            holderEpochs[_holder][SENTINEL_EPOCHS] = cEpoch;
            // this is redundant, but for completeness just now
            holderEpochs[_holder][cEpoch] = SENTINEL_EPOCHS;
            lastEpochs[_holder] = cEpoch;
            lastEpochOffsets[_holder] = offset;
            epochBalances[_holder][cEpoch] = _amount;
        } else if (lastEpoch < cEpoch) {
            // discount previous epoch, and receive in current
            uint256 timeToEpochEnd = EPOCH_DURATION - lastEpochOffsets[_holder];
            uint256 lastEpochBalance = epochBalances[_holder][lastEpoch];
            // discount last epoch balance to end of that epoch
            epochBalances[_holder][lastEpoch] = discountBalance(
                lastEpochBalance,
                timeToEpochEnd,
                gamma64x64
            );
            // set current epoch as new last epoch
            holderEpochs[_holder][lastEpoch] = cEpoch;
            // this is redundant, but for completeness just now
            holderEpochs[_holder][cEpoch] = SENTINEL_EPOCHS;
            lastEpochs[_holder] = cEpoch;
            lastEpochOffsets[_holder] = offset;
            epochBalances[_holder][cEpoch] = _amount;
        } else if (lastEpoch == cEpoch) {
            // discount existing amount and add new amount
            uint256 timeToEpochEnd = EPOCH_DURATION - lastEpochOffsets[_holder];
            uint256 lastEpochBalance = epochBalances[_holder][lastEpoch];
            epochBalances[_holder][lastEpoch] =
                discountBalance(lastEpochBalance, timeToEpochEnd, gamma64x64) +
                _amount;
            // update last epoch offset
            lastEpochOffsets[_holder] = offset;
        } else {
            // @dev: last epoch can not be bigger than current.
            assert(true);
        }
    }

    /** Calculate the outstanding balance given a number of issuance periods
     *  the params beta and gamma' are passed in so that we can call
     *  this function also from the constructor.
     */
    function calculateIssuance(
        uint256 _outstandingIssuances,
        int128 _gammaIssuance64x64,
        int128 _beta64x64
    ) private pure returns (uint256 outstandingBalance_) {
        // calculate outstanding balance, as a geometric sum
        //    SUM n=1..N : gamma'^(N-n) = (1 - gamma'^N) / (1 - gamma')
        //                              = (1 - gamma'^N) * beta
        //    where beta is a constant beta = 1 / (1 - gamma')
        // and where gamma' = gamma^ISSUANCE_PERIOD
        int128 outstandingBalanceFactor64x64 = Math64x64.mul(
            Math64x64.sub(
                ONE_64x64,
                Math64x64.pow(_gammaIssuance64x64, _outstandingIssuances)
            ),
            _beta64x64
        );

        // each issuance period issues one token,
        // and decimals is set to 18 orders (exa)
        outstandingBalance_ = Math64x64.mulu(
            outstandingBalanceFactor64x64,
            EXA
        );
    }

    /** balance at offset sums all balances discounted up to the offset time
     *  in the last epoch.
     *  Additional time lapse allows for a further discounting
     *  of the token holders balance for that amount of time.
     *  It is hence counted from token holder's last epoch's offset;
     *  if _additionalTimeLapse is zero, it is ignored.
     */
    function balanceAtOffset(address _tokenHolder, uint256 _additionalTimeLapse)
        private
        view
        returns (uint256 balanceAtOffset_)
    {
        // get the last epoch and the balance at offset in this epoch
        uint256 lastEpoch = lastEpochs[_tokenHolder];
        uint256 lastEpochBalanceAtOffset = epochBalances[_tokenHolder][
            lastEpoch
        ];

        uint256 balanceUpToOffset = discountBalance(
            balanceUpToEpoch(_tokenHolder, lastEpoch),
            lastEpochOffsets[_tokenHolder],
            gamma64x64
        );

        // sum both to obtain balance at offset of last epoch
        balanceAtOffset_ = lastEpochBalanceAtOffset + balanceUpToOffset;

        // if an additional time lapse is requested,
        // further discount the balance for that amount of time
        if (_additionalTimeLapse > 0) {
            balanceAtOffset_ = discountBalance(
                balanceAtOffset_,
                _additionalTimeLapse,
                gamma64x64
            );
        }
    }

    /** Balance up to epoch sums the balances of all epochs for a token holder
     *  up to, but not including the provided epoch number, and discounts
     *  the balance to the start of _upToEpoch.
     *  _upToEpoch must not be larger than lastEpoch of the token holder.
     */
    // @dev: caller must assure _tokenHolder is not null address
    function balanceUpToEpoch(address _tokenHolder, uint256 _upToEpoch)
        private
        view
        returns (uint256 balanceUpToEpoch_)
    {
        // handle calculating the possible offset of last epoch
        // in a different function, ie. balanceAtOffset
        require(
            _upToEpoch <= lastEpochs[_tokenHolder],
            "Epoch must be not exceed last epoch."
        );

        uint256 epoch = holderEpochs[_tokenHolder][SENTINEL_EPOCHS];
        balanceUpToEpoch_ = uint256(0);
        while (epoch < _upToEpoch && epoch != SENTINEL_EPOCHS) {
            // calculate the time in seconds up to the desired epoch
            uint256 deltaTime = (_upToEpoch - epoch - 1) * EPOCH_DURATION;
            // discount the historic epoch balance
            uint256 discountedBalance = discountBalance(
                epochBalances[_tokenHolder][epoch],
                deltaTime,
                gamma64x64
            );
            // and add it to the sum
            balanceUpToEpoch_ = balanceUpToEpoch_ + discountedBalance;

            // forward-linked-list, set next epoch
            epoch = holderEpochs[_tokenHolder][epoch];
        }
    }

    /** Discount balance by an amount of time, _period,
     *  and the reduction factor gamma.
     */
    function discountBalance(
        uint256 _balance,
        uint256 _timePeriod,
        int128 _gamma64x64
    ) private pure returns (uint256 discountedBalance_) {
        // exponentiate gamma^deltaT
        int128 reduction64x64 = Math64x64.pow(_gamma64x64, _timePeriod);
        // discount the balance from this epoch
        discountedBalance_ = Math64x64.mulu(reduction64x64, _balance);
    }
}
