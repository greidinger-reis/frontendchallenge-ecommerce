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
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
      {shoppingCart.length > 0 ? (
        <div className="w-full flex justify-center gap-4 p-8 relative">
          <ul className="w-3/4 bg-white rounded drop-shadow p-4">
            <h1 className="text-2xl font-bold text-center">Produtos</h1>
            {shoppingCart.map((item) => (
              <CartItem key={item.orderId} item={item} />
            ))}
          </ul>
          <div className="w-1/4 relative">
            <CartTotal />
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-xl">Seu carrinho está vazio</h2>
          <Link href="/">
            <Button className="bg-orange-500 hover:bg-orange-600 mx-auto mt-2">
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
    <li className="flex flex-col gap-2 p-2">
      <div className="top flex items-center">
        <div className="flex flex-col items-center">
          <Image
            alt={item.productName}
            src={item.image}
            width={100}
            height={100}
          />
          <strong>
            {item.productName} x{item.quantity}
          </strong>
        </div>
        <div className="right-side flex flex-col gap-2">
          <strong>Tamanho: {item.size}</strong>
          <strong>
            Preço total: R$ {(item.quantity * item.unitPrice).toFixed(2)}
          </strong>
        </div>
      </div>
      <Button
        className="bg-red-500 hover:bg-red-800 gap-1"
        onClick={() => handleRemoveItemFromCart()}
      >
        Remover <X className="mt-1" />
      </Button>
    </li>
  );
};

const CartTotal = () => {
  const [shoppingCart] = useAtom(shoppingCartAtom);
  return (
    <div className="fixed h-80 w-96 flex flex-col bg-white rounded drop-shadow p-4">
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
