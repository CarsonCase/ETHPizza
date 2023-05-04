// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// Interface for the child contract
interface IOrder {
    receive() external payable;
}
