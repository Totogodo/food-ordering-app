export default function MenuItemTile({ onAddToCart, ...item }) {
  const { image, description, name, basePrice } = item;
  return (
    <div className="bg-gray-100 rounded-lg text-center hover:bg-light transition-all hover:shadow-xl p-4">
      <div className="">
        <img
          src={image}
          alt="sushi"
          className="max-h-48 mx-auto block rounded-md"
        />
      </div>
      <h4 className="font-semibold my-2 text-lg">{name}</h4>
      <p className=" line-clamp-2 text-secondary text-sm">{description}</p>
      <button
        type="button"
        onClick={onAddToCart}
        className="bg-primary rounded-full py-2 px-4 text-light mt-4"
      >
        Add to cart {basePrice}zł
      </button>
    </div>
  );
}
