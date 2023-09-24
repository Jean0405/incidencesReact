import React from 'react'

export const Cards = () => {
  return (
    <div className="w-full rounded bg-zinc-200/10">
      <div className="card-body">
        <span className="text-indigo-500">Sevedol</span>
        <h2 className="card-header">PHP apesta mucho</h2>
        <p className="text-content2">No sé que escribir acá, asi que pondré cualquier bobada</p>
        <div className="w-full flex gap-2">
          <span className="badge text-indigo-400/70">Programming</span>
          <span className="badge text-indigo-400/70">PHP</span>
        </div>
      </div>
    </div>
  )
}
