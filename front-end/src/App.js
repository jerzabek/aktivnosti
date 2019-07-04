import React, { Component } from 'react'
import Navigacija from './Navigacija'
import Unos from './Unos'
import Popis from './Popis'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getAktivnosti, deleteAktivnost, editAktivnost, stvoriAktivnost } from './API'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      page: 0,
      data: [],
      connection: true
    }

    this.switchFunc = this.switchFunc.bind(this)
    this.deleteRow = this.deleteRow.bind(this)
    this.editRow = this.editRow.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    try {
      var data = await getAktivnosti()

      this.setState({ data })
    } catch (e) {
      console.log(e)

      const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      })

      toast.fire({ type: 'error', title: 'Server nedostupan!' })

      this.setState({
        connection: false
      })
    }
  }

  render() {
    return (
      <div>
        <Navigacija page={this.state.page} switch={this.switchFunc} connection={this.state.connection} />
        <hr />
        <div className="m-3">
          {
            this.state.page === 0 ? (
              <Unos handleSubmit={this.handleSubmit} connection={this.state.connection} />
            ) : (
                <Popis data={this.state.data} deleteRow={this.deleteRow} editRow={this.editRow} />
              )
          }
        </div>
      </div>
    )
  }

  async editRow(newRow) { // uređivanje reda
    try {
      var response = await editAktivnost(newRow)
    } catch (e) {
      console.log(e)

      const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      })

      toast.fire({ type: 'error', title: 'Greška!' })
      this.setState({ connection: false })
      return
    }

    if (response.type === 'success') {
      var data = this.state.data

      data = data.map((oldRow, index) => {
        if (oldRow.id === newRow.id) {
          return newRow
        } else {
          return oldRow
        }
      })

      this.setState({
        data: data
      })
    }

    const toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    })

    toast.fire(response)
  }

  switchFunc(newPage) {
    this.setState({ page: newPage })
  }

  async deleteRow(id) { // brisanje reda
    const MySwal = withReactContent(Swal)

    MySwal.queue([{
      title: 'Jeste li sigurni?',
      text: 'Ova akcija se ne može poništiti.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Odustani',
      confirmButtonText: 'Briši',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return deleteAktivnost(id)
          .then((res) => {
            if (res.type === 'success')
              this.deleteLocalRow(id)

            
            return MySwal.insertQueueStep(res)
          })
          .catch((e) => {
            console.log(e)
            MySwal.insertQueueStep({
              type: 'error',
              title: 'Greška!',
              text: e
            })
            this.setState({ connection: false })
          })
      }
    }])
  }

  deleteLocalRow(id) {
    var data = [...this.state.data]
    var newData = []
    for (var i = 0; i < data.length; i++) {
      if (data[i].id !== id)
        newData.push(data[i])
    }

    this.setState({ data: newData })
  }

  async handleSubmit(naziv, kategorija, podkategorija, clearInputs) { // stvaranje novog reda
    try {
      var response = await stvoriAktivnost(naziv, kategorija, podkategorija)

      const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      })

      toast.fire(response)
      if (response.type === 'success') {
        this.setState({
          data: [...this.state.data, { id: this.state.data.length + 1, naziv, kategorija, podkategorija }]
        })
      }

      clearInputs()
    } catch (e) {
      console.log(e)

      const swal = withReactContent(Swal)

      swal.fire({
        type: 'error',
        title: 'Nema veze sa serverom :(',
        text: 'Spremite upisane podatke te pokušajte ponovno kasnije.'
      })
      
      this.setState({ connection: false })
    }
  }
}

export default App
