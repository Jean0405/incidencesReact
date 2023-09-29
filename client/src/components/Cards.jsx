import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare,faTrash } from '@fortawesome/free-solid-svg-icons'

export const Cards = (props) => {

  const [reports, setReports] = useState(props.reportData);
  const [severity, setSeverity] = useState(reports.severity);

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

  const deleteIncident = async()=>{
    // let response = await(await fetch(`http://127.25.25.26:3300/v1/reports/id=${reports._id}`,{
    //   method:"DELETE",
    //   Authorization: localStorage.getItem("token")
    // })).json()
    console.log(reports._id);
  }

  return (
    <div id={reports._id} className="card-container w-full rounded bg-zinc-200/10">
      <div className="card-body text-center">
        <div className='flex justify-between items-center'>
          <span className="text-blue-500">{reports.camper.username}</span>
          <div className='flex gap-2'>
            {/* EDIT BUTTON */}
            <label className="btn btn-solid-warning p-4 rounded-md" htmlFor={`modal-${reports._id}`}><FontAwesomeIcon icon={faPenToSquare} /></label>
            <input className="modal-state" id={`modal-${reports._id}`} type="checkbox" />
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
                <p className='text-center '>{capitalizeFirstLetter(reports.description)}</p>
                <div className="shadow-lg">
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 max-w-full">
                      <div className="flex flex-col justify-center items-center">
                        <p className="font-bold text-sky-600">Assign severity</p>
                        <select value={severity} onChange={(e) => setSeverity(e.target.value)} className="select select-solid-primary max-w-full mt-1" required>
                          <option value="Mild">Mild</option>
                          <option value="Medium">Medium</option>
                          <option value="Serious">Serious</option>
                        </select>
                      </div>
                    </div>
                    {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 max-w-full">
                      <div className="flex flex-col justify-center items-center">
                        <p className="font-bold text-sky-600">Assign support</p>
                        <select value={severity} onChange={(e) => setSeverity(e.target.value)} className="select select-solid-primary max-w-full mt-1" required>
                          <option value="Mild">Mild</option>
                          <option value="Medium">Medium</option>
                          <option value="Serious">Serious</option>
                        </select>
                      </div>
                    </div> */}
                    <div className="mt-4 flex justify-center">
                      <button type="submit" id={`${reports._id}`} className="rounded-lg btn btn-solid-warning"><FontAwesomeIcon icon={faPenToSquare} /></button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <label className="btn btn-solid-error p-4 rounded-md" htmlFor={`modal-${reports._id}-1`}><FontAwesomeIcon icon={faTrash} /></label>
            <input className="modal-state" id={`modal-${reports._id}-1`} type="checkbox" />
            <div className="modal w-screen">
              <label className="modal-overlay" htmlFor={`modal-${reports._id}-1`}></label>
              <div className="modal-content flex flex-col gap-5 max-w-3xl">
                <label htmlFor={`modal-${reports._id}-1`} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                <h2 className="text-xl text-red-500 font-bold flex justify-center">Are you sure?</h2>
                <span>If you accept, it will be gone forever ☠️</span>
                <div className="flex justify-end gap-3">
                  <button className="rounded-lg btn btn-solid-error" onClick={deleteIncident}><FontAwesomeIcon icon={faTrash} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-3">
          <h2 className="card-header justify-center">{reports.title.toUpperCase()}</h2>
        </div>
        <h4 className='font-bold text-blue-500'>{reports.ubication.toUpperCase()}</h4>
        <p className="text-content2">{capitalizeFirstLetter(reports.description)}</p>
        <div className="w-full flex gap-2 justify-center pt-2">
          <span className={stateBadge(reports.state)}>{capitalizeFirstLetter(reports.state)}</span>
          <span className="badge badge-flat-primary text-blue-400">{capitalizeFirstLetter(reports.severity)}</span>
          <span className="badge badge-flat-primary text-blue-400">{capitalizeFirstLetter(reports.category)}</span>
        </div>
      </div>
    </div>
  )
}
