// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.4;

import "../graph/IGraphNode.sol";

/** Avatars keeps a global registery of all addresses
 *  which have joint on this chain, as a householding
 *  measure - not related to sybil resistance
 */
contract Avatars {
    // -- Storage

    /** nodes stores the node address given an avatar
     *  for which is issues time tokens
     */
    mapping(address => IGraphNode) private nodes;

    /** avatars stores the avatar address for a given node.
     *  The node itself could also be called to get the avatar;
     *  however, a registry is needed to assert the node is deployed
     *  with a trusted code.
     */
    mapping(IGraphNode => address) private avatars;

    // -- External functions

    function registeredNode(address _avatar)
        external
        view
        returns (IGraphNode)
    {
        return nodes[_avatar];
    }

    function registeredAvatar(IGraphNode _node)
        external
        view
        returns (address)
    {
        return avatars[_node];
    }

    // -- Public functions

    /** isAvatar returns returns true if any node is registered
     *  with the given avatar address
     */
    function isAvatar(address _avatar) public view returns (bool) {
        return (nodes[_avatar] != IGraphNode(address(0)));
    }

    function isNode(IGraphNode _node) public view returns (bool) {
        return (avatars[_node] != address(0));
    }

    // -- Internal functions

    // @dev as internal function, assumes never called
    //      with _avatar zero address, or
    //      that avatar can equal node address or
    //      an attempt of registering reverse of already registered relations.
    function register(address _avatar, IGraphNode _node) internal {
        require(
            _node != IGraphNode(address(0)),
            "Avatars: Node cannot be zero address."
        );
        require(
            nodes[_avatar] == IGraphNode(address(0)),
            "Avatars: Avatar is already registered."
        );
        require(
            avatars[_node] == address(0),
            "Avatars: Node is already registered."
        );

        // register node to avatar
        nodes[_avatar] = _node;
        // and register reverse relationship
        avatars[_node] = _avatar;
    }
}
