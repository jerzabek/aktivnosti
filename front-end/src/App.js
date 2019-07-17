import React, { Component } from 'react'
import Navigacija from './Navigacija'
import Unos from './Unos'
import Popis from './Popis'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getAktivnosti, deleteAktivnost, editAktivnost, stvoriAktivnost } from './API'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      connection: true,
      editing: -1
    }

    this.deleteRow = this.deleteRow.bind(this)
    this.editRow = this.editRow.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setEditing = this.setEditing.bind(this)
    this.onBeforeUnload = this.onBeforeUnload.bind(this)
  }

  setEditing(editing) {
    this.setState({ editing })
  }

  onBeforeUnload(e) {
    var dirty = false
    var len = e.srcElement.forms.length

    if (len > 0) {
      var form = [...e.srcElement.forms[0]]
      form.pop()
      dirty = form.filter((val, index) => val.value.trim() !== '').length > 0;
    }

    if (this.state.editing !== -1 || dirty) {
      const msg = 'Molimo Vas spremite promjene prije izlaska sa stranice'; // radi u starim verzijama browsera

      (e || window.event).returnValue = msg
      return msg
    }
  }

  async componentDidMount() {
    window.addEventListener('beforeunload', this.onBeforeUnload)
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

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onBeforeUnload)
  }

  render() {
    return (
      <Router>
        <div>
          <Navigacija connection={this.state.connection} editing={this.state.editing} />
          <hr />
          <div className="m-3">
            <Switch>
              <Route path={["/", "/unos"]} exact
                render={props =>
                  <Unos {...props} handleSubmit={this.handleSubmit} connection={this.state.connection} />} />
              <Route path="/popis" exact
                render={props =>
                  <Popis {...props} data={this.state.data} deleteRow={this.deleteRow} editRow={this.editRow} editing={this.state.editing} setEditing={this.setEditing} />} />
              <Redirect to="/" />
            </Switch>
          </div>
        </div>
      </Router>
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

    this.setState({ connection: true })

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
        clearInputs()
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
