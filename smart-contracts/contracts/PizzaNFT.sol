// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

interface IPizzaNFT{
    function mint(address _receiver) external;
}

contract PizzaNFT is ERC721, IPizzaNFT{
    address public router;
    uint latestID;

    constructor(address _router)ERC721("ETH PIZZA NFT", "PZA"){
        router = _router;
    }

    function mint(address _receiver) external override{
        require(msg.sender == router, "only the Router can call this function");
        _mint(_receiver, ++latestID);
    }
}