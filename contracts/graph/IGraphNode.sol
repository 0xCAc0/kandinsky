// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.4;

interface IGraphNode {
    function isTrusted(address _node) external returns (bool);
}
