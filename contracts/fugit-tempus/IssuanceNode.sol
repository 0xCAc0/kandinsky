// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.4;

import "../roots/IAxiom.sol";
import "../graph/IGraphNode.sol";
import "../graph/IGraph.sol";
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

    IGraph public immutable graph;

    /** Node owner to whom new notes are issued */
    address public immutable nodeOwner;

    // -- External functions

    constructor(
        IAxiom _axiom,
        address _nodeOwner,
        IGraph _graph,
        int128 _gamma64x64
    ) TimeToken(_nodeOwner, _gamma64x64) {
        require(
            _axiom != IAxiom(address(0)),
            "Axiom must not be null address."
        );
        require(
            _graph != IGraph(address(0)),
            "Graph must not be null address."
        );
        require(
            _nodeOwner != address(0),
            "Node owner must not be null address."
        );

        // store axiom reference for registry calls
        axiom = _axiom;

        // store graph contract for (de)registering trust
        graph = _graph;

        // the owner of this node will get the new notes issued on equal time
        nodeOwner = _nodeOwner;
    }

    function trusts(IGraphNode _node) external view override returns (bool) {
        return graph.isTrusted(this, _node);
    }
}
