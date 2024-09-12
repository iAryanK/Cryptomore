"use client";

import { Plus } from "lucide-react";
import Link from "next/link";

const CreateWallet = () => {
  return (
    <div className="rounded-lg border-2 border-dashed p-4">
      <Link
        href={"/seed"}
        className="flex h-fit items-center justify-center rounded-lg bg-secondary hover:bg-secondary/80"
      >
        <p className="flex select-none flex-col items-center justify-center p-5 text-center font-geistMono text-gray-400 dark:text-gray-500 md:p-10">
          <Plus
            size={68}
            strokeWidth={1}
            className="pb-4 transition-all duration-500 hover:scale-110"
          />
          Connect Your Wallet on Cryptomore
        </p>
      </Link>
    </div>
  );
};

export default CreateWallet;
