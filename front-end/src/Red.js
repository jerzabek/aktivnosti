import React from 'react'
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
      <td onClick={() => deleteRow(id)} className='brisi'>
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

export default Red