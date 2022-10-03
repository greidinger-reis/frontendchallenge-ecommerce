import { CaretLeft, CaretRight } from "phosphor-react";
import { useState } from "react";

export const NumberInput = () => {
  const [value, setValue] = useState(1);

  return (
    <div className="flex w-fit overflow-hidden rounded">
      <button
        className="bg-orange-500 px-2 py-1 text-white hover:bg-orange-600"
        onClick={() => {
          if (value > 1) {
            setValue(value - 1);
          }
        }}
      >
        <CaretLeft size={24} />
      </button>
      <input
        value={value}
        type="number"
        className="w-10 bg-white text-center outline-none"
      />
      <button
        className="bg-orange-500 px-2 py-1 text-white hover:bg-orange-600"
        onClick={() => {
          setValue(value + 1);
        }}
      >
        <CaretRight size={24} />
      </button>
    </div>
  );
};
