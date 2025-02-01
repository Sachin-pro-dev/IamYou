// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title WINToken
 * @dev ERC20 token with initial supply, owner minting, fixed rewards for task completion,
 * token burning, and balance query functions.
 */
contract WINToken is ERC20, Ownable {
    // Initial supply: 1,000,000 tokens (with 18 decimals)
    uint256 public constant INITIAL_SUPPLY = 1_000_000 * 10 ** 18;
    
    // Fixed reward amount for task completion (e.g., 100 tokens)
    uint256 public rewardAmount = 100 * 10 ** 18;

    // Emitted when a user is rewarded for completing a task.
    event TaskRewarded(address indexed user, uint256 amount);

    /**
     * @dev Constructor that mints the initial supply to the deployer.
     */
    constructor() ERC20("WIN", "WIN") Ownable(msg.sender) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    /**
     * @dev Mint new tokens to a specified address.
     * Can only be called by the contract owner.
     * @param to The address to receive the minted tokens.
     * @param amount The number of tokens to mint (in smallest units).
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    /**
     * @dev Reward a user with a fixed amount of tokens for task completion.
     * Can only be called by the contract owner.
     * @param user The address of the user completing the task.
     */
    function rewardTask(address user) external onlyOwner {
        _mint(user, rewardAmount);
        emit TaskRewarded(user, rewardAmount);
    }

    /**
     * @dev Allows the owner to update the fixed reward amount.
     * @param newRewardAmount The new reward amount (in smallest token units).
     */
    function updateRewardAmount(uint256 newRewardAmount) external onlyOwner {
        rewardAmount = newRewardAmount;
    }

    /**
     * @dev Burn tokens from the caller’s account.
     * @param amount The number of tokens to burn.
     */
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }

    /**
     * @dev Returns the token balance of a given address.
     * Note: This function is provided as a convenience since ERC20 already
     * has the balanceOf() function.
     * @param account The address to query.
     * @return The token balance of the address.
     */
    function getBalance(address account) external view returns (uint256) {
        return balanceOf(account);
    }
}
