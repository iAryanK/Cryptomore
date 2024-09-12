"use client";

import SeedPhrase from "@/components/onboard/SeedPhrase";
import { useState } from "react";

const Page = () => {
  const [mnemonic, setMnemonic] = useState<string[]>([]);

  return (
    <section className="h-[85vh]">
      <SeedPhrase
        mnemonic={mnemonic}
        setMnemonic={setMnemonic}
        message="Enter your seed phrase"
      />
    </section>
  );
};

export default Page;
