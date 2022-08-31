'use strict';
console.log('Hello, world.');

///////GLOBAL :( ///////
let maxClicks = 25;
let clicks = 0;

//////// CONSTRUCTOR //////////
// gotta be in /img/; gotta be .jpg;

function Product(name){
  this.name = name;
  this.img = './img/' + name + '.jpg';
  this.shownCount = 0;
  this.chosenCount = 0;

  catalog.push(this);
}

/////////// PROTO ///////////

let catalog = [];
let lastUp = [];


Product.prototype.incChosen = function (amount = 1){
  this.chosenCount += amount;
};


Product.prototype.incShown = function (){
  this.shownCount++;
};


///////// LOCAL STORAGE /////////

function getStorage(){
  let storedCata = localStorage.getItem('catalog');
  console.log('retrieved data: ' + storedCata);
  if (storedCata){
    console.log('loaded data');
    catalog = JSON.parse(storedCata);
  }
}


function updateStorage(){
  let stringForStorage = JSON.stringify(catalog);
  console.log(stringForStorage);
  localStorage.setItem('catalog', stringForStorage);
}


////////// PROD INIT //////////


new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');


////////// FUNCY TOWN //////////


function randIndex(){
  let randIdx = Math.floor(Math.random() * catalog.length);
  return randIdx;
}


function randProducts(amount = 3){
  let arr = [];

  while (arr.length < amount){
    let randyPro = catalog[randIndex()];
    if(!arr.includes(randyPro) && !lastUp.includes(randyPro)){
      arr.push(randyPro);
    }
  }
  lastUp = arr;
  return arr;
}


function handleClick(event) {
  if (event.target === imgContainer){
    console.log('you missed');
    return;
  }
  clicks++;
  let chosenProd = event.target.alt;
  for (let i=0; i < catalog.length; i++){
    if (chosenProd === catalog[i].name){
      catalog[i].chosenCount++;
      render(randProducts());
      break;
    }
  }
}

function capitalize(str){
  let returnVal = str.split('');
  returnVal[0] = returnVal[0].toUpperCase();
  returnVal = returnVal.join('');
  return returnVal;
}



function revealButton(){

  let resultsButton = document.getElementById('revealer');
  resultsButton.hidden = false;
  resultsButton.addEventListener('click', function(){
    document.getElementById('chart-area').hidden = false;
  });
}
//----------RENDER---------------------//

let imgContainer = document.getElementById('img-display');
imgContainer.addEventListener('click', handleClick);

function render(array){
  updateStorage();
  if (clicks < maxClicks) {

    while (imgContainer.firstChild){
      imgContainer.removeChild(imgContainer.firstChild);
    }

    for(let i = 0; i < array.length; i++){
      array[i].shownCount++;
      let prodImg = document.createElement('img');
      prodImg.src = array[i].img;
      prodImg.alt = array[i].name;
      imgContainer.appendChild(prodImg);
    }
  } else {
    imgContainer.removeEventListener('click', handleClick);
    renderChart();
    revealButton();
  }
}

/////// CHART /////////
function renderChart(){

  // Read data
  let prodNames = [];
  let prodClicks = [];
  let prodViews = [];
  for (let i = 0; i < catalog.length; i++) {
    prodNames.push(capitalize(catalog[i].name));
    prodClicks.push(catalog[i].chosenCount);
    prodViews.push(catalog[i].shownCount);
  }

  // Create datasets
  const data = {
    labels: prodNames,
    datasets: [{
      label: 'Clicks',
      data: prodClicks,
      backgroundColor:['rgba(0,255,0.5)'],
      borderColor:['rgba(0,255,0,1)'],
      borderWidth: 1
    },
    {
      label: 'Views',
      data: prodViews,
      backgroundColor: ['rgba(0,0,255,0.5)'],
      borderColor: ['rgba(0,0,255,1)'],
      borderWidth: 1
    }]
  };

  const ctx = document.getElementById('myChart');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}



////// START ///////
getStorage();
render(randProducts());
