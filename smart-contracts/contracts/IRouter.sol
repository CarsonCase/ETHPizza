// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IRouter {
    function onPaymentCallback(uint _paymentAmount) external;
}