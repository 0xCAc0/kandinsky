// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.4;

import "../roots/IAxiom.sol";
import "../graph/IGraphNode.sol";
import "./ITransport.sol";

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
contract PathTransfer is ITransport {
    // -- Storage

    /** axiom offers the registry for factory deployed contracts
     *  and as such can be used to assert which are valid contracts
     *  to call upon.
     */
    IAxiom public immutable axiom;

    /** pathBalancers is used as private storage during a single
     *  path validation to account the ins and outs for each avatar
     *  along the path.
     *  It is fully deleted before call completion.
     */
    mapping(address => int256) private pathBalancers;

    /** pathMarkers is an inefficient implementation of a marker to know whether
     *  this address is new or already seen along a set of segments that make a path.
     *  todo: this can be replaced with the 255th bit (MSB) of the pathBalancers mapping
     *        and restrict the maximum amount transferable per segment of a path
     */
    mapping(address => bool) private pathMarkers;

    // -- External functions

    constructor(IAxiom _axiom) {
        require(
            address(_axiom) != address(0),
            "PathTransfer: axiom cannot be zero address."
        );
        axiom = _axiom;
    }

    function transferThrough(
        address[] calldata _nodes,
        address[] calldata _froms,
        address[] calldata _tos,
        uint256[] calldata _amounts
    ) external view {
        uint256 segments = _nodes.length;
        require(segments > 0, "PathTransfer: path must have segments.");
        require(
            _froms.length == segments,
            "PathTransfer: array lengths froms must match nodes."
        );
        require(
            _tos.length == segments,
            "PathTransfer: array lengths tos must match nodes."
        );
        require(
            _amounts.length == segments,
            "PathTransfer: array lengths amounts must match nodes."
        );
        address[] memory seen;
        for (uint256 i = 0; i < segments; i++) {
            require(
                _amounts[i] <= uint256(type(int256).max),
                "PathTransfer: amount cannot exceed max int256."
            );
            require(
                _amounts[i] > 0,
                "PathTransfer: amount must be strictly positive."
            );
            address fromAvatar = _froms[i];
            address toAvatar = _tos[i];
            // the nodes in the trust graph are dual
            // to the edge of a segment in the path
            IGraphNode edge = IGraphNode(_nodes[i]);

            // look up associated node of toAvatar to query trust relationship
            IGraphNode toNode = axiom.registeredNode(toAvatar);
            require(
                toNode != IGraphNode(address(0)),
                "PathTransfer: toAvatar on segment is not registered."
            );

            require(
                toNode.isTrusted(edge),
                "PathTransfer: toAvatar doesn't trust edge along path."
            );
        }
    }
}
