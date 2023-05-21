const mainModal = () => {
  return (
    <div className=" min-h-full bg-green-600 opacity-95  flex items-center justify-center sm:px-6 lg:px-8 ">
      <div className="absolute max-w-md w-full bg-green-700  space-y-8 rounded-xl">
        <form className="mt-8 space-y-6" action={`./Map.tsx?`} method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px opacity-100">
            <div>
              <label htmlFor="Title" className="sr-only">
                Title
              </label>
              <input
                id="Title"
                name="title"
                type="title"
                autoComplete="title"
                required
                className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-green-500
                  focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Please enter the Title of your activity"
              />
            </div>
            <div>
              <label htmlFor="description" className="sr-only">
                Description
              </label>
              <input
                id="description"
                name="description"
                type="description"
                autoComplete="description"
                required
                className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-green-500
                  focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Please enter the description of your activity"
              />
            </div>
            <div>
              <label htmlFor="date" className="sr-only">
                Date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                autoComplete="current-date"
                required
                className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md
                  focus:outline-none focus:ring-green-500
                  focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Date"
              />
            </div>
            <div>
              <label htmlFor="time" className="sr-only">
                Time
              </label>
              <input
                id="time"
                name="time"
                type="time"
                autoComplete="current-time"
                required
                className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md
                  focus:outline-none focus:ring-green-500
                  focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Time"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-1/2 flex justify-center mx-auto mb-2
                py-2 px-4 border border-transparent text-sm font-medium
                rounded-md text-white bg-green-500 hover:bg-green-600
                focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-green-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3 "></span>
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default mainModal;
