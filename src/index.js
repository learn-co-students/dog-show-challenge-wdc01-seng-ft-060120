document.addEventListener('DOMContentLoaded', start)

const url = 'http://localhost:3000/dogs/';

const fetchDogs = () => {
    fetch(url)
    .then(resp => resp.json())
    .then(dogs => displayDogs(dogs))
    .catch(error => console.log(error))
}

const displayDogs = (dogs) => {
    dogs.forEach(dog => renderDog(dog))
}

const renderDog = (dog) => {
    let table = document.getElementById('table-body')
    let row = document.createElement('tr');
    let cellName = document.createElement('td');
    let cellBreed = document.createElement('td');
    let cellSex = document.createElement('td');
    let cellButton = document.createElement('td');
    let button = document.createElement('button');

    cellName.innerText = dog.name;
    cellBreed.innerText = dog.breed;
    cellSex.innerText = dog.sex;
    button.className = 'edit';
    button.innerText = 'Edit Dog';
    button.dataset.id = dog.id;
    
    button.addEventListener('click', () => {
        editDog(dog, event)
    })

    cellButton.append(button);
    row.append(cellName, cellBreed, cellSex, cellButton);
    table.append(row);
}

const editDog = (dog, event) => {
    console.log(dog);
    // console.log(event.target);
    let editDogForm = document.getElementById('dog-form');
    editDogForm.dataset.id = dog.id
    editDogForm.name.value = dog.name
    editDogForm.breed.value = dog.breed
    editDogForm.sex.value = dog.sex

    editDogForm.addEventListener('submit', () => {
        postDog(dog, event);
    })
}

const postDog =(dog, event) => {
    event.preventDefault();
    
    let editDogForm = document.getElementById('dog-form');
    let name = editDogForm.children[0];
    let breed = editDogForm.children[1];
    let sex = editDogForm.children[2];
 
    let dogData = {
        'id': dog.id,
        'name': name.value,
        'breed': breed.value,
        'sex': sex.value
    }
    console.log(dogData);
    debugger
    fetch(URL + dog.id, {
         method : 'PATCH',
         headers: {'content-type' : 'application/json', 'accept' : 'application/json'},
         body : JSON.stringify(dogData)
    })
    .then(response => response.json())
    .then(dog => fetchDogs());

    event.target.reset();
}

function start() {
    fetchDogs();
}