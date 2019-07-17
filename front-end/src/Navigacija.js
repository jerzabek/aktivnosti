import React from 'react'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

function Navigacija(props) {
  const goToPage = (e) => {
    if(props.editing !== -1) {
      const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      })

      toast.fire({ type: 'warning', title: 'Završite sa uređivanjem prije izlaska!' })

      e.preventDefault()
    }
  }
  
  return (
    <div className="d-flex flex-row">
      <h2 className="m-3 mr-auto">Aktivnosti <span style={{ display: (props.connection ? "none" : "initial") }} className="badge badge-danger">Server offline</span></h2>
      <Link onClick={goToPage} className="my-3 mr-1 btn btn-dark" to="/">Unos</Link>
      <Link onClick={goToPage} className="my-3 mr-3 btn btn-dark" to="/popis">Popis</Link>
    </div>
  )
}

export default Navigacija
