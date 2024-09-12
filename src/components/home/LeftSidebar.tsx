"use client";

import { useWallet } from "@/hooks/useWalletStore";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { BiSolidWallet } from "react-icons/bi";

const LeftSidebar = () => {
  const router = useRouter();
  const { activeWallet, setWallet } = useWallet();
  const totalWallets = parseInt(localStorage.getItem("totalWallets") || "0");

  const handleSwitchActiveWallet = (index: number) => {
    setWallet(index);
  };

  return (
    <section className="flex h-full flex-col justify-center max-md:px-2">
      <div className="custom-scrollbar flex h-20 w-full flex-row items-center justify-start gap-3 overflow-y-scroll rounded-2xl bg-zinc-200 py-5 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] dark:bg-zinc-800 max-md:gap-5 max-md:px-5 md:h-full md:w-20 md:flex-col">
        {Array.from({ length: totalWallets }).map((_, index) => (
          <div
            key={index}
            className="relative"
            onClick={() => handleSwitchActiveWallet(index)}
          >
            <BiSolidWallet
              size={36}
              color={activeWallet === index ? "blue" : "white"}
            />
            <div
              className={`absolute -right-2 bottom-0 flex h-4 w-4 items-center justify-center rounded-full p-[1px] font-geistMono text-[10px] ${activeWallet === index ? "bg-blue-600" : "bg-white text-black"}`}
            >
              {index + 1}
            </div>
          </div>
        ))}

        <div
          className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-400 text-xl text-white shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] hover:bg-zinc-400/80 dark:bg-zinc-500 dark:hover:bg-zinc-500/80"
          onClick={() => {
            localStorage.setItem("totalWallets", String(totalWallets + 1));
            router.refresh();
          }}
        >
          <Plus />
        </div>
      </div>
    </section>
  );
};

export default LeftSidebar;
