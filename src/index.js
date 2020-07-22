const BASE_URL = 'http://localhost:3000/'
const DOGS_URL = BASE_URL + 'dogs/'

document.addEventListener('DOMContentLoaded', () => {
    const dogForm = document.querySelector('#dog-form');
    const tbody = document.querySelector('#table-body');

    const fetchAllDogs = () => {
        // Fet all dogs from DOGS_URL, and will post if there is a successful request.
        // If there is not, then the error will alert the user.
        fetch(DOGS_URL)
        .then(response => response.json())
        .then(dogs => postAllDogs(dogs))
        .catch(error => alert(error));
    }

    const sendDogPatch = () => {
        // Get the dog id
        const dogId = dogForm.dogid.value;

        // Create options for the PATCH request
        const options = {
            method: 'PATCH',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                id: dogId, 
                name: dogForm.name.value, 
                breed: dogForm.breed.value, 
                sex: dogForm.sex.value
            })
        }

        // Sending a fetch request to update the dog
        // If successful it will clear the table and form and re-render the doggos
        // If it fails it will alert the user with the error;
        fetch(`${DOGS_URL}${dogId}`, options)
        .then(response => response.json())
        .then(dog => {
            // Resetting the dog form and updating the dog in the table
            resetDogForm();
            updateDog(dog);
        })
        .catch(error => alert(error));
    }

    const postAllDogs = (dogs) => {
        // Runs the fuction postSingleDog on every dog
        dogs.forEach(dog => postSingleDog(dog));
    }

    const postSingleDog = (dog) => {
        // Creating tr
        const tr = createDogTr(dog);

        // Creating tds
        createAttributeTd('name', dog, tr);
        createAttributeTd('breed', dog, tr);
        createAttributeTd('sex', dog, tr);
        createEditButtonTd(dog, tr);
    }

    const createDogTr = (dog) => {
        // Creates, appends, and returns a tr with dog attributes
        const tr = document.createElement('tr');
        tr.dataset.dogId = dog.id;
        tbody.appendChild(tr);
        return tr;
    }

    const createAttributeTd = (colName, dog, tr) => {
        // Creates and appends a td with specific attributes
        const td = document.createElement('td');
        td.dataset.colName = colName;
        td.innerText = dog[colName];
        tr.appendChild(td);
    }

    const createEditButtonTd = (dog, tr) => {
        // Creates a TD and edit button (with attributes) and appends the TD to the tr
        const editTd = document.createElement('td')
        const editButton = document.createElement('button');
        editButton.dataset.colName = 'edit-button'
        editButton.dataset.dogId = dog.id;
        editButton.innerText = 'Edit Dog';
        editTd.appendChild(editButton);
        tr.appendChild(editTd);
    }

    const putDogInfoInForm = (tr) => {
        // Get dog information from the tr
        const id = tr.dataset.dogId;
        const name = tr.querySelector('td[data-col-name="name"]').innerText;
        const breed = tr.querySelector('td[data-col-name="breed"]').innerText;
        const sex = tr.querySelector('td[data-col-name="sex"]').innerText;

        dogForm.dogid.value = id;
        dogForm.name.value = name;
        dogForm.breed.value = breed;
        dogForm.sex.value = sex;
    }

    const resetDogForm = () => {
        // Resetting the dog form 
        // For some reason, the hidden ID field doesn't reset, so we do that part manually.
        dogForm.dogid.value = '';
        dogForm.reset();
    }

    const updateDog = (dog) => {
        // Find dogTr
        const dogTr = tbody.querySelector(`tr[data-dog-id="${dog.id}"]`)

        // Update cells
        dogTr.querySelector('td[data-col-name="name"]').innerText = dog.name;
        dogTr.querySelector('td[data-col-name="breed"]').innerText = dog.breed;
        dogTr.querySelector('td[data-col-name="sex"]').innerText = dog.sex;
    }

    document.addEventListener('click', (event) => {
        // If the user clicks on an edit dog button
        if (event.target.dataset.colName === 'edit-button') {
            // Get the current TR, and put information in the form
            const dogTr = event.target.parentNode.parentNode;
            putDogInfoInForm(dogTr);
        }
    })

    document.addEventListener('submit', (event) => {
        // If the user clicks on the dogForm submit button
        if (event.target === dogForm) {
            // Send dog patch and prevents the form from doing a normal submit
            sendDogPatch();
            event.preventDefault();
        }
    })

    fetchAllDogs();
})