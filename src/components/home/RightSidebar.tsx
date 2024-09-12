import Image from "next/image";
import ThemeToggle from "../shared/ThemeToggle";

const RightSidebar = () => {
  return (
    <section className="flex h-full flex-col gap-5">
      <div className="flex w-full items-center justify-between max-md:hidden">
        <div className="flex items-center gap-2 font-geistSans text-2xl font-extrabold uppercase text-zinc-300 dark:text-zinc-700 md:text-3xl">
          <Image
            src="/logo.png"
            alt="Cryptomore"
            width={100}
            height={100}
            className="h-8 w-8"
          />
          Cryptomore
        </div>
        <ThemeToggle />
      </div>
      <div className="h-[50%] rounded-2xl bg-zinc-200 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] dark:bg-zinc-800"></div>
      <div className="h-[40%] rounded-2xl bg-zinc-200 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] dark:bg-zinc-800"></div>
    </section>
  );
};

export default RightSidebar;
