import React, { useState } from 'react'

function Unos(props) {
  const [naziv, setNaziv] = useState('')
  const [kategorija, setKategorija] = useState('')
  const [podkategorija, setPodkategorija] = useState('')

  const handle = (e) => {
    e.preventDefault()
    setNaziv('')
    setKategorija('')
    setPodkategorija('')
    props.handleSubmit(naziv, kategorija, podkategorija)
  }

  return (
    <div>
      <h1>Unos aktivnosti</h1>

      <hr />

      <form onSubmit={handle}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">Naziv</span>
          </div>
          <input type="text" className="form-control" maxLength='10' value={naziv} onChange={ (e) => setNaziv(e.target.value) } placeholder="Naziv aktivnosti" aria-label="naziv" aria-describedby="basic-addon1"></input>
        </div>
        
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon2">Kategorija</span>
          </div>
          <input type="text" className="form-control" maxLength='20' value={kategorija} onChange={ (e) => setKategorija(e.target.value) } placeholder="Kategorija aktivnosti" aria-label="kategorija" aria-describedby="basic-addon2"></input>
        </div>
        
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon3">Podkategorija</span>
          </div>
          <input type="text" className="form-control" maxLength='30' value={podkategorija} onChange={ (e) => setPodkategorija(e.target.value) } placeholder="Podkategorija aktivnosti" aria-label="podkate" aria-describedby="basic-addon3"></input>
        </div>

        <button className='btn btn-dark' type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Unos