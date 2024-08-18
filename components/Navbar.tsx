"use client"
import Image from "next/image"
import { ModeToggle } from "./ModeToggle"
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  if (pathname === '/admin') {
    return (
      <div className="flex mx-auto max-w-7xl  flex-col space-y-14">
        <header className="admin-header">
          <Link href={'/'} className="cursor-pointer flex items-center">
            <Image
              src={"/assets/images/pocketdoc-logo.png"}
              height={55}
              width={65}
              alt="logo"
              className="h-10 w-fit"
            />
            <span className="self-center text-lg font-semibold whitespace-nowrap text-pocketDoc font-poppins hidden md:block">PocketDoc</span>
          </Link>
          <div className="flex items-center justify-between gap-5">
            <p className="text-16-semibold">Admin Dashboard</p>

            <ModeToggle />
          </div>
        </header>
      </div>
    )
  }
  return (
    <nav className={`sticky top-0  z-50 transition-all duration-300 ${isScrolled
      ? 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-md'
      : 'bg-transparent dark:bg-transparent'
      }`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">

        <div className="flex items-center rtl:space-x-reverse">
          <Link href={'/'}>
          <Image
            src={"/assets/images/pocketdoc-logo.png"}
            height={55}
            width={65}
            alt="logo"
          />
          <span className="self-center text-3xl font-semibold whitespace-nowrap text-pocketDoc font-poppins">PocketDoc</span>
          </Link>
        </div>

        <ModeToggle />

      </div>
    </nav>

  )
}
