const body = document.querySelector('body');
const gridContainer = document.querySelector('.grid');
const grid = document.querySelectorAll('.grid-box');
const overlay = document.querySelector('.overlay');
const modal = document.getElementById('js-modal');
const closeIcon = document.querySelector('.close');
let arr = [];

//--------------
// FETCH API
//--------------

fetchData('https://randomuser.me/api/?results=12&nat=us')
    .then(data => storeData(data))

//--------------
// FUNCTIONS
//--------------
function fetchData(url) {
    return fetch(url)
        .then(res => res.json())
        .catch(error => console.log(`It looks like we encountered an error!, ${error}`))
}

//store each reponse in an array then call the function to populate the html with employee info
function storeData(response) {
    arr.push(response);
    $.each(arr[0].results, function (i, employee) {
        getEmployeeInfo(employee, grid[i]);
    });
}

function getEmployeeInfo(data, gridBox) {
    let employeeGrid = gridBox;
    //img info
    const img = employeeGrid.querySelector('img.api-img');
    img.src = data.picture.large;
    //name info
    const empName = employeeGrid.querySelector('h2.name');
    empName.innerHTML = `${data.name.first} ${data.name.last}`;
    //email info
    const email = employeeGrid.querySelector('p.email');
    email.innerHTML = data.email;
    //location info
    const location = employeeGrid.querySelector('p.location');
    location.innerHTML = data.location.city;
}

function showModal(i) {
    overlay.style.display = 'block';
    modal.style.display = 'block';
    const employeeData = arr[0].results;
    
    const mdImg = document.querySelector('img.md-img');
    mdImg.src = employeeData[i].picture.large;
    
    const mdH2 = document.querySelector('h2.md-h2');
    mdH2.innerHTML = `${employeeData[i].name.first} ${employeeData[i].name.last}`;
    
    const mdEmail = document.querySelector('p.md-email');
    mdEmail.innerHTML = employeeData[i].email;
    
    const mdLocation = document.querySelector('p.md-location');
    mdLocation.innerHTML = employeeData[i].location.city;
    
    const mdPhone = document.querySelector('.md-phone');
    mdPhone.innerHTML =  employeeData[i].phone;
   
    const mdAddress = document.querySelector('.md-address');
    mdAddress.innerHTML =  `${employeeData[i].location.street} 
                            ${employeeData[i].location.city}, 
                            ${employeeData[i].location.state}
                            ${employeeData[i].location.postcode}`;
    
    const mdDOB = document.querySelector('.md-dob');
    mdDOB.innerHTML = `Birthday: ${employeeData[i].dob}`;
}

//--------------
// EVENT HANDLERS
//--------------
gridContainer.addEventListener('click', (e) => {
    for (let i = 0; i < grid.length; i++) {
        gridContainer.children[i].onclick = function () {
            console.log(i);
            showModal(i);
        }; 
    } //end for loop
});

body.addEventListener('click', (e) => {
    if (e.target == overlay || e.target == closeIcon) {
        overlay.style.display = 'none';
        modal.style.display = 'none';
    }
});
