// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.4;

library Epoch {
    // -- Constants

    /** Coarse-grain all time calculations to two minutes accuracy
     *  This facilitates services interacting with the network
     *  as transaction execution has a reduced dependency on the
     *  timestamp provided in the block header, and can be easier
     *  predicted and cached.
     */
    uint256 internal constant TIME_RESOLUTION = 2 minutes;

    /** Arbitrary origin of counting epochs on 10 December 2021
     *  "Hope" is the thing with feathers -
     */
    uint256 internal constant ZERO_TIME = uint256(1639094400);

    /** Epoch duration preserves history of balances
     *  at the end of each epoch (sparsely stored);
     *  this is done to express fungeability of tokens
     *  in function of time: it prevents that older tokens
     *  can retroactively lose their fungeability because
     *  trust relations are retracted.
     */
    uint256 internal constant EPOCH_DURATION = 1 weeks;

    // -- Internal functions

    /** Rounds the block timestamp since ZERO_TIME
     *  down to the last two minutes (TIME_RESOLUTION) and
     *  returns the epoch time in seconds since ZERO_TIME.
     */
    function epochTime() internal view returns (uint256) {
        // solidity rounds to zero for integer division; all are uint256
        return
            ((block.timestamp - ZERO_TIME) / TIME_RESOLUTION) * TIME_RESOLUTION;
    }

    /** The current epoch is counted from a recent global ZERO_TIME in the past
     *  (but avoid unix zero time) so that it never returns epoch zero;
     *  offset is the seconds since start of current epoch.
     */
    function currentEpochAndOffset()
        internal
        view
        returns (uint256 epoch_, uint256 offset_)
    {
        uint256 time = epochTime();
        // again solidity rounds to zero, so epoch boundaries are as expected
        epoch_ = time / EPOCH_DURATION;
        offset_ = time - epoch_ * EPOCH_DURATION;
    }
}
