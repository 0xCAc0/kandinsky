// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.4;

import "../roots/IAxiom.sol";
import "../graph/IGraphNode.sol";
import "./TimeToken.sol";

/** Issuance Node is a node on the social graph
 *  which creates fungeability of the tokens
 *  through a transitive swap over trust connections.
 *  todo: Nodes need to be created from a factory with a proxy
 *        which must provide a registry of nodes with compatible code
 */
contract IssuanceNode is TimeToken, IGraphNode {
    // -- Storage

    /** Axiom registers core compatibility between contracts */
    IAxiom public immutable axiom;

    /** Node owner to whom new notes are issued */
    address public immutable nodeOwner;

    // -- External functions

    constructor(
        IAxiom _axiom,
        address _nodeOwner,
        int128 _gamma64x64
    ) TimeToken(_nodeOwner, _gamma64x64) {
        require(
            _axiom != IAxiom(address(0)),
            "Axiom must not be null address."
        );
        require(
            _nodeOwner != address(0),
            "Node owner must not be null address."
        );

        // store axiom reference for registry calls
        axiom = _axiom;

        // the owner of this node will get the new notes issued on equal time
        nodeOwner = _nodeOwner;
    }

    function isTrusted(
        IGraphNode /* _node */
    ) external pure override returns (bool) {
        return false;
    }
}
