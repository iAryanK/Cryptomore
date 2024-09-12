"use client";

import { useWallet } from "@/hooks/useWalletStore";
import { Copy, Check } from "lucide-react";
import { useEffect, useState } from "react";
import nacl from "tweetnacl";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { ETHEREUM_DERIVATION_PATH, SOLANA_DERIVATION_PATH } from "@/constants";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import { SiEthereum, SiSolana } from "react-icons/si";

const WalletInfo = () => {
  const { activeWallet } = useWallet();
  const router = useRouter();
  const [solanaCopied, setSolanaCopied] = useState(false);
  const [ethereumCopied, setEthereumCopied] = useState(false);

  const [publicKeys, setPublicKeys] = useState({
    solana: "",
    ethereum: "",
  });

  useEffect(() => {
    const seed = localStorage.getItem("seed");
    if (!seed) return router.replace("/");

    const getSolanaKeys = (seed: string) => {
      const solana_path = SOLANA_DERIVATION_PATH + activeWallet + `'/0'`;
      const derivedSeed = derivePath(solana_path, seed).key;
      const solana_secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const solana_public =
        Keypair.fromSecretKey(solana_secret).publicKey.toBase58();
      setPublicKeys((prev) => ({ ...prev, solana: solana_public }));
    };

    const getEthereumKeys = (seed: string) => {
      const ethereum_path = ETHEREUM_DERIVATION_PATH + activeWallet + `'/0'`;
      const derivedSeed = derivePath(ethereum_path, seed).key;
      const ethereum_secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const ethereum_public =
        Keypair.fromSecretKey(ethereum_secret).publicKey.toBase58();
      setPublicKeys((prev) => ({ ...prev, ethereum: ethereum_public }));
    };

    getSolanaKeys(seed);
    getEthereumKeys(seed);
  }, [activeWallet, router]);

  const handleCopySolanaPublicKey = (publicKey: string) => {
    if (navigator.clipboard) {
      setSolanaCopied(true);
      navigator.clipboard.writeText(publicKey);
      setTimeout(() => setSolanaCopied(false), 3000);
    }
  };

  const handleCopyEthereumPublicKey = (publicKey: string) => {
    if (navigator.clipboard) {
      setEthereumCopied(true);
      navigator.clipboard.writeText(publicKey);
      setTimeout(() => setEthereumCopied(false), 3000);
    }
  };

  return (
    <div className="h-fit rounded-2xl bg-zinc-200 p-5 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] dark:bg-zinc-800 md:h-[40%]">
      <Badge className="font-geistMono text-sm font-semibold">
        Wallet {activeWallet + 1}
      </Badge>

      <div className="flex cursor-pointer items-center gap-2 pt-5">
        <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-zinc-300 p-1 dark:bg-zinc-700">
          <SiSolana />
        </div>

        <p className="font-mono text-base hover:text-blue-500">
          {publicKeys.solana.slice(0, 4)}...
          {publicKeys.solana.slice(publicKeys.solana.length - 4)}
        </p>

        {solanaCopied ? (
          <Check />
        ) : (
          <Copy
            size={18}
            onClick={() => handleCopySolanaPublicKey(publicKeys.solana)}
          />
        )}
      </div>

      <div className="flex cursor-pointer items-center gap-2 pt-5">
        <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-zinc-300 p-1 dark:bg-zinc-700">
          <SiEthereum />
        </div>

        <p className="font-mono text-base hover:text-blue-500">
          {publicKeys.ethereum.slice(0, 4)}...
          {publicKeys.ethereum.slice(publicKeys.ethereum.length - 4)}
        </p>

        {ethereumCopied ? (
          <Check />
        ) : (
          <Copy
            size={18}
            onClick={() => handleCopyEthereumPublicKey(publicKeys.ethereum)}
          />
        )}
      </div>
    </div>
  );
};

export default WalletInfo;
