import Image from "next/image";

export default function EditableImage({ link, setLink }) {
  async function handleFileChange(ev) {
    const files = ev.target.files;

    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      const uploadingPromise = new Promise(async (resolve, reject) => {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });

        response.ok ? resolve() : reject();
        const link = await response.json();
        setLink(link);
      });

      await toast.promise(uploadingPromise, {
        loading: "Uploading...",
        success: "Image uploaded!",
        error: "Error",
      });
    }
  }
  return (
    <>
      {link && (
        <Image
          className="rounded-full mx-auto max-w-96 max-h-96 aspect-square object-cover"
          src={link}
          width={120}
          height={120}
          alt={"avatar"}
        />
      )}
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="border-gray-300 text-center text-gray-700 border rounded-lg py-1 px-2 mt-2 block text-xs cursor-pointer">
          Edit
        </span>
      </label>
    </>
  );
}
