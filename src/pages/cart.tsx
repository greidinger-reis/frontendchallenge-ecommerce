import {
  IProductToShoppingCart,
  shoppingCartAtom,
} from "@/components/BuyItemView";
import { Button } from "@/components/UI/Button";
import { useAtom } from "jotai";
import Image from "next/future/image";
import Link from "next/link";
import { X } from "phosphor-react";

const ShoppingCartPage = () => {
  const [shoppingCart] = useAtom(shoppingCartAtom);
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
      {shoppingCart.length > 0 ? (
        <div className="relative flex w-full justify-center gap-4 p-8">
          <ul className="w-3/4 rounded bg-white p-4 drop-shadow">
            <h1 className="text-center text-2xl font-bold">Produtos</h1>
            {shoppingCart.map((item) => (
              <CartItem key={item.orderId} item={item} />
            ))}
          </ul>
          <div className="relative w-1/4">
            <CartTotal />
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-xl">Seu carrinho está vazio</h2>
          <Link href="/">
            <Button className="mx-auto mt-2 bg-orange-500 hover:bg-orange-600">
              Ir para produtos
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

const CartItem: React.FC<{ item: IProductToShoppingCart }> = ({ item }) => {
  const [, setShoppingCart] = useAtom(shoppingCartAtom);

  const handleRemoveItemFromCart = () => {
    setShoppingCart((prev) =>
      prev.filter((prevItem) => prevItem.orderId !== item.orderId)
    );
  };

  return (
    <li className="flex justify-between gap-2 p-2">
      <div className="left-side flex">
        <Image alt={item.productName} src={item.image} width={80} height={50} />
        <strong>{item.productName}</strong>
      </div>
      <div className="right-side flex flex-col gap-2">
        <strong>Tamanho: {item.size}</strong>
        <strong>
          Preço total: R$ {(item.quantity * item.unitPrice).toFixed(2)}
        </strong>
        <Button
          className="gap-1 bg-red-500 hover:bg-red-800"
          onClick={() => handleRemoveItemFromCart()}
        >
          Remover <X className="mt-1" />
        </Button>
      </div>
    </li>
  );
};

const CartTotal = () => {
  const [shoppingCart] = useAtom(shoppingCartAtom);
  return (
    <div className="fixed flex h-80 w-96 flex-col rounded bg-white p-4 drop-shadow">
      <h1>Resumo</h1>
      <p>
        Total: R${" "}
        {shoppingCart.reduce(
          (acc, item) => acc + item.unitPrice * item.quantity,
          0
        )}
      </p>
      <Button className="bg-orange-500 hover:bg-orange-600">
        Finalizar compra
      </Button>
    </div>
  );
};

export default ShoppingCartPage;
