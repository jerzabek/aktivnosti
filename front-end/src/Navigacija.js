import React from 'react'
import Swal from 'sweetalert2'

function Navigacija(props) {
  const goToPage = (newPage) => {
    if(props.editing !== -1) {
      const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      })

      toast.fire({ type: 'warning', title: 'Završite sa uređivanjem prije izlaska!' })

      return
    }

    if (props.page === newPage)
      return

    props.switch(newPage)
  }

  const goToUnos = () => goToPage(0)
  const goToPopis = () => goToPage(1)
  
  return (
    <div className="d-flex flex-row">
      <h2 className="m-3 mr-auto">Aktivnosti <span style={{ display: (props.connection ? "none" : "initial") }} className="badge badge-danger">Server offline</span></h2>
      <button className={"my-3 mr-1 btn btn" + (props.page === 0 ? "" : "-outline") + "-dark"} onClick={goToUnos}>Unos</button>
      <button className={"my-3 mr-3 btn btn" + (props.page === 1 ? "" : "-outline") + "-dark"} onClick={goToPopis}>Popis</button>
    </div>
  )
}

export default Navigacija
