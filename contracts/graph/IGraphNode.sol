// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.4;

interface IGraphNode {
    function trusts(IGraphNode _node) external view returns (bool);
}
