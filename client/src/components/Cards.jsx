import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare,faTrash } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Cards = ({reportData,user}) => {
  const reports = reportData;
  const [supportsList, setSupportsList] = useState([])
  const [support, setSupport] = useState({})
  const [severity, setSeverity] = useState(reportData.severity);

  const getAllSupports = async()=>{
    const response = await (await fetch(`http://127.25.25.26:3300/v1/supports`, {
      method: "GET",
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })).json();
    setSupportsList(response.user)
  }
  useEffect(()=>{
    getAllSupports()
  },[])

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
    let response = await(await fetch(`http://127.25.25.26:3300/v1/reports/id=${reports._id}`,{
      method:"DELETE",
      headers:{
        "Authorization": localStorage.getItem("token")
      }
    })).json()
    if (response.status == 200) {
      toast.success('The report was deleted', {
        position: "bottom-right",
        autoClose: 900,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1100);
    }else{
      console.log(response);
      toast.error('Error deleting report', {
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
  }

  const editReport = async(e)=>{
    e.preventDefault()
    let response = await(await fetch(`http://127.25.25.26:3300/v1/trainers/report/id=${reports._id}`,{
      method:"PUT",
      headers:{
        'Content-Type': 'application/json',
        "Authorization": localStorage.getItem("token")
      },
      body:JSON.stringify({
        severity: severity,
        trainer: {
          _id: user._id,
          username: user.username,
        },
        support:{
          _id: support._id,
          username: support.username
        }
      })
    })).json()
    console.log(response);
    console.log({
      severity: severity,
      trainer: {
        _id: user._id,
        username: user.username,
      },
      support:{
        _id: support._id,
        username: support.username
      }
    });
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
                <p className='text-center '>{capitalizeFirstLetter(reports.description)}</p>
                <div className="shadow-lg">
                  <form className="space-y-4" onSubmit={editReport}>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 max-w-full">
                      {/* SELECT SEVERITY */}
                      <div className="flex flex-col justify-center items-center">
                        <p className="font-bold text-sky-600">Assign severity</p>
                        <select value={severity} onChange={(e) => setSeverity(e.target.value)} className="select select-solid-primary max-w-full mt-1" required>
                          <option value="mild">Mild</option>
                          <option value="medium">Medium</option>
                          <option value="serious">Serious</option>
                        </select>
                      </div>
                      {/* SELECT SUPPORT */}
                      <div className="flex flex-col justify-center items-center">
                        <p className="font-bold text-sky-600">Assign support</p>
                        <select value={support} onChange={(e)=>{
                          const selectedOption = e.target.options[e.target.selectedIndex];
                          const selectedId = selectedOption.value;
                          const selectedUsername = selectedOption.text;
                          setSupport({
                            _id: selectedId,
                            username:selectedUsername
                          });
                        }} className="select select-solid-primary max-w-full mt-1" required>
                          {
                            supportsList.map(support=>(                             
                              <option key={support._id} id={support._id} value={support._id}>{support.username}</option>
                            ))
                          }
                        </select>
                      </div>
                    </div>
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
          <h2 className="card-header justify-center text-white">{reports.title.toUpperCase()}</h2>
        </div>
        <h4 className='font-bold text-blue-500'>{reports.ubication.toUpperCase()}</h4>
        <p className="text-content2">{capitalizeFirstLetter(reports.description)}</p>
        <div className="w-full flex gap-2 justify-center pt-2">
          <span className={stateBadge(reports.state)}>{capitalizeFirstLetter(reports.state)}</span>
          <span className="badge badge-flat-primary text-blue-400">{capitalizeFirstLetter(reports.severity)}</span>
          <span className="badge badge-flat-primary text-blue-400">{capitalizeFirstLetter(reports.category)}</span>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}
