import React, { Component } from 'react'
import Navigacija from './Navigacija'
import Unos from './Unos'
import Popis from './Popis'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      page: 0,
      data: [
        { id: 1, naziv: 'Tenis', kategorija: 'Slobodno vrijeme', podkategorija: 'Sport' },
        { id: 2, naziv: 'Gaming', kategorija: 'Slobodno vrijeme', podkategorija: 'Zabava' },
        { id: 3, naziv: 'Kuhanje', kategorija: 'Obveze', podkategorija: 'Kućne obveze' }
      ]
    }

    this.switchFunc = this.switchFunc.bind(this)
    this.deleteRow = this.deleteRow.bind(this)
    this.editRow = this.editRow.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div>
        <Navigacija page={this.state.page} switch={this.switchFunc} />
        <hr />
        <div className="m-3">
          {
            this.state.page === 0 ? (
              <Unos handleSubmit={this.handleSubmit}/>
            ) : (
              <Popis data={ this.state.data } deleteRow={ this.deleteRow } editRow={ this.editRow }/>
            )
          }
        </div>
      </div>
    )
  }

  editRow(newRow) { // uređivanje reda
    var data = this.state.data

    data = data.map((oldRow, index) => {
      if(oldRow.id === newRow.id) {
        return newRow
      } else {
        return oldRow
      }
    })

    this.setState({
      data: data
    })
  }

  switchFunc(newPage) {
    this.setState({ page: newPage })
  }

  deleteRow(id) { // brisanje reda
    var data = [ ...this.state.data ]
    var newData = []
    for(var i = 0; i < data.length; i++) {
      if(data[i].id !== id) 
        newData.push(data[i])
    }
    
    this.setState({ data: newData })
  }

  handleSubmit(naziv, kategorija, podkategorija) { // stvaranje novog reda
    console.log(naziv)
    this.setState({
      data: [ ...this.state.data, { id: this.state.data.length + 1, naziv, kategorija, podkategorija}]
    })
  }
}

export default App
