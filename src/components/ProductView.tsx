import { useProductQuery } from "@/hooks/useProductQuery";
import type { Product } from "@/types/product";
import { slugify } from "@/utils/slugify";
import Image from "next/future/image";
import { CaretDown } from "phosphor-react";
import { BuyItemModal } from "./BuyItemModal";
import { Spinner } from "./UI/Spinner";

export const ProductView = () => {
  const { data, isError, isLoading } = useProductQuery();
  return (
    <>
      <h1 className="mb-4 text-center text-4xl font-extrabold">Produtos</h1>
      {isLoading && (
        <div className="h-[90vh] w-full flex items-center justify-center">
          <Spinner />
        </div>
      )}
      {isError && <div>Error</div>}
      {data && data.products.length > 0 && (
        <ul className="flex flex-wrap gap-4">
          {data.products.map((product, i) => (
            <ProductCard
              product={product}
              key={`${slugify(product.name)}#${i}`}
            />
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
          <strong className="text-lg font-bold">{product.name}</strong>
          {product.actual_price !== product.regular_price ? (
            <>
              <div>
                <span className="text-sm text-gray-500 line-through">
                  {product.regular_price}
                </span>
              </div>
              <span className="text-lg font-bold text-orange-500">
                {product.actual_price}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-orange-500">
              {product.actual_price}
            </span>
          )}
          <span>{product.installments}</span>
          <BuyItemModal product={product} />
        </div>
      </div>
    </li>
  );
};
