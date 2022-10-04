import { useAtom } from "jotai";
import { CaretLeft, CaretRight } from "phosphor-react";
import { quantityAtom } from "../BuyItemView";

export const NumberInput = () => {
  const [quantity, setQuantity] = useAtom(quantityAtom);

  return (
    <div className="flex w-fit overflow-hidden rounded">
      <button
        className="bg-orange-500 px-2 py-1 text-white hover:bg-orange-600"
        onClick={() => {
          if (quantity > 1) {
            setQuantity(quantity - 1);
          }
        }}
      >
        <CaretLeft size={24} />
      </button>
      <input
        value={quantity}
        type="number"
        className="w-10 bg-white text-center outline-none"
      />
      <button
        className="bg-orange-500 px-2 py-1 text-white hover:bg-orange-600"
        onClick={() => {
          setQuantity(quantity + 1);
        }}
      >
        <CaretRight size={24} />
      </button>
    </div>
  );
};
