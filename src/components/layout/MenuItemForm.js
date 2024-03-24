import EditableImage from "@/components/layout/EditableImage";
import { useEffect, useState } from "react";
import MenuItemPriceProps from "./MenuItemPriceProps";

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [extraIngredient, setExtraIngredient] = useState(
    menuItem?.extraIngredient || []
  );
  const [category, setCategory] = useState(menuItem?.category || "");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
        if (!menuItem?.category && categories.length > 0) {
          setCategory(categories[0]);
        }
      });
    });
  }, [menuItem?.category]);
  return (
    <form
      onSubmit={(ev) =>
        onSubmit(ev, {
          image,
          name,
          description,
          basePrice,
          sizes,
          extraIngredient,
          category,
        })
      }
    >
      <div className="sm:grid grid-cols-3 gap-4 items-start">
        <div className="col-span-1">
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="col-span-2 grow">
          <label>Item name</label>
          <input
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            type="text"
          />
          <label>Description</label>
          <input
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            type="text"
          />
          <label>Base price</label>
          <input
            value={basePrice}
            onChange={(ev) => setBasePrice(ev.target.value)}
            type="text"
          />
          <label>Categories:</label>
          <select
            value={category}
            onChange={(ev) => {
              setCategory(ev.target.value);
            }}
          >
            {categories?.length > 0 &&
              categories.map((c) => (
                <option value={c._id} key={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
          <MenuItemPriceProps
            name={"Sizes"}
            addLabel={"Add size"}
            props={sizes}
            setProps={setSizes}
          />
          <MenuItemPriceProps
            name={"Extra ingredients"}
            addLabel={"Add ingridient"}
            props={extraIngredient}
            setProps={setExtraIngredient}
          />
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}
