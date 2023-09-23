import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CamperPage = (props) => {

  const [ubication, setUbication] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");


  let data = {
    title: title,
    ubication: ubication,
    category: category,
    description: description,
    camper: {
      _id: "650d836060b0f7c7c09fbfdb",
      username: "Sevedol"
    }
  }

  const createReport = async (e) => {
    e.preventDefault()
    let response = await (await fetch("http://127.25.25.26:3300/v1/campers/newReport", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })).json();

    if (response.status == 200) {
      toast.success("All good!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTitle("");
      setDescription("");
      setUbication()
    } else {
      console.log(response);
    }
  }



  return (
    <div className="h-screen">
      {/* NAVBAR */}
      <div className="navbar sm:w-full md:1/2">
        <div className="navbar-start">
          <a className="hidden sm:block md:block lg:block navbar-item font-bold text-primary">CAMPUSLANDS</a>
        </div>
        <div className="navbar-end">
          <a className="navbar-item bg-primary font-bold px-4">+</a>
          <a className="navbar-item">Sevedol</a>
          <div className="avatar avatar-ring avatar-md">
            <div className="dropdown-container">
              <div className="dropdown">
                <label className="btn btn-ghost flex cursor-pointer px-0" tabIndex="0">
                  <div className="font-bold">S</div>
                </label>
                <div className="dropdown-menu dropdown-menu-bottom-left">
                  <a className="dropdown-item text-sm">Log Out</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* USER WELCOME */}
      <div>
        <h1 className="text-4xl font-bold text-center pt-3">Welcome <span className="text-sky-500">Camper</span></h1>
      </div>
      {/* FORM */}
      <div className="mx-5">
        <section className="bg-gray-2 m-auto rounded-x max-w-4xl mt-5 rounded-md">
          <div className="p-8 shadow-lg">
            <form className="space-y-4"
              onSubmit={createReport}>
              <div className="w-full">
                <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} className="input input-solid max-w-full" placeholder="Title" type="text" />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 max-w-full">
                <div className="flex flex-col justify-center items-center">
                  <p className="font-bold text-sky-800">Ubication</p>
                  <select value={ubication} onChange={(e) => setUbication(e.target.value)} className="select select-solid-primary max-w-full mt-1">
                    <option value="sputnik">Sputnik</option>
                    <option value="apolo">Apolo</option>
                    <option value="artemis">Artemis</option>
                    <option value="review 1">Review 1</option>
                    <option value="review 2">Review 2</option>
                    <option value="hunters">Hunters</option>
                  </select>
                </div>
              </div>
              <div>
                <p className="text-center font-bold my-2 text-sky-800">Category</p>
                <div id="group1" className="flex flex-row gap-3 justify-center items-center">
                  <div className="flex flex-row gap-2 items-center">
                    <label htmlFor="radio1">Digital</label>
                    <input name="category" value="digital" checked={category === "digital"} onChange={(e) => setCategory(e.target.value)} type="radio" className="radio radio-bordered-primary" />
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <label htmlFor="radio1">Physical</label>
                    <input name="category" value="physical" checked={category === "physical"} onChange={(e) => setCategory(e.target.value)} type="radio" className="radio radio-bordered-primary" />
                  </div>
                </div>
              </div>
              <div className="w-full">
                <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} className="textarea textarea-solid max-w-full" placeholder="Description" rows="8" id="message"></textarea>
              </div>

              <div className="mt-4">
                <button type="submit" className="rounded-lg btn btn-primary btn-block">Create Report</button>
              </div>
            </form>
          </div>
        </section>
      </div>
      <ToastContainer />
    </div>
  )
}