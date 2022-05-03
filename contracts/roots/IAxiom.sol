// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.4;

import "../graph/IGraphNode.sol";

interface IAxiom {
    function isAvatar(address _avatar) external view returns (bool);

    function isNode(IGraphNode _node) external view returns (bool);

    function registeredAvatar(IGraphNode _node) external view returns (address);

    function registeredNode(address _avatar) external view returns (IGraphNode);
}
