// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/WINToken.sol";

contract WINTokenTest is Test {
    WINToken token;
    address owner;
    address user;

    // setUp is run before each test function
    function setUp() public {
        // In Foundry tests, the test contract itself acts as the deployer/owner.
        owner = address(this);
        // Set a sample user address.
        user = address(0x123);
        // Deploy the WINToken contract; the constructor mints INITIAL_SUPPLY to owner.
        token = new WINToken();
    }

    // Test that the initial supply is correctly minted to the owner.
    function testInitialSupply() public {
        uint256 expectedSupply = 1_000_000 * 10 ** 18;
        uint256 actualSupply = token.balanceOf(owner);
        assertEq(actualSupply, expectedSupply, "Initial supply not minted correctly to owner");
    }

    // Test that the rewardTask function mints a fixed reward amount to the user.
    function testRewardTask() public {
        uint256 rewardAmount = token.rewardAmount();
        // User should initially have zero tokens.
        assertEq(token.balanceOf(user), 0, "User balance should be zero initially");
        // Reward the user for task completion.
        token.rewardTask(user);
        // Verify that the user's balance increased by rewardAmount.
        assertEq(token.balanceOf(user), rewardAmount, "Reward task did not mint the correct amount");
    }

    // Test that the owner can update the fixed reward amount.
    function testUpdateRewardAmount() public {
        uint256 newReward = 200 * 10 ** 18;
        token.updateRewardAmount(newReward);
        assertEq(token.rewardAmount(), newReward, "Reward amount was not updated correctly");
    }

    // Test that the mint function works and mints tokens to a given address.
    function testMint() public {
        uint256 mintAmount = 500 * 10 ** 18;
        token.mint(user, mintAmount);
        assertEq(token.balanceOf(user), mintAmount, "Minted tokens were not credited to the user");
    }

    // Test that a user can burn tokens from their own balance.
    function testBurn() public {
        // Mint some tokens to the user.
        uint256 mintAmount = 500 * 10 ** 18;
        token.mint(user, mintAmount);
        // Amount to burn.
        uint256 burnAmount = 200 * 10 ** 18;
        // Impersonate user to call burn.
        vm.prank(user);
        token.burn(burnAmount);
        // Check that the user's balance is reduced correctly.
        assertEq(token.balanceOf(user), mintAmount - burnAmount, "Burn did not reduce the balance correctly");
    }

    // Test that the getBalance function returns the same value as balanceOf.
    function testGetBalance() public {
        uint256 balance = token.balanceOf(owner);
        uint256 getBalanceValue = token.getBalance(owner);
        assertEq(balance, getBalanceValue, "getBalance does not match balanceOf");
    }

    // Test that non-owners cannot call owner-only functions (mint and rewardTask).
    function testNonOwnerCannotMintOrReward() public {
        // Impersonate a non-owner account.
        vm.prank(user);
        vm.expectRevert(); // Expect mint to revert for non-owner.
        token.mint(user, 100);

        vm.prank(user);
        vm.expectRevert(); // Expect rewardTask to revert for non-owner.
        token.rewardTask(user);
    }
}
