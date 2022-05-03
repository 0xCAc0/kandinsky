// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.4;

import "../roots/IAxiom.sol";
import "./IGraphNode.sol";

contract Graph {
    // -- Constants

    /** To trust a node the trust epoch is set to max
     */
    uint256 public constant MAX_FUTURE_EPOCH = type(uint256).max;

    // -- Storage

    /** axiom offers the registry for factory deployed contracts
     *  and as such can be used to assert which are valid contracts
     *  to call upon.
     */
    IAxiom public immutable axiom;

    /* Circles stores the trusted nodes of a node in a linked list */
    mapping(IGraphNode => mapping(IGraphNode => IGraphNode)) public circles;

    /** Trust epochs maps the epochs at which trust expires
     *  for each node relative to the other nodes.
     *  Thus for all nodes, by default trust ended on the zero-th epoch; and,
     *  upon trusting the trustEpoch is set to MAX_INT256, effectively the
     *  infinite future.
     */
    // @dev: it might be worthwhile to set trust epochs into a finite future
    //       such that trust relations require explicit reaffirmation
    mapping(IGraphNode => mapping(IGraphNode => uint256)) public trustEpochs;

    constructor(IAxiom _axiom) {
        require(
            address(_axiom) != address(0),
            "Graph: axiom cannot be zero address."
        );
        axiom = _axiom;
    }

    /** trust registers a trust relation from the node caller
     *  to the provided node.
     */
    // @dev this signature breaks with the Circles v1 contract
    //      as it omits a "limit" percentage - this concept is not
    //      present here, as trust has been made binary.
    function trust(IGraphNode _node) external {
        IGraphNode center = IGraphNode(msg.sender);
        require(axiom.isNode(center), "Graph: caller must be registered node.");
        require(axiom.isNode(_node), "Graph: trusted node must be registered.");

        registerTrust(center, _node, MAX_FUTURE_EPOCH);
    }

    function untrust(IGraphNode _node) external {}

    // -- Private functions

    function registerTrust(
        IGraphNode _centerNode,
        IGraphNode _circleNode,
        uint256 trustEpoch
    ) private {}
}
