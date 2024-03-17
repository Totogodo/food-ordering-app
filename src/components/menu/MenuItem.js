function Menuitem() {
  return (
    <div className="bg-gray-100 rounded-lg text-center hover:bg-light transition-all hover:shadow-xl">
      <div>
        <img src="/sushi2.png" alt="sushi" className="max-h-48 mx-auto block" />
      </div>
      <div className="m-4">
        <h4 className="font-semibold my-2 text-xl">Hokkaido Harmony Roll</h4>
        <p className="text-secondary text-sm">
          Królewski łosoś, świeży ogórek i pikantna majonezowa nuta, zawinięte w
          delikatny ryż i nori.
        </p>
        <button className="bg-primary rounded-full py-2 px-4 text-light mt-4">
          Add to cart 12$
        </button>
      </div>
    </div>
  );
}

export default Menuitem;
