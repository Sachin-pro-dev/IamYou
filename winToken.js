import { useWriteContract, useReadContract } from "wagmi"; // Import the correct hook
import { ethers } from "ethers"; // Import ethers
import WINTokenABI from "./WINTokenABI.json"
const WIN_TOKEN_ADDRESS = "0x4dB39368B312127A8c93d4B7F29E85e69f52B8a8"; // Replace with your deployed contract address

// Mint function using useWriteContract for transaction
export function useMint() {
  const { data: hash, writeContract } = useWriteContract({
    address: WIN_TOKEN_ADDRESS,
    abi: WINTokenABI,
    functionName: "mint",
  });

  const mint = async (to, amount) => {
    try {
      const tx = await writeContract({
        args: [to, ethers.parseUnits(amount, 18)],
      });

      // Wait for the transaction to be mined
      const receipt = await tx.wait(); // Now tx is the transaction object that can wait
      console.log("Transaction confirmed:", receipt);
      alert("Mint successful!");
    } catch (err) {
      console.error("Minting failed", err);
    }
  };

  return { mint, hash }; // Return the transaction hash for display
}

// Reward Task function using useWriteContract
export function useRewardTask() {
  const { data: hash, writeContract } = useWriteContract({
    address: WIN_TOKEN_ADDRESS,
    abi: WINTokenABI,
    functionName: "rewardTask",
  });

  const rewardTask = async (user) => {
    try {
      const tx = await writeContract({ args: [user] });

      // Wait for the transaction to be mined
      const receipt = await tx.wait(); // Now tx is the transaction object that can wait
      console.log("Transaction confirmed:", receipt);
      alert("Reward successful!");
    } catch (err) {
      console.error("Rewarding failed", err);
    }
  };

  return { rewardTask, hash };
}

// Burn function using useWriteContract
export function useBurn() {
  const { data: hash, writeContract } = useWriteContract({
    address: WIN_TOKEN_ADDRESS,
    abi: WINTokenABI,
    functionName: "burn",
  });

  const burn = async (amount) => {
    try {
      const tx = await writeContract({
        args: [ethers.parseUnits(amount, 18)],
      });

      // Wait for the transaction to be mined
      const receipt = await tx.wait(); // Now tx is the transaction object that can wait
      console.log("Transaction confirmed:", receipt);
      alert("Burn successful!");
    } catch (err) {
      console.error("Burning failed", err);
    }
  };

  return { burn, hash };
}

// Balance function using useReadContract to read balance
export function useBalance() {
  const { data } = useReadContract({
    addressOrName: WIN_TOKEN_ADDRESS,
    contractInterface: WINTokenABI,
    functionName: "balanceOf",
  });

  const getBalance = async (address) => {
    const balance = data ? data.toString() : "0"; // Safeguard in case data is null
    return ethers.formatUnits(balance, 18);
  };

  return { getBalance };
}
