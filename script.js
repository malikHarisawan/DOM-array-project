

const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];


getRandomUser();
getRandomUser();

async function getRandomUser(){

    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    const newUser={
        name : `${user.name.first} ${user.name.last}`,
        wealth: Math.floor(Math.random()* 10000)
    }

    addUser(newUser);

}



function addUser(obj){
    data.push(obj);
    updateDOM();
}

function updateDOM(provided = data){
    main.innerHTML = ` <h2><strong>Person</strong> Wealth</h2>`;
    provided.forEach(item =>{
        const element = document.createElement('div');
        element.classList.add('person')
        element.innerHTML =`<strong>${item.name}</strong> ${item.wealth}`;
        main.appendChild(element);
    })
}


function DoubleWealth(){
     data = data.map(item => {
        return{...item, wealth: item.wealth * 2}
     })
     updateDOM()
}

function sortByRichest(){
    data.sort((a,b) => b.wealth - a.wealth)
    updateDOM()
}

function showMillionaires(){
    data  = data.filter(item =>item.wealth >= 100000 )
    updateDOM()
}

function calculateWealt(){

 const total = data.reduce((sum , num) => (sum+=num.wealth),0)
  const welEl = document.createElement('div');
  welEl.innerHTML = `<h3>Total Wealth:<stronge>${total}</stronge></h3> `
  main.appendChild(welEl)
}


addUserBtn.addEventListener('click',getRandomUser)
doubleBtn.addEventListener('click',DoubleWealth)
sortBtn.addEventListener('click',sortByRichest)
showMillionairesBtn.addEventListener('click',showMillionaires)
calculateWealthBtn.addEventListener('click',calculateWealt)
