// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Order.sol";
import "./IRouter.sol";
import "./PizzaNFT.sol";
import "./PizzaToken.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

/**
* @title Router
* @author Carson Case (carsonpcase@gmail.com)
* @dev Router contract to create Order contracts that allow users to pay using only a simple eth TX.
* The Order contract calls back to emmit events signififying order completion
 */
contract Router is IRouter, Ownable{
    IOrder[] public orders;

    uint totalRefundsToday;
    uint lastRefund;
    uint constant refundLimit = 0.1 ether;
    IPizzaNFT public pizzaNFT;
    IPizzaToken public pizzaToken;

    event Received(address indexed sender);
    event OrderCreated(address indexed orderAddress);

    error RefundLimitReached();


    /// @dev There is a constant max refund limit that is enforced with this modifier
    modifier beforeRefund(uint _amount){
        if(lastRefund >= 1 days){
            totalRefundsToday = 0;
        }
        totalRefundsToday += _amount;
        lastRefund = block.timestamp;
        if(totalRefundsToday > refundLimit){
            revert RefundLimitReached();
        }
        _;
    }

    /// @dev set the owner
    constructor() Ownable(){
        pizzaNFT = new PizzaNFT(address(this));
        pizzaToken = new PizzaToken(address(this));
    }

    /// @dev allow Router to serve as treasury and receive funds
    receive() external payable {

    }

    /**
    * @dev takeFunds for owner to take funds out of the Router if acting as treasury
    * @param am to remove
     */
    function takeFunds(uint am) external onlyOwner{
        payable(msg.sender).transfer(am);
    }

    /**
    * @dev newOrder function to create an order contract at a certain ETH price. Emits event on creation
    * @param _price in ETH to require a user pays before completion
     */
    function newOrder(uint _price) external onlyOwner {
        Order order = new Order(this, payable(address(this)), _price);
        orders.push(order);
        emit OrderCreated(address(order));
    }

    /**
    * @dev issueRefund contract to refund a user a certain amount
    * @param _receiver to get ETH refund
    * @param _amount to refund
     */
    function issueRefund(address payable _receiver, uint _amount) external onlyOwner beforeRefund(_amount){
        _receiver.transfer(_amount);
    }

    /**
    * @dev onPaymentCallback to handle when a payment is made. This way the backend/frontend only needs to listen to
    *   this router instead of each and every Order contract created
     */
    function onPaymentCallback(uint _paymentAmount) external override {
        emit Received(msg.sender);
        pizzaNFT.mint(tx.origin);                               // mint rewards NFT
        pizzaToken.mint(tx.origin, _paymentAmount /10);         // mint 10% rewards coins
    }
}