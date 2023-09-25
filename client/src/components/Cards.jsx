import React, { useState } from 'react'

export const Cards = (props) => {

  let reports = props.reportData

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  function stateBadge(state) {
    let severityBagde = "badge text-muted";

    if (reports.state === "not solved") {
      severityBagde = "badge badge-flat-error text-red-500";
    } else if (reports.state === "in process") {
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
          <span className="text-blue-500 text-start">{reports.camper.username}</span>
          <div className='flex gap-2'>
            <button className="btn btn-solid-warning p-4 rounded-md">Edit</button>
            <button className="btn btn-solid-error p-4 rounded-md">Delete</button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-3">
          <h2 className="card-header justify-center">{reports.title.toUpperCase()}</h2>
        </div>
        <h4 className='font-bold text-blue-500'>{capitalizeFirstLetter(reports.ubication)}</h4>
        <p className="text-content2">{reports.description}</p>
        <div className="w-full flex gap-2 justify-center pt-2">
          <span className={stateBadge(reports.state)}>{capitalizeFirstLetter(reports.state)}</span>
          <span className="badge badge-flat-primary text-blue-400">{capitalizeFirstLetter(reports.severity)}</span>
          <span className="badge badge-flat-primary text-blue-400">{capitalizeFirstLetter(reports.category)}</span>
        </div>
      </div>
    </div>
  )
}
