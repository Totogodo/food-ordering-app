export default function AddresInputs({ addressProps, setAddressProp }) {
  const { phone, street, postCode, address } = addressProps;
  return (
    <>
      <label className="text-sm text-gray-600">Phone number</label>
      <input
        type="tel"
        placeholder="Phone number"
        className="font-semibold text-gray-600"
        value={phone}
        onChange={(ev) => setAddressProp("phone", ev.target.value)}
      />
      {/* Address below */}
      <div className="flex gap-2 mb-2">
        <div>
          <label className="text-sm text-gray-600">City</label>
          <input
            style={{ margin: "0" }}
            type="text"
            placeholder="City"
            value={"Warszawa"}
            className="font-semibold text-gray-600"
            disabled={true}
          />
        </div>
        <div>
          <label className="text-sm text-gray-600">Postal code</label>
          <input
            style={{ margin: "0" }}
            type="text"
            placeholder="Postal code"
            className="font-semibold text-gray-600"
            value={postCode}
            onChange={(ev) => {
              setAddressProp("postCode", ev.target.value);
            }}
          />
        </div>
      </div>
      <label className="text-sm text-gray-600">Street</label>
      <input
        type="text"
        placeholder="Street"
        className="font-semibold text-gray-600"
        value={street}
        onChange={(ev) => setAddressProp("street", ev.target.value)}
      />
      <label className="text-sm text-gray-600">Posession</label>
      <input
        className="font-semibold text-gray-600"
        type="text"
        placeholder="Address"
        value={address}
        onChange={(ev) => setAddressProp("address", ev.target.value)}
      />
    </>
  );
}
