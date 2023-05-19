import React, { useState } from "react";

export const Modal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setName("");
    setEmail("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    closeModal();
  };

  return (
    <div className="">
      <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Open Modal
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white rounded shadow-lg p-6 w-1/3">
            <h2 className="text-lg font-bold mb-4 ">Form Modal</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 ">
                <label htmlFor="name" className="block mb-2 font-medium ">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-gray-300 rounded-md px-4 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-gray-300 rounded-md px-4 py-2"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
