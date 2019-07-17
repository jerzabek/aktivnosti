import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { Prompt } from 'react-router'

function Unos(props) {
  const [naziv, setNaziv] = useState('')
  const [kategorija, setKategorija] = useState('')
  const [podkategorija, setPodkategorija] = useState('')

  const handle = (e) => {
    e.preventDefault()
    
    if (!props.connection) {
      Swal.fire({
        type: 'error',
        title: 'Nema veze sa serverom :(',
        text: 'Spremite upisane podatke te pokušajte ponovno kasnije.'
      })

      return
    }

    const clearInputs = () => {
      setNaziv('')
      setKategorija('')
      setPodkategorija('')
    }

    props.handleSubmit(naziv, kategorija, podkategorija, clearInputs)
  }

  return (
    <div>
      <h1>Unos aktivnosti</h1>

      <hr />

      <React.Fragment>
        <Prompt
          when={naziv.trim() !== '' || kategorija.trim() !== '' || podkategorija.trim() !== ''}
          message='Molimo Vas spremite promjene prije izlaska sa stranice'
        />
        {/* Component JSX */}
      </React.Fragment>

      <form onSubmit={handle}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">Naziv</span>
          </div>
          <input type="text" name='naziv' className="form-control" maxLength='10' value={naziv} onChange={(e) => setNaziv(e.target.value)} placeholder="Naziv aktivnosti (10 znakova)" aria-label="naziv" aria-describedby="basic-addon1" required></input>
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon2">Kategorija</span>
          </div>
          <input type="text" name='kategorija' className="form-control" maxLength='20' value={kategorija} onChange={(e) => setKategorija(e.target.value)} placeholder="Kategorija aktivnosti (20 znakova)" aria-label="kategorija" aria-describedby="basic-addon2" required></input>
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon3">Podkategorija</span>
          </div>
          <input type="text" name='podkategorija' className="form-control" maxLength='30' value={podkategorija} onChange={(e) => setPodkategorija(e.target.value)} placeholder="Podkategorija aktivnosti (30 znakova)" aria-label="podkate" aria-describedby="basic-addon3" required></input>
        </div>

        <button className='btn btn-dark' type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Unos