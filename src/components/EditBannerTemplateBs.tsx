// src/components/EditBannerTemplateBs.tsx
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Banner {
  id: number;
  title: string;
  description: string;
  cta: string;
  image: string;
  background: string;
}

interface EditBannerProps {
  banner: Banner;
  onSave: (updatedBanner: Banner) => void;
  onClose: () => void;
}

const EditBannerTemplateBs: React.FC<EditBannerProps> = ({
  banner,
  onSave,
  onClose,
}) => {
  const [editedBanner, setEditedBanner] = useState<Banner>(banner);
  const [imageType, setImageType] = useState<"url" | "file">("url");
  const [backgroundType, setBackgroundType] = useState<"url" | "file">("url");

  useEffect(() => {
    setEditedBanner(banner);
  }, [banner]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEditedBanner((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "background"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedBanner((prev) => ({
          ...prev,
          [type]: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedBanner);
    toast.success("Banner updated successfully!"); // Show success toast
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto shadow-lg transform transition-all sm:max-w-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Banner</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                name="title"
                value={editedBanner.title}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-black focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={editedBanner.description}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-black focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="cta"
                className="block text-sm font-medium text-gray-700"
              >
                CTA
              </label>
              <input
                id="cta"
                type="text"
                name="cta"
                value={editedBanner.cta}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-black focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Background
              </label>
              <select
                value={backgroundType}
                onChange={(e) =>
                  setBackgroundType(e.target.value as "url" | "file")
                }
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-black focus:ring focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="url">URL</option>
                <option value="file">File</option>
              </select>
              {backgroundType === "url" ? (
                <input
                  type="text"
                  name="background"
                  value={editedBanner.background}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-black focus:ring focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "background")}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-black focus:ring focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default EditBannerTemplateBs;
