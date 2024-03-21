import { useState } from "react";

export default function DeleteButton({ label, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="flex gap-2">
        <button type="button" onClick={() => setShowConfirm(false)}>
          Cancel
        </button>
        <button
          onClick={onDelete}
          type="button"
          className="bg-red-500 text-light"
        >
          Yes, Delete!
        </button>
      </div>
    );
  }
  return (
    <button type="button" onClick={() => setShowConfirm(true)}>
      {label}
    </button>
  );
}
