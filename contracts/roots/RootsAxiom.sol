// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.4;

import "../fugit-tempus/IssuanceNode.sol";
import "./Avatars.sol";
// import "../proxy/ProxyFactory.sol";

// todo: for proof-of-concept don't use a ProxyFactory yet,
//       nor care about upgradability, and hold avatars
//       internally in Roots contract
// contract RootsAxiom is ProxyFactory {
contract RootsAxiom is Avatars {
    // -- Storage

    /** Store the core reduction factor as a constant
     *  across the graph in a simple first implementation.
     *  The halflife of the time tokens is set to roughly one month.
     *  The units of time are in seconds, so halflife
     *    tau = 365 [days/yr] / 12 [months/yr] * 84600 [sec/day]
     *        = 2628000 seconds
     *  The reduction factor gamma = exp(-1 [s] / tau [s]), or
     *    gamma = 0.9999996194825685
     *  and expressing it as a signed 128-bit 64.64
     *    gamma64x64 = gamma * 2**64
     *               = 18446737054401878016
     */
    int128 public constant GAMMA_64x64 = 18446737054401878016;

    // -- External functions

    // solhint-disable-next-line 
    constructor() {

    }

    /** createNode can be called once by any address
     *  and it will create a new IssuanceNode (todo: make a proxy)
     *  and set the caller to the owner of the node.
     *  The caller addess is stored as an avatar with its
     *  corresponding node.
     */
    function createNode() external {
        require(
            !isAvatar(msg.sender),
            "Sender cannot already be an avatar."
        );
        IssuanceNode newNode = new IssuanceNode(msg.sender, GAMMA_64x64);

        register(msg.sender, address(newNode));
    }

}
