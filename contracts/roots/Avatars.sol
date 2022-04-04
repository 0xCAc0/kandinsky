// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.4;

/** Avatars keeps a global registery of all addresses
 *  which have joint on this chain, as a householding
 *  measure - not related to sybil resistance
 */
contract Avatars {
    // -- Storage

    mapping(address => address) public avatars;

    // -- External functions


    // -- Public functions

    /** isAvatar returns returns true if the address of 
      *  of the associated node, if the address
      *  has been registered as an avatar. 
      */
    function isAvatar(address _avatar) public view returns (bool) {
        return (avatars[_avatar] != address(0));
    }

    // -- Internal functions

    // @dev as internal function, assumes never called with _avatar zero address
    function register(address _avatar, address _node) internal {
        require(
            avatars[_avatar] == address(0),
            "Avatar is already registered."
        );
        require(
            _node != address(0),
            "Node cannot be zero address."
        );

        // regsiter node to avatar
        avatars[_avatar] = _node;
    }

}
