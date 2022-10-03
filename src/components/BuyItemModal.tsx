import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ShoppingCart } from "phosphor-react";
import { Product } from "@/types/product";
import Image from "next/future/image";
import { Button } from "./UI/Button";
import { NumberInput } from "./UI/NumberInput";

export const BuyItemModal: React.FC<{ product: Product }> = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);

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
                <div>
                  <Image
                    alt={product.name}
                    src={product.image}
                    width={200}
                    height={200}
                  />
                  <Dialog.Title className="text-center text-lg font-bold text-zinc-600">
                    {product.name
                      .toLowerCase()
                      .replace(/( |^)[a-z]/g, (L) => L.toUpperCase())}
                  </Dialog.Title>
                </div>
                <div className="flex max-w-[200px] flex-col">
                  <div className="flex flex-col gap-2">
                    <strong className="text-zinc-600">Tamanho</strong>
                    <div className="flex gap-1">
                      {product.sizes.map((size) => (
                        <label
                          htmlFor={`size-${size.size}`}
                          key={`size-${size.size}`}
                          className="min-w-[32px] cursor-pointer rounded border border-orange-500 py-1 text-center text-orange-500"
                        >
                          <input
                            type="checkbox"
                            className="hidden"
                            name={`size-${size.size}`}
                          />
                          {size.size}
                        </label>
                      ))}
                    </div>
                    <strong className="text-zinc-600">Quantidade</strong>
                    <NumberInput />
                  </div>
                  <div className="mt-auto flex flex-col gap-2">
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      Comprar agora
                    </Button>
                    <Button className="bg-zinc-500 text-sm hover:bg-zinc-600">
                      Adicionar ao carrinho e continuar comprando
                    </Button>
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
