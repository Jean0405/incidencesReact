import React, { useState } from 'react'

export const Cards = (props) => {

  let reports = props.reportData;

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

  return (
    <div id={reports._id} className="w-full rounded bg-zinc-200/10">
      <div className="card-body text-center">
        <div className='flex justify-between items-center'>
          <span className="text-blue-500">{reports.camper.username}</span>
          <div className='flex gap-2'>
            {/* EDIT BUTTON */}
            <label className="btn btn-solid-warning p-4 rounded-md" htmlFor="modal-2">Edit</label>
            <input className="modal-state" id="modal-2" type="checkbox" />
            <div className="modal w-screen">
              <label className="modal-overlay" htmlFor="modal-2"></label>
              <div className="modal-content flex flex-col gap-5 max-w-3xl">
                <label htmlFor="modal-2" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>

                <div className="p-8 shadow-lg">
                  <form className="space-y-4">
                    <span className="text-blue-500 text-start">{reports.camper.username}</span>
                    <div className="grid place-items-center grid-cols-1 gap-4 sm:grid-cols-1 max-w-full">
                      <h4 className='font-bold text-blue-500'>{reports.ubication.toUpperCase()}</h4>
                    </div>
                    <div className="w-full flex gap-2 justify-center pt-2">
                      <span className={stateBadge(reports.state)}>{capitalizeFirstLetter(reports.state)}</span>
                      <span className="badge badge-flat-primary text-blue-400">{capitalizeFirstLetter(reports.category)}</span>
                    </div>
                    <div className="w-full">
                      <input value={reports.title} name="title" className="input input-solid max-w-full" placeholder="Title" type="text" disabled />
                    </div>
                    <div className="w-full">
                      <textarea value={capitalizeFirstLetter(reports.description)} name="description" className="textarea textarea-solid max-w-full" placeholder="Description" rows="8" id="message" disabled></textarea>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <button type="submit" className="rounded-lg btn btn-solid-primary">Edit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <button className="btn btn-solid-error p-4 rounded-md">Delete</button>
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
