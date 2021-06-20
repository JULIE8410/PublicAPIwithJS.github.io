//get form element with the Id form
const form = document.getElementById('form');

//variables to hold 12 employees
var allEmployees;

getData();

//get random employees
function getData(){

    let url = 'https://randomuser.me/api/?results=12';

    fetch(url)

        .then(res => {
            if(!res.ok){
                throw new Error("Error HTTP");
            }
            return res.json();
        })
        .then(data => createRandomEmployees(data.results))  
        .catch(err => console.log(err.message));
}


// assemble employees and append them to DOM
function createRandomEmployees(data){

    allEmployees = data;
    // get Div element with the id gallery
    var divGallery = document.getElementById('gallery');

    // traverse data array
    for(var i = 0; i < data.length; i++){
        
        // create div element
        var divCard = document.createElement('div');

        // add class name
        divCard.className = 'card';

        // add modal event
        divCard.addEventListener('click', showModal);
        
        // create div element for contain card image
        var divCardImgContainer = document.createElement('div');

        // add class name
        divCardImgContainer.className = 'card-img-container';

        // create img element
        var imgCard = document.createElement('img');

        // add class name
        imgCard.className = 'card-img';

        // add image course
        imgCard.src = data[i].picture.large;

        // create div element for card information
        var divCardInfoContainer = document.createElement('div');

        // add class name
        divCardInfoContainer.className = 'card-info-container'

        // create h3 element
        var h3Name = document.createElement('h3');

        // add class name
        h3Name.className = 'card-name cap';

        // set fullname as id
        h3Name.id = `${data[i].name.first}${data[i].name.last}`;

        // set innerText to display fullname
        h3Name.innerText = `${data[i].name.first} ${data[i].name.last}`;

        // create p element
        var pCardTextEmail = document.createElement('p');

        // add class name
        pCardTextEmail.className = 'card-text';

        //set innerText to display email
        pCardTextEmail.innerText = data[i].email;
        
        // create p element
        var pCardTextCityState = document.createElement('p');

        // add class name
        pCardTextCityState.className = 'card-text cap';

        // set innerText to display city/state informtaion
        pCardTextCityState.innerText = `${data[i].location.city}, ${data[i].location.state}`;

        // append card-image to card-image div container
        divCardImgContainer.appendChild(imgCard);

        // append the card-image div container to div(".card")
        divCard.appendChild(divCardImgContainer);

        // append h3 element to card-info-container
        divCardInfoContainer.appendChild(h3Name);

        // append card-text(email) element to card-info-container
        divCardInfoContainer.appendChild(pCardTextEmail);

        // append c-text(city, state) element to card-info-container
        divCardInfoContainer.appendChild(pCardTextCityState);

        // append card-img-container to div(".card") element
        divCard.appendChild(divCardImgContainer);

        // append card-info-container to div(".card") element
        divCard.appendChild(divCardInfoContainer);

        // append div(".card") to the gallery(div element)
        divGallery.insertAdjacentElement('afterbegin', divCard);
    }
}

// search employee by search terms
function searchEmployee(e){

    e.preventDefault();

    // get the term that a user typed 
    var term = form.elements[0].value.toUpperCase();

    // console.log(term);

    // get all element whose class name is card
    var employees = document.querySelectorAll('.card');

    // traverse all element of employees to find matching employee
    employees.forEach(emp => {

        // get the name of employee
        const name = emp.querySelector('.card-name').innerText.toUpperCase();

        // if the name includes the term
        if(name.indexOf(term) > -1){
            // show the employee
            emp.style.display = 'flex';

        }else{ // if the name does not include the term
            // set the employee unvisible
            emp.style.display = 'none';
        }
    })   
}

// show modal 
function showModal(e){

    // get the name of the employee user clicked
    var $element = $(this).children('.card-info-container').children('h3').text();  
    // console.log($element);

    // traverse all employees to find matching name
    allEmployees.forEach(emp => {

        // if a employee in the array is equals to the employee clicked
        if($element == (emp.name.first + ' ' + emp.name.last)){

            // create a div element
            const modalEl = document.createElement('div');

            // add a class name
            modalEl.classList.add('modal-container');
            // modalEl.addEventListener('click', )
            
            // create date variable based on employee's birthdate
            var date = new Date(emp.dob.date);

            // get year
            var year = date.getFullYear();

            // get month
            var month = ('0' + (1 + date.getMonth())).slice(-2);

            // get day
            var day = ('0' + date.getDate()).slice(-2);

            // assumble year, month, day
            var dob = year + '-' + month + '-' + day;

            //set innerHTML to div element
            modalEl.innerHTML = `
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${emp.picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${emp.name.first} ${emp.name.last}</h3>
                    <p class="modal-text">${emp.email}</p>
                    <p class="modal-text cap">${emp.location.city}</p>
                    <hr>
                    <p class="modal-text">${emp.phone}</p>
                    <p class="modal-text">${emp.location.street.number} ${emp.location.street.name}., ${emp.location.city}, ${emp.location.state} ${emp.location.postcode}</p>
                    <p class="modal-text">Birthday: ${dob}</p>
            </div>`;

            // get body element
            var x = document.querySelector('body');

            // append modal to body
            x.appendChild(modalEl);
            
            // get modal-close button by id modal-close-btn
            var btnModalClose = document.getElementById('modal-close-btn');

            // add event listener - when a user click the button, it will remove modal
            btnModalClose.addEventListener('click', () => {

                // remove modal element
                modalEl.remove();
            });

            // add event listner - click - when a user clicks outside modal, remove modal element
            window.addEventListener('click', e => e.target == modalEl? modalEl.remove() : false);

        }
    })
}

// add event listener to form - when a user clicks submit button, search employee by term
form.addEventListener('submit', searchEmployee);

