import WalletInfo from "@/components/home/WalletInfo";

const Page = () => {
  return (
    <section className="flex h-full flex-col justify-between gap-4">
      <WalletInfo />
      <div className="h-[60%] rounded-2xl bg-zinc-200 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] dark:bg-zinc-800"></div>
    </section>
  );
};

export default Page;
