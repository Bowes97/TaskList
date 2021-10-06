const BACKEND_URL = "http://localhost:3000/names";

const FIELD = document.querySelector('.text');
const ADD = document.querySelector('.button');


ADD.addEventListener('click', function () {
    const NEW_NAME = FIELD.value;
    if (NEW_NAME) {
        const DATA = {
            name: NEW_NAME,
        };
        fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(DATA)
        })
            .then(response => response.json())
            .then(() => getNames())
            .catch(err => console.log(err))
    } else {
        alert('Write a new task')
    }
})
function getNames() {
    fetch(BACKEND_URL)
        .then(response => response.json())
        .then(data => render(data))
        .catch(err => console.log(err))
}
getNames();
function render(data) {
    const names = data;
    names.forEach(element => {
        let template = `<div class="around"><label class="name"><button class="checkbox" id="check" data-name="delete" data-id="${element.id}">delete</button>${element.name}</label></div>`;
        document.querySelector('#names').insertAdjacentHTML('beforeend', template)
    });
}
document.querySelector('#names').addEventListener('click', function (event) {
    if (event.target.dataset.name === 'delete') {
        if (confirm('Are you sure???')) {
            const id = event.target.dataset.id;
            fetch(`${BACKEND_URL}/${id}`, {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(() => getNames())
                .catch(err => console.log(err))
        }
    }

})

