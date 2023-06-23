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

const PlannerModal = ({ handleFormSubmit }: MainModalProps) => {
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
        "min-h-screen bg-gray-700 flex items-center opacity-95 justify-center",
        modalVisibility
      )}
    >
      <div className=" bg-slate-100 rounded-xl overflow-hidden shadow-lg w-[95%] md:w-[85%] lg:w-[40%]">
        <div className="flex justify-end">
          <div className="flex justify-center items-center flex-grow">
            <img
              src={require("../assets/formlogo.png")}
              alt="Form Logo"
              className="h-96 w-68 pt-16 md:h-72 md:w-56 lg:h-48 lg:w-36 lg:pt-2"
            />
          </div>
        </div>

        <form
          className="p-16 pt-8 space-y-8 md:p-12 md:pt-2 lg:space-y-2  "
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="space-y-4 md:space-y-4 lg:space-y-2">
            <div>
              <label
                htmlFor="title"
                className="block text-gray-700 font-medium text-5xl sm:mb-4 sm:mt-4 sm:text-5xl md:text-3xl lg:text-sm xl:text-sm "
              >
                Down goes the Title👇:
              </label>
              <input
                id="title"
                name="title"
                type="text"
                autoComplete="off"
                required
                onChange={handleChange}
                value={title}
                className="appearance-none rounded-md relative block w-full sm:px-8 sm:py-8 lg:py-2 lg:px-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-4xl sm:text-5xl md:text-3xl lg:text-sm"
                placeholder="Please enter the title of your adventure"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-gray-700 font-medium text-5xl sm:mb-4 sm:mt-12 sm:text-5xl md:mb-2 md:mt-6 md:text-3xl lg:text-sm"
              >
                What are you planning im curious👀👀:
              </label>
              <textarea
                id="description"
                name="description"
                autoComplete="off"
                required
                rows={4}
                onChange={handleChange}
                value={description}
                className="appearance-none rounded-md relative block w-full sm:px-8 sm:py-8 md:mb-2 md:mt-4 lg:py-2 lg:px-2  border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-4xl sm:text-5xl md:text-3xl lg:text-sm "
                placeholder="Please enter the description of your adventure"
              ></textarea>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 ">
              <div>
                <label
                  htmlFor="date"
                  className="block text-gray-700 font-medium text-5xl sm:mb-4 sm:mt-10 sm:text-5xl md:mb-2 md:mt-4 md:text-3xl lg:text-sm"
                >
                  Picking a date would be nice📅📅:
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  autoComplete="off"
                  required
                  onChange={handleChange}
                  value={date}
                  className="appearance-none rounded-md relative block w-full sm:px-8 sm:py-8 md:mb-2 md:mt-4 lg:py-2 lg:px-2  border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-4xl sm:text-5xl md:text-3xl lg:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="time"
                  className="block text-gray-700 font-medium text-5xl sm:mb-4 sm:mt-10 sm:text-5xl md:mb-2 md:mt-4 md:text-3xl lg:text-sm"
                >
                  Tick tack time passes⏱⏱:
                </label>
                <input
                  id="time"
                  name="time"
                  type="time"
                  autoComplete="off"
                  required
                  onChange={handleChange}
                  value={time}
                  className="appearance-none rounded-md relative block w-full sm:px-8 sm:py-8 md:mb-2 md:mt-4 lg:py-2 lg:px-2  border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-4xl sm:text-5xl md:text-3xl lg:text-sm "
                />
              </div>
            </div>
          </div>
          <label className="block text-blue-500 font-medium pt-16 md:pt-8 text-4xl md:text-3xl lg:text-sm">
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
              className="w-full px-6 py-8 mb-4 md:px-2 md:py-6 lg:py-2 lg:px-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-4xl sm:text-5xl md:text-3xl lg:text-sm"
            >
              Choose the location
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default PlannerModal;
