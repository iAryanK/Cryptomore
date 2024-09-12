"use client";

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { mnemonicToSeedSync } from "bip39";
import { useWallet } from "@/hooks/useWalletStore";

export default function SeedPhrase({
  mnemonic,
  setMnemonic,
  newSeed,
  message,
}: {
  mnemonic: string[];
  setMnemonic: (seed: string[]) => void;
  newSeed?: boolean;
  message: string;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const { setWallet } = useWallet();
  const [copied, setCopied] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);

  const handleCopySeed = () => {
    setShowContinueButton(true);
    if (navigator.clipboard) {
      setCopied(true);
      navigator.clipboard.writeText(mnemonic.join(" "));
      setTimeout(() => setCopied(false), 3000);
      toast({
        title: "Mnemonic Copied!",
        description:
          "Store this seed phrase somewhere under the floor your house.",
      });
    } else {
      return toast({
        title: "Sorry!",
        description: "Unable to copy your seed.",
      });
    }
  };

  const handleGoToWallet = () => {
    const seed = mnemonicToSeedSync(mnemonic.join(" "));
    localStorage.setItem("seed", seed.toString("hex"));
    localStorage.setItem("totalWallets", String(1));
    setWallet(0);

    router.replace("/wallets");
  };

  return (
    <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center gap-4 p-8">
      <h2 className="pb-5 font-geistMono tracking-wide">{message}</h2>
      <div className="grid grid-cols-2 gap-4 pb-5 sm:grid-cols-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <Input
            disabled={newSeed}
            key={index}
            type="text"
            value={mnemonic[index]}
            onChange={(e) => {
              const newSeed = [...mnemonic];
              newSeed[index] = e.target.value.trim();
              setMnemonic(newSeed);
            }}
            placeholder={(index + 1).toString()}
            className="h-8 bg-secondary text-center font-mono text-base dark:shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset]"
          />
        ))}
      </div>

      {mnemonic.length === 12 && (
        <div className="flex items-center justify-center gap-2 text-center">
          {copied ? <Check /> : <Copy onClick={handleCopySeed} />}
          <p className="font-geistMono">Copy and store it in your vault.</p>
        </div>
      )}

      {showContinueButton && (
        <Button
          className="font-geistSans font-normal max-sm:w-full"
          onClick={handleGoToWallet}
        >
          Go to Wallet
        </Button>
      )}
    </div>
  );
}
