// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.4;

import "./TimeToken.sol";
import "../graph/IGraphNode.sol";

/** Issuance Node is a node on the social graph
 *  which creates fungeability of the tokens
 *  through a transitive swap over trust connections.
 *  todo: Nodes need to be created from a factory with a proxy
 *        which must provide a registry of nodes with compatible code
 */
contract IssuanceNode is TimeToken, IGraphNode {
    // -- Storage

    /** Node owner to whom new notes are issued */
    address public immutable nodeOwner;

    // -- External functions

    constructor(address _nodeOwner, int128 _gamma64x64)
        TimeToken(_nodeOwner, _gamma64x64)
    {
        require(
            _nodeOwner != address(0),
            "Node owner must not be null address."
        );

        // the owner of this node will get the new notes issued on equal time
        nodeOwner = _nodeOwner;
    }

    function isTrusted(address _node) external pure override returns (bool) {
        return false;
    }
}
