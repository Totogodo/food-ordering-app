import AddToCartButton from "@/components/menu/AddToCartButton";
import Image from "next/image";

export default function MenuItemTile({ onAddToCart, ...item }) {
  const { image, description, name, basePrice, sizes, extraIngredient } = item;
  const hasSizesOrExtras = sizes?.length > 0 || extraIngredient?.length > 0;
  return (
    <div className="bg-gray-100 rounded-lg text-center hover:bg-light transition-all hover:shadow-xl p-4">
      <div className="">
        <Image
          width={200}
          height={200}
          src={image}
          alt="sushi"
          className="max-h-48 mx-auto block rounded-md"
        />
      </div>
      <h4 className="font-semibold my-2 text-lg">{name}</h4>
      <p className=" line-clamp-2 text-secondary text-sm">{description}</p>
      <AddToCartButton
        hasSizesOrExtras={hasSizesOrExtras}
        onClick={onAddToCart}
        basePrice={basePrice}
        image={image}
      />
    </div>
  );
}
