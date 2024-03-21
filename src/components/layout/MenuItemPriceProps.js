import Xmark from "@/components/icons/Xmark";

export default function MenuItemPriceProps({
  name,
  props,
  setProps,
  addLabel,
}) {
  function addProp() {
    setProps((oldProps) => {
      return [...oldProps, { name: "", price: 0 }];
    });
  }

  function editProp(ev, index, prop) {
    const newValue = ev.target.value;
    setProps((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }

  function removeProp(indexToRemove) {
    setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
  }
  return (
    <div className="bg-white p-2 rounded-lg mb-2 border border-gray-400">
      <label>{name}:</label>
      {props?.length > 0 &&
        props.map((size, index) => (
          <div key={index} className="flex gap-2 items-end">
            <div>
              <label className="text-sm text-gray-700">name</label>
              <input
                type="text"
                placeholder="Size name"
                value={size.name}
                onChange={(ev) => editProp(ev, index, "name")}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700">extra price</label>
              <input
                type="number"
                placeholder="Size price"
                value={size.price}
                onChange={(ev) => editProp(ev, index, "price")}
              />
            </div>
            <div>
              <button
                type="button"
                onClick={() => removeProp(index)}
                className="bg-white mb-1.5 p-1.5"
              >
                <Xmark />
              </button>
            </div>
          </div>
        ))}
      <button type="button" onClick={addProp} className="bg-white">
        {addLabel}
      </button>
    </div>
  );
}
