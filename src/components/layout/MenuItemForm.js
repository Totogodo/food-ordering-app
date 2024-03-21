import EditableImage from "@/components/layout/EditableImage";
import { useState } from "react";
import MenuItemPriceProps from "./MenuItemPriceProps";

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [sizes, setSizes] = useState([]);
  const [extraIngredient, setExtraIngredient] = useState([]);

  return (
    <form
      onSubmit={(ev) =>
        onSubmit(ev, { image, name, description, basePrice, extraIngridient })
      }
    >
      <div className="grid grid-cols-3 gap-4 items-start">
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
