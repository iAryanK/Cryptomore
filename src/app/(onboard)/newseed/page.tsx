"use client";

import SeedPhrase from "@/components/onboard/SeedPhrase";
import { generateMnemonic } from "bip39";
import { useEffect, useState } from "react";

const Page = () => {
  const [mnemonic, setMnemonic] = useState<string[]>([]);

  const prePopulateSeed = () => {
    const mnemonic = generateMnemonic();
    const newSeed = mnemonic.split(" ");
    setMnemonic(newSeed);
  };

  useEffect(() => {
    prePopulateSeed();
  }, []);

  return (
    <section className="h-[85vh]">
      <SeedPhrase
        mnemonic={mnemonic}
        setMnemonic={setMnemonic}
        newSeed
        message="This is your seed phrase"
      />
    </section>
  );
};

export default Page;
