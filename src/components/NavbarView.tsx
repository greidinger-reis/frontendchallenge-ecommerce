import Link from "next/link";
import { ShoppingCartButton } from "./ShoppingCartButton";

export const NavbarView = () => {
  return (
    <header className="h-16 bg-orange-500 flex justify-between items-center px-4">
      <Link href="/">
        <a className="text-2xl font-bold text-white">
          e-Commerce Frontend Challenge
        </a>
      </Link>
      <ShoppingCartButton />
    </header>
  );
};
