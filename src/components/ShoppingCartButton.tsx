import { useAtom } from "jotai";
import Link from "next/link";
import { ShoppingCart as ShoppingCartIcon } from "phosphor-react";
import { shoppingCartAtom } from "./BuyItemView";

export const ShoppingCartButton = () => {
  const [shoppingCart] = useAtom(shoppingCartAtom);

  return (
    <Link href="/cart">
      <a className="relative">
        <ShoppingCartIcon size={32} className="text-white" />
        <div className="rounded-full bg-red-500 -top-1 -right-2 w-5 h-5 absolute flex items-center justify-center text-white">
          {shoppingCart.length}
        </div>
      </a>
    </Link>
  );
};
