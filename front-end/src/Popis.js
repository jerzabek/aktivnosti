import React from 'react'
import Red from './Red'
import EditingRed from './EditingRed'

function Popis(props) {
  const generator = () => {
    const data = props.data
    var rows = []

    for (var i = 0; i < data.length; i++) {
      if (props.editing === data[i].id) {
        rows.push(
          <EditingRed
            key={data[i].id}
            id={data[i].id}
            naziv={data[i].naziv}
            kategorija={data[i].kategorija}
            podkategorija={data[i].podkategorija}
            deleteRow={props.deleteRow}
            cancelEditing={props.setEditing}
            editRow={ (val) => {
              props.editRow(val)
              props.setEditing(-1)
            }} />
        )
      } else {
        rows.push(
          <Red
            key={data[i].id}
            id={data[i].id}
            naziv={data[i].naziv}
            kategorija={data[i].kategorija}
            podkategorija={data[i].podkategorija}
            editRow={props.setEditing}
            deleteRow={props.deleteRow} />
        )
      }
    }

    return rows
  }

  return (
    <div>
      <h3>Popis aktivnosti</h3>

      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col" style={{ width: '2em' }}>Briši</th>
            <th scope="col" style={{ width: '2em' }}>Uredi</th>
            <th scope="col">ID</th>
            <th scope="col">Naziv</th>
            <th scope="col">Kategorija</th>
            <th scope="col">Podkategorija</th>
          </tr>
        </thead>

        <tbody>
          {
            generator()
          }
        </tbody>
      </table>
    </div>
  )
}


export default Popis