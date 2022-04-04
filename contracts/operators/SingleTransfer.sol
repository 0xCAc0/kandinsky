// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.4;

import "./ITranssport.sol";

/** SingleTransfer implements the same interface
 *  as the multiple-path-based single transitive transfer
 *  found in the hub contract of Circles project ('transferThrough(...)').
 *  By keeping the same interface, the path finder already implemented
 *  can be reused as a solver for finding paths over the graph.
 *  (see https://github.com/chriseth/pathfinder)
 *  The original hub contract requires the source is the message
 *  sender, but SingleTransfer - while backwards compatible -
 *  can separate the intent from the path that solves for a submitted
 *  intent to transfer tokens from source to destination. 
 */
contract SingleTransfer is ITransport {
    constructor() {}

    function transferThrough(

    )
}
