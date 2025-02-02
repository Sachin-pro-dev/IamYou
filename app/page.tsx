import Chat from "@/components/chat";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="p-4 w-[100%] grid place-items-end">
        <ConnectButton />
      </div>
      
      <Chat />
    </main>
  );
}
