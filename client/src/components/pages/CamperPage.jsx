
export const CamperPage = () => {
  return (
    <div>
      {/* NAVBAR */}
      <div className="navbar sm:w-full md:1/2">
        <div className="navbar-start">
          <a className="hidden sm:block md:block lg:block navbar-item font-bold text-primary">CAMPUSLANDS</a>
        </div>
        <div className="navbar-end">
          <a className="navbar-item bg-primary font-bold px-4">+</a>
          <a className="navbar-item">About</a>
          <a className="navbar-item">Contact</a>
        </div>
      </div>
      {/* FORM */}
      <section className="bg-gray-2 m-auto rounded-x max-w-4xl mt-5 rounded-md">
        <div className="p-8 shadow-lg">
          <form className="space-y-4">
            <div className="w-full">
              <input className="input input-solid max-w-full" placeholder="Title" type="text" id="name" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="font-bold text-sky-800">Ubication</p>
                <select className="select select-solid-primary max-w-full mt-1">
                  <option>Sputnik</option>
                  <option>Apolo</option>
                  <option>Artemis</option>
                  <option>Review 1</option>
                  <option>Review 2</option>
                  <option>Hunters</option>
                </select>
              </div>
              <div>
                <p className="font-bold text-sky-800">Severity</p>
                <select className="select select-solid-primary max-w-full mt-1">
                  <option>Mild</option>
                  <option>Medium</option>
                  <option>Serious</option>
                </select>
              </div>
            </div>
            <div>
              <p className="text-center font-bold my-2 text-sky-800">Category</p>
              <div id="group1" className="flex flex-row gap-3 justify-center items-center">
                <div className="flex flex-row gap-2 items-center">
                  <label htmlFor="radio1">Digital</label>
                  <input type="radio" className="radio radio-bordered-primary" name="category" />
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <label htmlFor="radio1">Physical</label>
                  <input type="radio" className="radio radio-bordered-primary" name="category" />
                </div>
              </div>
            </div>
            <div className="w-full">
              <textarea className="textarea textarea-solid max-w-full" placeholder="Description" rows="8" id="message"></textarea>
            </div>

            <div className="mt-4">
              <button type="button" className="rounded-lg btn btn-primary btn-block">Create Report</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}