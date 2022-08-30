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
  console.log(event.target.alt);
  clicks++;
  let chosenProd = event.target.alt;
  for (let i=0; i < catalog.length; i++){
    if (chosenProd === catalog[i].name){
      catalog[i].incChosen();
      render(randProducts());
    }
  }
}

//---------- RESULTS ----------------------//


function results(){
  resultsList();
  resultsImgs();
}

function resultsList(){
  let resultsList = document.getElementById('results-list');
  for (let i = 0; i < catalog.length; i++) {
    let prodLi = document.createElement('li');
    let prod = catalog[i];
    let prodInfo = `Product: ${prod.name}. 
                    Clicks: ${prod.chosenCount}. 
                    Appearences: ${prod.shownCount}. `;
    prodLi.textContent = prodInfo;
    resultsList.appendChild(prodLi);
  }
}

function resultsImgs(){
  //doot doot tbd
}

let resultsArea = document.getElementById('results');
resultsArea.addEventListener('click', resultsList);
//----------RENDER---------------------//

function render(array){

  let imgContainer = document.getElementById('img-display');
  while (imgContainer.firstChild){
    imgContainer.removeChild(imgContainer.firstChild);
  }
  if (clicks < maxClicks) {
    for(let i = 0; i < array.length; i++){
      array[i].incShown();
      let prodImg = document.createElement('img');
      prodImg.src = array[i].img;
      prodImg.alt = array[i].name;
      prodImg.addEventListener('click', handleClick);
      imgContainer.appendChild(prodImg);
    }
  } else {
    console.log('beep boop here is results');
    renderChart();
  }
}

/////// CHART /////////
function renderChart(){

  // Read data
  let prodNames = [];
  let prodClicks = [];
  let prodViews = [];
  for (let i = 0; i < catalog.length; i++) {
    prodNames.push(catalog[i].name);
    prodClicks.push(catalog[i].chosenCount);
    prodViews.push(catalog[i].shownCount);
  }

  // Create datasets
  const data = {
    labels: prodNames,
    datasets: [{
      label: 'Clicks',
      data: prodClicks,
      backgroundColor:['rgba(255,0,0,0.5)'],
      borderColor:['rgba(255,0,0,1)'],
      borderWidth: 1
    },
    {
      label: 'Views',
      data: prodViews,
      backgroundColor: ['rgba(0,255,0,0.5)'],
      borderColor: ['rgba(0,255,0,1)'],
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

render(randProducts());
