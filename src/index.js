DOGS_URL = 'http://localhost:3000/dogs/'

document.addEventListener('DOMContentLoaded', () => {

    const getDogs = () => {
        fetch(DOGS_URL)
        .then(resp => resp.json())
        .then(dogArray => {
            renderDogs(dogArray)
        })
    }

    const renderDogs = (dogs) => {
        const tbody = document.getElementById('table-body')

        tbody.innerHTML = ''

        dogs.forEach(dog => {
            renderDog(dog, tbody)
        })
    }

    const renderDog = (dog, tbody) => {
        
        const tr = document.createElement('tr')
        tr.dataset.dogId = dog.id 
        tbody.appendChild(tr)

        const dogName = document.createElement('td')
        dogName.innerText = dog.name 
        tr.appendChild(dogName)
        

        const dogBreed = document.createElement('td')
        dogBreed.innerText = dog.breed 
        tr.appendChild(dogBreed)

        const dogSex = document.createElement('td')
        dogSex.innerText = dog.sex 
        tr.appendChild(dogSex)

        const button = document.createElement('button')
        button.innerText = 'Edit Button'
        tr.appendChild(button)

        button.addEventListener('click', (event) => {
            populateSubmitForm(dog);
        })

    }


    const submitHandler = () => {
        
        const dogForm = document.getElementById('dog-form');
        dogForm.addEventListener('submit', (event) => {
            event.preventDefault();

        const id = dogForm.dataset.id
        const name = dogForm.name.value 
        const breed = dogForm.breed.value 
        const sex = dogForm.sex.value 

        const body = {name, breed, sex} 


        updateDog(id, body)
            

            
        })
    }

    const updateDog = (id, body) => {
        const options = {
            method: "PATCH",
            headers: {
                'content-type' : 'application/json',
                'accept' : 'application/json'
            },
            body: JSON.stringify(body)
        }

        fetch(DOGS_URL + id, options)
        .then(resp => resp.json())
        .then(dog => {
            // const tr = document.querySelectorAll("tr[data-dog-id]")[`${dog.id - 1}`]
            // renderDog(dog);
            getDogs();
        })
    }

    const populateSubmitForm = (dog) => {
        const dogForm = document.getElementById('dog-form')
        dogForm.dataset.id = dog.id
        dogForm.name.value = dog.name
        dogForm.breed.value = dog.breed 
        dogForm.sex.value = dog.sex
    }

    submitHandler();
    getDogs();  

})