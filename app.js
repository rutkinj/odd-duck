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

  Product.catalog.push(this);
}

/////////// PROTO ///////////

Product.catalog = [];


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
  let randIdx = Math.floor(Math.random() * Product.catalog.length);
  return randIdx;
}


function randProducts(amount = 3){
  let arr = [];

  while (arr.length < amount){
    let randyPro = Product.catalog[randIndex()];
    if(!arr.includes(randyPro)){
      arr.push(randyPro);
    }
  }
  return arr;
}


function handleClick(event) {
  console.log(event.target.alt);
  clicks++;
  let chosenProd = event.target.alt;
  for (let i=0; i < Product.catalog.length; i++){
    if (chosenProd === Product.catalog[i].name){
      Product.catalog[i].incChosen();
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
  for (let i = 0; i < Product.catalog.length; i++) {
    let prodLi = document.createElement('li');
    let prod = Product.catalog[i];
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
let resultsListEle = document.getElementById('results-list');
// resultsListEle.style.display = 'none';
let resultsArea = document.getElementById('results');
resultsArea.addEventListener('button', displayResults);

function displayResults(){
  console.log('bingbong');
  resultsListEle.style.visibility = 'initial';
}


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
    results();
    console.log('beep boop here is results');
  }
}


render(randProducts());
