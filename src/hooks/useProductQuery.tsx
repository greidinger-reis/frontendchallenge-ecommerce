import type { Product } from "@/types/product";
import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

const fetchProducts = () =>
  fetch(
    "https://raw.githubusercontent.com/amaroteam/front-end-challenge/master/products.json"
  )
    .then((res) => res.json())
    .then((data) => data);

export const useProductQuery = (
  options?: UseQueryOptions<{ products: Product[] }>
) => {
  const productQuery = useQuery<{ products: Product[] }>(
    ["getProducts"],
    fetchProducts,
    {
      ...options,
    }
  );
  return productQuery;
};
