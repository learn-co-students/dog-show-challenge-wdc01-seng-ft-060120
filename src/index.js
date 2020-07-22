const baseURL = 'http://localhost:3000/'
const dogsURL = baseURL + 'dogs/'

document.addEventListener('DOMContentLoaded', () => {
  fetchDogs()
  editDogForm()
})

const fetchDogs = () => {
  // initial get request
  fetch(dogsURL)
    .then(resp => resp.json())
    .then(dogs => {
      renderAllDogs(dogs)
      console.log('get request returns: ', dogs)
    })
}

const renderAllDogs = dogs => {
  dogs.forEach(dog => renderDog(dog))
}

const renderDog = dog => {
  const dogTable = document.getElementById('table-body')

  const tableRow = document.createElement('tr')
  tableRow.dataset.dogId = dog.id
  dogTable.appendChild(tableRow)

  const dataName = document.createElement('td')
  dataName.textContent = dog.name
  dataName.classList += 'name'
  tableRow.appendChild(dataName)

  const dataBreed = document.createElement('td')
  dataBreed.textContent = dog.breed
  dataBreed.classList += 'breed'
  tableRow.appendChild(dataBreed)

  const dataSex = document.createElement('td')
  dataSex.textContent = dog.sex
  dataSex.classList += 'sex'
  tableRow.appendChild(dataSex)

  const editButton = document.createElement('button')
  editButton.textContent = 'Edit Dog'
  tableRow.appendChild(editButton)

  handleButtonListener(editButton, dog)
}

const handleButtonListener = (editButton, dog) => {
  // grab form
  const editForm = document.getElementById('dog-form')

  editButton.addEventListener('click', () => {
    // populate inputs
    editForm.name.value = dog.name
    editForm.breed.value = dog.breed
    editForm.sex.value = dog.sex

    // gives the form a dataset of the dog id
    editForm.dataset.dogId = dog.id
  })
}

const editDogForm = () => {
  const form = document.getElementById('dog-form')
  // listen for submit
  form.addEventListener('submit', e => {
    e.preventDefault()
    // grab form
    const dogId = document.querySelector('form#dog-form').dataset.dogId

    // make patch request configuratino Object
    const patchRequest = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json'
      },
      body: JSON.stringify({
        name: form.name.value,
        breed: form.breed.value,
        sex: form.sex.value
      })
    }

    //resets the form
    form.reset()

    // make a patch request to dogsURL
    fetch(dogsURL + dogId, patchRequest)
      .then(resp => resp.json())
      .then(dog => {
        console.log('patch request returns: ', dog)
        // reloadTable()
        updateDogRow(dog)
      })
  })
}

const updateDogRow = dog => {
  // select dog row
  const dogRow = document.querySelector(`tr[data-dog-id="${dog.id}"`)

  // update row
  dogRow.querySelector('.name').textContent = dog.name
  dogRow.querySelector('.breed').textContent = dog.breed
  dogRow.querySelector('.sex').textContent = dog.sex

  // update the edit button listener so that it popluates the form correctly
  const editButton = document.querySelector(`tr[data-dog-id="${dog.id}"] button`)
  handleButtonListener(editButton, dog)
}
