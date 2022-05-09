// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.4;

import "./IGraphNode.sol";

interface IGraph {
    function isTrusted(IGraphNode _centerNode, IGraphNode _circleNode)
        external
        view
        returns (bool);

    function isMutuallyTrusted(IGraphNode _centerNode, IGraphNode _circleNode)
        external
        view
        returns (bool);
}
