import React, { useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import xIcon from './imgs/cancel.svg'

function EditingRed(props) {
  const deleteRow = props.deleteRow
  const id = props.id
  const [naziv, setNaziv] = useState(props.naziv)
  const [kategorija, setKategorija] = useState(props.kategorija)
  const [podkategorija, setPodkategorija] = useState(props.podkategorija)
  const editRow = props.editRow
  const cancelEdit = () => {
    props.cancelEditing(-1)
  }

  return (
    <tr key={id}>
      <td onClick={() => deleteModal(id, deleteRow)} className='brisi'>
        <img src={xIcon} width='25em' height='25em' alt='Ikona brisanja'></img>
      </td>
      <td className='confirmaj'>
        <div className='d-flex flex-column align-items-center'>
          <div onClick={cancelEdit} className='odustani'>
            <p>Odustani</p>
          </div>
          <div onClick={() => editRow({ id, naziv, kategorija, podkategorija })} className='prihvati'>
            <p>Spremi</p>
          </div>
        </div>
      </td>
      <th scope='row'>{id}</th>
      <td className='p-0'><textarea className='w-100 h-100' value={naziv} onChange={(e) => setNaziv(e.target.value)} name='naziv' placeholder='Naziv'></textarea></td>
      <td className='p-0'><textarea className='w-100 h-100' value={kategorija} onChange={(e) => setKategorija(e.target.value)} name='kategorija' placeholder='Kategorija'></textarea></td>
      <td className='p-0'><textarea className='w-100 h-100' value={podkategorija} onChange={(e) => setPodkategorija(e.target.value)} name='podkat' placeholder='Podkategorija'></textarea></td>
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

export default EditingRed