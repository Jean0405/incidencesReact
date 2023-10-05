import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const CardsSupport = ({ reportData, setReports }) => {
  const reports = reportData;
  const [state, setState] = useState("");
  const [diagnosis, setDiagnosis] = useState("");


  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  function stateBadge(state) {
    let severityBagde = "badge text-muted";

    if (state === "not solved") {
      severityBagde = "badge badge-flat-error text-red-500";
    } else if (state === "in process") {
      severityBagde = "badge badge-flat-primary text-blue-500";
    } else {
      severityBagde = "badge badge-flat-success text-green-500";
    }
    return (
      severityBagde
    );
  }

  const editReport = async (e) => {
    console.log(reports._id);
    e.preventDefault()
    let response = await (await fetch(`http://192.168.129.72:5176/v1/supports/report/id=${reports._id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({
        status: state,
        diagnosis: diagnosis
      })
    })).json()
    if (response.status == 200) {
      toast.success('The report was updated', {
        position: "bottom-right",
        autoClose: 900,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
      let response = await (await fetch(`http://127.25.25.26:3300/v1/supports/report/id=${reports._id}`, {
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      })).json()
      setReports(response.data)
    } else {
      console.log(response);
      toast.error('Error updating report', {
        position: "bottom-right",
        autoClose: 900,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setState("")
    setDiagnosis("")
  }


  return (
    <div id={reports._id} className="card-container w-full rounded bg-zinc-950 dark:bg-zinc-200/10">
      <div className="card-body text-center">
        <div className='flex justify-between items-center'>
          <span className="text-blue-500">{reports.camper.username}</span>
          <div className='flex gap-2'>
            {/* EDIT BUTTON */}
            <label className="btn btn-solid-warning p-4 rounded-md" htmlFor={`modal-${reports._id}`}><FontAwesomeIcon icon={faPenToSquare} /></label>
            <input className="modal-state" id={`modal-${reports._id}`} type="checkbox" />
            {/*MODAL TO EDIT REPORT*/}
            <div className="modal w-screen">
              <label className="modal-overlay" htmlFor={`modal-${reports._id}`}></label>
              <div className="modal-content flex flex-col gap-5 max-w-3xl w-screen">
                <label htmlFor={`modal-${reports._id}`} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                <span className='text-blue-500 font-bold'>{reports.camper.username}</span>
                <p className='font-bold text-center text-sky-600'>{reports.title.toUpperCase()}</p>
                <div className="w-full flex gap-2 justify-center pt-2">
                  <span className={stateBadge(reports.state)}>{capitalizeFirstLetter(reports.state)}</span>
                  <span className="badge badge-flat-primary text-blue-400">{capitalizeFirstLetter(reports.category)}</span>
                </div>
                <p className='text-center'>{capitalizeFirstLetter(reports.description)}</p>
                <form className='space-y-4' onSubmit={editReport}>
                  {/* SELECT STATUS */}
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-sky-600 pb-2">Assign severity</p>
                    <select value={state} onChange={(e) => setState(e.target.value)} className="select select-solid-primary max-w-full mt-1" required>
                      <option value="solved">Solved</option>
                      <option value="in progress">In progress</option>
                      <option value="not solved">Not solved</option>
                    </select>
                  </div>
                  {/* TEXT FIELD */}
                  <p className="font-bold text-center text-sky-600">Diagnosis</p>
                  <textarea value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} className='w-full p-2 rounded-xl bg-zinc-300 dark:bg-zinc-800' name="" id="" cols="30" rows="5" placeholder='Write your diagnosis' required></textarea>
                  <div className='grid place-items-center'>
                    <button type="submit" className='btn btn-solid-warning'><FontAwesomeIcon icon={faPenToSquare} /></button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-3">
          <h2 className="card-header justify-center text-white">{reports.title.toUpperCase()}</h2>
        </div>
        <h4 className='font-bold text-blue-500'>{reports.ubication.toUpperCase()}</h4>
        <p className="text-content2 text-zinc-400">{capitalizeFirstLetter(reports.description)}</p>
        <div className="w-full flex gap-2 justify-center pt-2">
          <span className={stateBadge(reports.state)}>{capitalizeFirstLetter(reports.state)}</span>
          <span className="badge badge-flat-primary text-blue-400">{capitalizeFirstLetter(reports.severity)}</span>
          <span className="badge badge-flat-primary text-blue-400">{capitalizeFirstLetter(reports.category)}</span>
        </div>
      </div>
      {/* <ToastContainer/> */}
    </div>
  )
}

