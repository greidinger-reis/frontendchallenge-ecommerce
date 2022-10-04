import { useProductQuery } from "@/hooks/useProductQuery";
import type { Product } from "@/types/product";
import { parsePriceString } from "@/utils/parsePrise";
import Image from "next/future/image";
import { ArrowsDownUp, CaretDown } from "phosphor-react";
import { FormEvent, useState } from "react";
import { BuyItemModalView } from "./BuyItemView";
import { Spinner } from "./UI/Spinner";

export const ProductView = () => {
  const { data, isError, isLoading } = useProductQuery();
  const [selectedSort, setSelectedSort] = useState<AvailableSorts>("discount");

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="mb-4 flex items-center gap-1">
          <ArrowsDownUp size={20} className="text-orange-500" />
          <span className="text-lg font-bold">Ordernar: </span>
          <select
            onChange={(e: FormEvent<HTMLSelectElement>) =>
              setSelectedSort(e.currentTarget.value as AvailableSorts)
            }
          >
            <option value="discount">% de desconto</option>
            <option value="priceAsc">Preço crescente</option>
            <option value="priceDesc">Preço decrescente</option>
          </select>
        </div>
      </div>
      {isLoading && (
        <div className="flex h-[90vh] w-full items-center justify-center">
          <Spinner />
        </div>
      )}
      {isError && <div>Error</div>}
      {data && data.products.length > 0 && (
        <ul className="flex flex-wrap gap-4">
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
