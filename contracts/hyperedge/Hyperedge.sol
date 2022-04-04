// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.4;

/** Hyperedge can be overlayed over the trust graph
 *  to define a different locality measure specific
 *  for a given dApp.
 *  (eg. path finders, web wallet solvers, storage etc)
 *  In turn a hypergraph of connected hyperedges forms
 *  the basis for such dApps.
 *  (eg. group currencies, global UBI etc)
 */
contract Hyperedge {
    /* Constants */

    /** Sentinel to mark the end of the linked list
     *  of endpoints of the hyperedge.
     */
    address public constant SENTINEL_ENDPOINTS = address(0x1);

    /* Storage */

    /** Distance cutoff is the maximum trust path length
     *  up to which nodes removed from any endpoint
     *  can still lift tokens into this hyperedge.
     */
    uint256 public tierDistanceCutoff;

    /** Endpoints are the core members of this hyperedge
     *  All other member are defined by the shortest distance
     *  to a core member
     */
    mapping(address => address) public endpoints;

    /* External functions */

    constructor(uint256 _tierDistanceCutoff) {
        // distance can be anything from zero to max uint
        tierDistanceCutoff = _tierDistanceCutoff;
    }

    function lift() public {}

    /* Public functions */

    /** Distance verifies that a path starting
     *  from a endpoint of this hyperedge is valid
     *  and returns the path length.
     */
    function distance(address[] calldata _path)
        public
        view
        returns (uint256 distance_)
    {
        require(
            _path.length <= tierDistanceCutoff,
            "path length cannot be longer than distance cutoff"
        );
        require(_path.length > 0, "Path cannot be empty");
        require(
            isEndpoint(_path[0]),
            "First path member must be a zero-tier member"
        );
        for (uint256 i = 0; i < _path.length; i++) {}
    }

    /**
     */
    function isEndpoint(address _node) public view returns (bool) {
        // if _node is included in the list it must point
        // to a non-zero address
        return (endpoints[_node] != address(0));
    }

    /* Private functions */
}
