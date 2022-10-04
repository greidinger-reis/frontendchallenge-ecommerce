import { Size } from "@/types/product";
import { useAtom } from "jotai";
import React from "react";
import { sizeAtom } from "./BuyItemView";

export const SizeButtons: React.FC<{ sizes: Size[] }> = ({ sizes }) => {
  const [, setSize] = useAtom(sizeAtom);
  return (
    <>
      {sizes.map((size) => (
        <div className="flex" key={size.size}>
          <input
            id={`size-${size.size}`}
            name="size"
            type="radio"
            className="peer hidden"
            value={size.size}
            onChange={({ target }) => setSize(target.value)}
          />
          <label
            htmlFor={`size-${size.size}`}
            className="min-w-[32px] cursor-pointer rounded border border-orange-500 py-1 text-center text-orange-500 peer-checked:bg-orange-500 peer-checked:text-white"
          >
            {size.size}
          </label>
        </div>
      ))}
    </>
  );
};
