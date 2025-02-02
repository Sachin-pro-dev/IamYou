// import Chat from "@/components/chat";

// import { ConnectButton } from "@rainbow-me/rainbowkit";

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center">
//       <div className="p-4 w-[100%] grid place-items-end">
//         <ConnectButton />
//       </div>

//       <Chat />
//     </main>
//   );
// }
// --------------------------

"use client";
import Chat from "@/components/chat";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useMint, useRewardTask, useBurn, useBalance } from "../../winToken";
import { Button } from "@/components/ui/button";
import { Coins, Award, Flame, Wallet } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const { isConnected, address } = useAccount();
  const { mint } = useMint();
  const { rewardTask } = useRewardTask();
  const { burn } = useBurn();
  const { getBalance } = useBalance();

  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    if (address) {
      const fetchBalance = async () => {
        const userBalance = await getBalance(address);
        setBalance(userBalance);
      };
      fetchBalance();
    }
  }, [address, getBalance]);

  const handleMint = async () => {
    if (!address) return;
    await mint(address, "100"); // Mint 100 tokens to the connected wallet
  };

  const handleReward = async () => {
    if (!address) return;
    await rewardTask(address); // Reward the connected user
  };

  const handleBurn = async () => {
    if (!address) return;
    await burn("50"); // Burn 50 tokens from the connected wallet
  };

  const handleCheckBalance = async () => {
    if (!address) return;
    const balance = await getBalance(address);
    alert(`Your balance is: ${balance} WIN`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="p-4 w-full flex justify-end items-center gap-2">
        <ConnectButton />
        {isConnected && (
          <>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={handleMint}
            >
              <Coins className="h-4 w-4" />
              <span>Mint</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={handleReward}
            >
              <Award className="h-4 w-4" />
              <span>Reward</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={handleBurn}
            >
              <Flame className="h-4 w-4" />
              <span>Burn</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={handleCheckBalance}
            >
              <Wallet className="h-4 w-4" />
              <span>Balance</span>
            </Button>
            {balance !== null && (
              <div className="text-lg ml-4">
                <span>Balance: {balance} WIN</span>
              </div>
            )}
          </>
        )}
      </div>
      {isConnected && <div className="text-center p-4"></div>}
      <Chat />
    </main>
  );
}
