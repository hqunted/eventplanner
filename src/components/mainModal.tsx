import classNames from "classnames";
import React, { ChangeEvent, useState } from "react";

interface MainModalProps {
  handleFormSubmit: (data: {
    title: string;
    description: string;
    date: string;
    time: string;
    publishClicked: boolean;
  }) => void;
}

const MainModal = ({ handleFormSubmit }: MainModalProps) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [publishClicked, setPublishClicked] = useState(false);
  const [modalVisibility, setModalVisibility] = useState("");

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

  const isFormValid =
    title !== "" && description !== "" && date !== "" && time !== "";
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleFormSubmit({ title, description, date, time, publishClicked });
  };

  const handlePublishClick = () => {
    setPublishClicked(true);
    setModalVisibility("invisible");
  };

  return (
    <div
      className={classNames(
        "min-h-screen bg-gray-700 flex items-center opacity-95 justify-center px-4 sm:px-6 lg:px-8",
        modalVisibility
      )}
    >
      <div className="max-w-md w-full bg-slate-100 rounded-xl overflow-hidden shadow-lg">
        <div className="flex justify-end ">
          <div className="flex justify-center items-center flex-grow">
            <img
              src={require("../assets/formlogo.png")}
              alt="Form Logo"
              className="h-36 w-28 pt-8"
            />
          </div>
        </div>

        <form className="p-8 pt-2 space-y-4" onSubmit={handleSubmit}>
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
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
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
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Please enter the description of your activity"
              ></textarea>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
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
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <label htmlFor="time" className="block text-blue-500 font-medium">
            (After clicking the button. Please click on the map to choose the
            location of your event.)
          </label>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={!isFormValid}
              onClick={() => {
                handlePublishClick();
              }}
              className=" w-full py-2 px-4 mt-6 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Choose the location
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MainModal;
