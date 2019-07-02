import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import editIcon from './imgs/edit.svg'
import xIcon from './imgs/cancel.svg'

function Red(props) {
  const deleteRow = props.deleteRow
  const id = props.id
  const naziv = props.naziv
  const kategorija = props.kategorija
  const podkategorija = props.podkategorija
  const editRow = props.editRow

  return (
    <tr key={id}>
      <td onClick={() => deleteModal(id, deleteRow)} className='brisi'>
        <img src={xIcon} width='25em' height='25em' alt='Ikona brisanja'></img>
      </td>
      <td onClick={() => editRow(id)} className='editaj'>
        <img src={editIcon} width='25em' height='25em' alt='Ikona uređivanja'></img>
      </td>
      <th scope="row">{id}</th>
      <td>{naziv}</td>
      <td>{kategorija}</td>
      <td>{podkategorija}</td>
    </tr >
  )
}

function deleteModal(id, deleteRow) {
  const MySwal = withReactContent(Swal)

  MySwal.queue([{
    title: 'Jeste li sigurni?',
    text: 'Ova akcija se ne može poništiti - ' + id,
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Odustani',
    confirmButtonText: 'Briši',
    showLoaderOnConfirm: true,
    preConfirm: () => {
      return fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
          deleteRow(id)
          return MySwal.insertQueueStep({ title: 'IP', text: data.ip })
        })
        .catch(() => {
          MySwal.insertQueueStep({
            type: 'error',
            title: 'Unable to get your public IP'
          })
        })
    }
  }])
}

export default Red