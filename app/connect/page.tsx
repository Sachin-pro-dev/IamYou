import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
export default function Connect() {
  return (
    <main className="flex h-[100vh] w-[100vw] min-h-screen flex-col items-center justify-center">
      <Link href="/chatfinal">
        <ConnectButton />
      </Link>
    </main>
  );
}
