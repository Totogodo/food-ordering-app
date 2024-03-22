import { cartProductPrice } from "@/components/AppContext";
import Image from "next/image";
import Xmark from "@/components/icons/Xmark";

export default function CartProduct({ product, onRemove }) {
  return (
    <div className="flex items-center gap-4 border-b py-4">
      <div className="w-24">
        <Image
          width={240}
          height={240}
          src={product.product.image}
          alt={""}
          className="rounded-lg"
        />
      </div>
      <div className="grow">
        <h3 className="font-semibold">{product.product.name}</h3>
        {product.size && (
          <div className="text-sm">
            Size: <span>{product.size.name}</span>
          </div>
        )}
        {product.extras?.length > 0 && (
          <div className="text-sm text-gray-500">
            {product.extras.map((extra) => (
              <div key={extra.name}>
                {extra.name} ${extra.price}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="text-lg font-semibold">
        ${cartProductPrice(product.product)}
      </div>
      {!!onRemove && (
        <div className="ml-2">
          <button type="button" onClick={() => onRemove(index)} className="p-2">
            <Xmark />
          </button>
        </div>
      )}
    </div>
  );
}
