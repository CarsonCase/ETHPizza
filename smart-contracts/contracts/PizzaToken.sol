// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface IPizzaToken{
    function mint(address _receiver, uint _amount) external;
}

contract PizzaToken is ERC20, IPizzaToken{
    address public router;

    constructor(address _router) ERC20("PizzaToken", "PZAT"){
        router = _router;
    }

    function mint(address _receiver, uint _amount) external override{
        require(msg.sender == router, "only the Router can call this function");
        _mint(_receiver, _amount);
    }
}