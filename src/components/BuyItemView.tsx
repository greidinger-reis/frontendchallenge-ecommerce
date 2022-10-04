/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ShoppingCart } from "phosphor-react";
import { Product } from "@/types/product";
import Image from "next/future/image";
import { Button } from "./UI/Button";
import { NumberInput } from "./UI/NumberInput";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { parsePriceString } from "@/utils/parsePrise";

export const quantityAtom = atom(1);
export const sizeAtom = atom("");
export const productNameAtom = atom("");
export const unitPriceAtom = atom(0);
export const shoppingCartAtom = atomWithStorage<IProductToShoppingCart[]>(
  "shoppingCart",
  []
);

export interface IProductToShoppingCart {
  orderId: string;
  productName: string;
  image: string;
  unitPrice: number;
  quantity: number;
  size: string;
}

export const BuyItemModalView: React.FC<{ product: Product }> = ({
  product,
}) => {
  const [, setShoppingCart] = useAtom(shoppingCartAtom);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useAtom(quantityAtom);
  const [size, setSize] = useAtom(sizeAtom);
  const [productName, setProductName] = useAtom(productNameAtom);
  const [unitPrice, setUnitPrice] = useAtom(unitPriceAtom);
  const router = useRouter();

  const isSizeSelected = size !== "";

  const handleAddItemToCart = async () => {
    if (!isSizeSelected) {
      setError("Selecione um tamanho");
      return Promise.reject();
    }

    const image = product.image;
    const orderId = uuidv4();

    const productToShoppingCart: IProductToShoppingCart = {
      orderId,
      image,
      productName,
      unitPrice,
      quantity,
      size,
    };

    setShoppingCart((prev) => [...prev, productToShoppingCart]);
    setIsOpen(false);

    return Promise.resolve(productToShoppingCart);
  };

  // when the modal is open, set the product name and unit price, and reset the quantity and size
  useEffect(() => {
    setError("");
    setProductName(product.name);
    setUnitPrice(parsePriceString(product.actual_price));
    setSize("");
    setQuantity(1);
  }, [isOpen]);

  return (
    <>
      <Button
        className="mt-2 bg-orange-500 font-bold hover:bg-orange-600"
        onClick={() => setIsOpen(true)}
      >
        <ShoppingCart size={24} /> COMPRAR
      </Button>
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          className="relative z-50"
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/30"
              aria-hidden="true"
            />
          </Transition.Child>
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex gap-4 rounded bg-white p-4 drop-shadow">
                <div className="left-side">
                  <Image
                    alt={product.name}
                    src={product.image}
                    width={200}
                    height={200}
                  />
                  <Dialog.Title className="text-center mt-3 text-lg font-bold text-zinc-600">
                    {product.name
                      .toLowerCase()
                      .replace(/( |^)[a-z]/g, (L) => L.toUpperCase())}
                  </Dialog.Title>
                </div>
                <div className="right-side flex max-w-[200px] flex-col">
                  <div className="flex flex-col gap-2">
                    <div className="sizes flex flex-col gap-2">
                      <strong className="text-zinc-600">Tamanho</strong>
                      <div className="sizes-radio flex gap-1">
                        {product.sizes.map((size) => (
                          <div className="flex" key={size.size}>
                            <input
                              id={`size-${size.size}`}
                              name="size"
                              type="radio"
                              className="hidden peer"
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
                      </div>
                      {error !== "" && (
                        <span className="text-red-500 -mt-2">{error}</span>
                      )}
                    </div>
                    <div className="quantity-input flex flex-col gap-2">
                      <strong className="text-zinc-600">Quantidade</strong>
                      <NumberInput />
                    </div>
                    <div className="total-price-label flex flex-col">
                      <strong className="font-bold text-zinc-600">
                        Preço total
                      </strong>
                      <span className="font-bold text-2xl text-zinc-600">
                        R${" "}
                        {(
                          quantity * parsePriceString(product.actual_price)
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className="button-group mt-auto flex flex-col gap-2">
                      <Button
                        className="bg-orange-500 hover:bg-orange-600"
                        onClick={() => {
                          handleAddItemToCart().then(() =>
                            router.push("/cart")
                          );
                        }}
                      >
                        Comprar agora
                      </Button>
                      <Button
                        className="bg-zinc-500 text-sm hover:bg-zinc-600"
                        onClick={() => handleAddItemToCart()}
                      >
                        Adicionar ao carrinho e continuar comprando
                      </Button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
