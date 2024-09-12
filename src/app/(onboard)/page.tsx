import CreateWallet from "@/components/onboard/CreateWallet";
import {
  CreateSeedAlert
} from "@/components/shared/CreateSeedAlert";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="my-auto flex h-[85vh] flex-col items-center justify-center gap-4 p-8">
      <CreateWallet />
      <div className="text-center font-geistMono">
        Don&apos;t have a wallet?{" "}
        <CreateSeedAlert>
          <Button variant={"link"} className="p-0 text-base text-blue-500">
            Create Wallet
          </Button>
        </CreateSeedAlert>
      </div>
    </main>
  );
}
