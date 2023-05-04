// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./IOrder.sol";
import "./IRouter.sol";

/**
* @title Order
* @author Carson Case (carsonpcase@gmail.com)
* @dev Payment contract to allow users to pay with a simple ETH QR code, created by Router contract
 */
contract Order is IOrder {
    IRouter public router;
    uint public paymentAmount;
    uint public payed;
    bool public isComplete;

    address payable public treasury;
    address payable public employee;

    error InvalidAmount(uint required, uint sumbitted);

    /**
    * @dev iniitalizes values including the address to call the creation of the contract, who would be the working employee to rout tips to
    * @param _router the router managing the order (also creates the order)
    * @param _treasury usually the router, where payment is routed to
    * @param _paymentAmount is the amount to route to treasury, and the amount to trigger a payment event callback */
    constructor(IRouter _router, address payable _treasury, uint _paymentAmount) {
        router = _router;
        treasury = _treasury;
        paymentAmount = _paymentAmount;
        employee = payable(tx.origin);
    }

    /**
    * @dev receive function handles payments. Can receive any amount of funds from anywhere anytime 
    * but will only call the onPaymentCallback() that triggers Routers payment event once enough is paid
    *
    * also any amount payed over paymentAmout is routed to the employee*/
    receive() external override payable {
        // 3 possible cases 
        // 1). payed + msg.value <= paymentAmount: (Order is not yet paid and this payment does not go over paymentAmount)
        if(payed + msg.value <= paymentAmount){
            payed += msg.value;
            _checkComplete();
            treasury.transfer(msg.value);   // all goes to treasury as there is no tip
            return;
        }
        // 2). payed < paymentAmount && payed + msg.value > paymentAmount: (Order is not yet paid but this payment does go over paymentAmount)
        if(payed < paymentAmount && payed + msg.value > paymentAmount){
            uint leftToPayOrder = paymentAmount - payed;
            payed += msg.value;
            _checkComplete();
            treasury.transfer(leftToPayOrder);              // send the treasury what's still owed on the order
            employee.transfer(msg.value - leftToPayOrder);  // send the remainder as a tip
            return;
        }
        // 3). payed >= paymentAmount: (this order is already paid and this is a tip)
        if(payed >= paymentAmount){
            payed += msg.value;
            // no need to _checkComplete() as it would have been called earlier
            employee.transfer(msg.value);   // all goes as a tip as the payment is complete
            return;
        }
        
    }

    /**
    * @dev _checkComplete when a payment is made. Does not just check if amount is sufficient but also if the paymentCallback has already been issued
    *   to prevent any attackers from attempting to call the paymentCallback more than 1x
     */
    function _checkComplete() internal{
        if(payed >= paymentAmount && !isComplete){
            isComplete = true;
            router.onPaymentCallback(paymentAmount);
        }
    }
}
