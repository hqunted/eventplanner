import React, { ChangeEvent, FormEvent, useState } from "react";

interface MainModalProps {
  handleFormSubmit: (data: {
    title: string;
    description: string;
    date: string;
    time: string;
  }) => void;
}

const MainModal = ({ handleFormSubmit }: MainModalProps) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "date") {
      setDate(value);
    } else if (name === "time") {
      setTime(value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleFormSubmit({ title, description, date, time });
  };

  return (
    <div className="min-h-screen bg-gray-800 opacity-95 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl overflow-hidden shadow-lg">
        <form className="p-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-gray-700 font-medium"
              >
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                autoComplete="off"
                required
                onChange={handleChange}
                value={title}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Please enter the Title of your activity"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-gray-700 font-medium"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                autoComplete="off"
                required
                rows={4}
                onChange={handleChange}
                value={description}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Please enter the description of your activity"
              ></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="date"
                  className="block text-gray-700 font-medium"
                >
                  Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  autoComplete="off"
                  required
                  onChange={handleChange}
                  value={date}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="time"
                  className="block text-gray-700 font-medium"
                >
                  Time
                </label>
                <input
                  id="time"
                  name="time"
                  type="time"
                  autoComplete="off"
                  required
                  onChange={handleChange}
                  value={time}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-2 px-4 mt-6 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MainModal;
