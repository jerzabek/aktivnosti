import React, { useState } from 'react'
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
      <td onClick={() => deleteRow(id)} className='brisi'>
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
      <td className='p-0'>
        <textarea maxLength={10} className='w-100 h-100' value={naziv} onChange={(e) => setNaziv(e.target.value)} name='naziv' placeholder='Naziv'></textarea>
      </td>
      <td className='p-0'>
        <textarea maxLength={20} className='w-100 h-100' value={kategorija} onChange={(e) => setKategorija(e.target.value)} name='kategorija' placeholder='Kategorija'></textarea>
      </td>
      <td className='p-0'>
        <textarea maxLength={30} className='w-100 h-100' value={podkategorija} onChange={(e) => setPodkategorija(e.target.value)} name='podkat' placeholder='Podkategorija'></textarea>
      </td>
    </tr >
  )
}

export default EditingRed