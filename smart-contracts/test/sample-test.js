const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Order", function () {
  let order;
  let router;
  let treasury;
  let employee;
  let signers;

  beforeEach(async function () {
    const Router = await ethers.getContractFactory("Router");

    router = await Router.deploy();
    const tx = await router.newOrder(ethers.utils.parseEther("1"));
    const receipt = await tx.wait();
    const coder = ethers.utils.defaultAbiCoder;
    const orderAddress = coder.decode([ "address" ], receipt.logs[0].topics[1])[0];

    signers = await ethers.getSigners();
    treasury = router.address;
    employee = signers[1].address;

    order = await ethers.getContractAt("Order", orderAddress);
  });

  it("should receive payment and route it to the treasury when the payment is less than the payment amount", async function () {
    const paymentAmount = ethers.utils.parseEther("1");
    const payment = ethers.utils.parseEther("0.5");

    await signers[1].sendTransaction({to: order.address, value:payment})
    expect(await order.payed()).to.equal(payment);
    expect(await order.isComplete()).to.equal(false);

    const treasuryBalanceBefore = await ethers.provider.getBalance(treasury);

    await signers[1].sendTransaction({to: order.address, value:payment})

    expect(await order.payed()).to.equal(paymentAmount);
    expect(await order.isComplete()).to.equal(true);

    const treasuryBalanceAfter = await ethers.provider.getBalance(treasury);

    expect(treasuryBalanceAfter.sub(treasuryBalanceBefore)).to.equal(payment);
  });

  it("should receive payment and route it to the treasury and employee when the payment is greater than the payment amount", async function () {
    const paymentAmount = ethers.utils.parseEther("1");
    const payment = ethers.utils.parseEther("1.5");

    const treasuryBalanceBefore = await ethers.provider.getBalance(treasury);
    const employeeBalanceBefore = await ethers.provider.getBalance(employee);

    await signers[1].sendTransaction({to: order.address, value:payment})

    expect(await order.payed()).to.equal(payment);
    expect(await order.isComplete()).to.equal(true);


    await signers[1].sendTransaction({to: order.address, value:payment})

    const treasuryBalanceAfter = await ethers.provider.getBalance(treasury);
    const employeeBalanceAfter = await ethers.provider.getBalance(employee);

    expect(treasuryBalanceAfter.sub(treasuryBalanceBefore)).to.equal(paymentAmount);
  });

  it("should receive payment and route it to the employee when the payment is greater than or equal to the payment amount and the order is already complete", async function () {
    const paymentAmount = ethers.utils.parseEther("1");
    const payment = ethers.utils.parseEther("1.5");

    await signers[1].sendTransaction({to: order.address, value:payment})

    expect(await order.payed()).to.equal(payment);
    expect(await order.isComplete()).to.equal(true);

    const employeeBalanceBefore = await ethers.provider.getBalance(employee);

    await signers[1].sendTransaction({to: order.address, value:payment})

    const employeeBalanceAfter = await ethers.provider.getBalance(employee);

  });
});
