// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.4;

import "../fugit-tempus/Epoch.sol";
import "../roots/IAxiom.sol";
import "./IGraphNode.sol";

contract Graph is IGraph {
    // -- Constants

    /** Sentinel to mark the end of a linked list of nodes trusted */
    IGraphNode public constant SENTINEL_CIRCLE = IGraphNode(address(0x1));

    /** To trust a node the last trust epoch is set to max uint256
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

    // -- Function modifiers

    modifier onGraph(IGraphNode _node) {
        require(
            axiom.isNode(IGraphNode(msg.sender)),
            "Graph: caller must be registered node."
        );
        require(axiom.isNode(_node), "Graph: trusted node must be registered.");

        _;
    }

    // -- External functions

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
    function trust(IGraphNode _node) external onGraph(_node) {
        registerTrust(IGraphNode(msg.sender), _node, MAX_FUTURE_EPOCH);
    }

    function untrust(IGraphNode _node) external onGraph(_node) {
        (uint256 cEpoch, ) = Epoch.currentEpochAndOffset();

        // trust is set to expire after the next epoch
        expireTrust(IGraphNode(msg.sender), _node, cEpoch + 1);
    }

    /** isTrusted returns true if the registered trust expiration is
     *  in the current or a future epoch.
     */
    function isTrusted(IGraphNode _centerNode, IGraphNode _circleNode)
        external
        view
        override
        returns (bool)
    {
        (uint256 cEpoch, ) = Epoch.currentEpochAndOffset();
        return (trustEpochs[_centerNode][_circleNode] >= cEpoch);
    }

    function isMutuallyTrusted(IGraphNode _centerNode, IGraphNode _circleNode)
        external
        view
        override
        returns (bool)
    {
        (uint256 cEpoch, ) = Epoch.currentEpochAndOffset();
        return ((trustEpochs[_centerNode][_circleNode] >= cEpoch) &&
            (trustEpochs[_circleNode][_centerNode] >= cEpoch));
    }

    // -- Private functions

    function registerTrust(
        IGraphNode _centerNode,
        IGraphNode _circleNode,
        uint256 _trustEpoch
    ) private {
        (uint256 cEpoch, ) = Epoch.currentEpochAndOffset();
        require(
            _trustEpoch > cEpoch,
            "Graph: trust must be asserted up to a future epoch."
        );

        if (trustEpochs[_centerNode][_circleNode] < _trustEpoch) {
            // ensure circle node is (re)added to linked-list
            // as it may have been pruned from the linked-list
            // if it had expired
            insertNodeInCircle(_centerNode, _circleNode);
        }
        // update trust epoch of circle node
        trustEpochs[_centerNode][_circleNode] = _trustEpoch;

        // @dev: emit event Trust() here
    }

    function expireTrust(
        IGraphNode _centerNode,
        IGraphNode _circleNode,
        uint256 _expirationEpoch
    ) private {
        require(
            trustEpochs[_centerNode][_circleNode] > _expirationEpoch,
            "Graph: trust is already set to (have) expire(d)."
        );
        trustEpochs[_centerNode][_circleNode] = _expirationEpoch;

        // @dev: emit event Untrust() here
    }

    function insertNodeInCircle(IGraphNode _centerNode, IGraphNode _circleNode)
        private
    {
        if (circles[_centerNode][_circleNode] != IGraphNode(address(0))) {
            // node is already an element of the circle, do nothing
            return;
        }
        if (circles[_centerNode][SENTINEL_CIRCLE] == IGraphNode(address(0))) {
            // setup linked list first and add as first element
            // which points to sentinel
            circles[_centerNode][_circleNode] = SENTINEL_CIRCLE;
        } else {
            // if already initialised, new circle element points to
            // previously last element
            circles[_centerNode][_circleNode] = circles[_centerNode][
                SENTINEL_CIRCLE
            ];
        }
        // sentinel always points to last added element
        circles[_centerNode][SENTINEL_CIRCLE] = _circleNode;
    }
}
