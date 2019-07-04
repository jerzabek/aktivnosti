const baseUrl = 'http://localhost:4567/api'

function getAktivnosti() {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest()
    const url = `${baseUrl}/aktivnosti`
    xhr.open('GET', url, true)
    xhr.send()

    xhr.onreadystatechange = (e) => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText))
        } else {
          reject(xhr.responseText)
        }
      }
    }
  })
}

function deleteAktivnost(id) {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest()
    const url = `${baseUrl}/aktivnosti/${id}`
    xhr.open('DELETE', url, true)
    xhr.send()

    xhr.onreadystatechange = (e) => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve({ type: 'success', title: 'Uspjeh!' })
        } else if (xhr.status === 400) {
          resolve({ type: 'error', title: `${id} nije valjan broj.` })
        } else if (xhr.status === 404) {
          resolve({ type: 'warning', title: `Ta aktivnost ne postoji.` })
        } else {
          reject(xhr.responseText)
        }
      }
    }
  })
}

function editAktivnost(aktivnost) {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest()
    const url = `${baseUrl}/aktivnosti/${aktivnost.id}`
    xhr.open('PUT', url, true)

    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.send(JSON.stringify(aktivnost))

    xhr.onreadystatechange = (e) => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve({ type: 'success', title: 'Uspjeh!' })
        } else if (xhr.status === 400) {
          resolve({ type: 'error', title: `${aktivnost.id} nije valjan broj.` })
        } else if (xhr.status === 404) {
          resolve({ type: 'warning', title: `Ta aktivnost ne postoji.` })
        } else if (xhr.status === 422) {
          resolve({ type: 'error', title: `Podaci su neispravni.` })
        } else {
          reject(xhr.responseText)
        }
      }
    }
  })
}

function stvoriAktivnost(naziv, kategorija, podkategorija) {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest()
    const url = `${baseUrl}/aktivnosti`
    xhr.open('POST', url, true)
    
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({ naziv, kategorija, podkategorija }))

    xhr.onreadystatechange = (e) => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve({ type: 'success', title: 'Uspjeh!' })
        } else if (xhr.status === 422) {
          resolve({ type: 'error', title: `Podaci su neispravni.` })
        } else {
          reject(xhr.responseText)
        }
      }
    }
  })
}

export { getAktivnosti, deleteAktivnost, editAktivnost, stvoriAktivnost }