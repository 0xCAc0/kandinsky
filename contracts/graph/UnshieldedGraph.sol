// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.4;

import "../roots/IAxiom.sol";
import "./Graph.sol";

/**
 */
contract UnshieldedGraph is Graph {
    constructor(IAxiom _axiom) Graph(_axiom) {}
}
