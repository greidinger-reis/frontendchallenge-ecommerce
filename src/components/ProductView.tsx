import { useProductQuery } from "@/hooks/useProductQuery";
import type { Product } from "@/types/product";
import { parsePriceString } from "@/utils/parsePrise";
import { Popover, Transition } from "@headlessui/react";
import { atom, useAtom } from "jotai";
import Image from "next/future/image";
import { ArrowsDownUp, CaretDown } from "phosphor-react";
import { Fragment, useState } from "react";
import { BuyItemModalView } from "./BuyItemView";
import { Spinner } from "./UI/Spinner";

export const selectedSortAtom = atom<AvailableSorts>("discount");

export const ProductView = () => {
  const { data, isError, isLoading } = useProductQuery();
  const [selectedSort] = useAtom(selectedSortAtom);

  return (
    <>
      <div className="flex items-center">
        <SortList />
      </div>
      {isLoading && (
        <div className="flex h-[90vh] w-full items-center justify-center">
          <Spinner />
        </div>
      )}
      {isError && <div>Error</div>}
      {data && data.products.length > 0 && (
        <ul className="flex flex-wrap justify-center gap-4">
          {data.products.sort(sortFunctions[selectedSort]).map((product, i) => (
            <ProductCard key={`${product.name}#${i}`} product={product} />
          ))}
        </ul>
      )}
    </>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <li>
      <div className="flex  min-h-[500px] min-w-[350px] max-w-[350px] flex-col items-center justify-center rounded bg-white p-4 drop-shadow">
        {product.discount_percentage && (
          <span className="absolute top-2 right-2 flex items-center rounded bg-orange-500 p-2 text-sm font-bold text-white">
            {product.discount_percentage} <CaretDown size={20} />
          </span>
        )}
        <Image
          src={product.image}
          alt={product.name}
          width={200}
          height={250}
          className="rounded"
        />
        <div className="flex w-full flex-col p-2">
          <strong className="text-lg font-bold text-zinc-800">
            {product.name}
          </strong>
          {product.actual_price !== product.regular_price ? (
            <>
              <div className="text-sm text-gray-500">
                de{" "}
                <span className="text-base font-bold line-through">
                  {product.regular_price}
                </span>
              </div>
              <span className="text-2xl font-bold text-orange-500">
                <span className="text-sm font-normal">por</span>{" "}
                {product.actual_price}{" "}
                <span className="text-sm font-normal">à vista</span>
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold text-orange-500">
              {product.actual_price}{" "}
              <span className="text-sm font-normal">à vista</span>
            </span>
          )}
          <span className="font-bold">
            <span className="text-sm font-normal">ou</span>{" "}
            {product.installments}{" "}
            <span className="text-sm font-normal">no cartão</span>
          </span>
          <BuyItemModalView product={product} />
        </div>
      </div>
    </li>
  );
};

const SortList = () => {
  const [, setSelectedSort] = useAtom(selectedSortAtom);
  const [currentSort, setCurrentSort] = useState("% de desconto");

  return (
    <Popover className="relative flex gap-2">
      <div className="mt-2 flex font-bold">
        <ArrowsDownUp className="text-orange-500" size={24} />
        Ordernar:
      </div>
      <Popover.Button className="mb-4 flex w-48 items-center justify-between rounded bg-white px-4 py-2">
        {currentSort}
        <CaretDown size={20} />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel className="absolute top-12 right-0 z-10 rounded bg-white py-4 drop-shadow-lg">
          <ul className="w-48">
            <li
              className="px-4 py-2 hover:bg-zinc-400 hover:text-white"
              onClick={() => {
                setCurrentSort("% de desconto");
                setSelectedSort("discount");
              }}
            >
              % de desconto
            </li>
            <li
              className="px-4 py-2 hover:bg-zinc-400 hover:text-white"
              onClick={() => {
                setCurrentSort("Preço crescente");
                setSelectedSort("priceAsc");
              }}
            >
              Preço crescente
            </li>
            <li
              className="px-4 py-2 hover:bg-zinc-400 hover:text-white"
              onClick={() => {
                setCurrentSort("Preço decrescente");
                setSelectedSort("priceDesc");
              }}
            >
              Preço decrescente
            </li>
          </ul>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

type AvailableSorts = "discount" | "priceAsc" | "priceDesc";

const sortFunctions = {
  discount(a: Product, b: Product) {
    return (
      Number(b.discount_percentage.replace("%", "")) -
      Number(a.discount_percentage.replace("%", ""))
    );
  },
  priceAsc(a: Product, b: Product) {
    return parsePriceString(a.actual_price) - parsePriceString(b.actual_price);
  },
  priceDesc(a: Product, b: Product) {
    return parsePriceString(b.actual_price) - parsePriceString(a.actual_price);
  },
};
