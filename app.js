'use strict';
console.log('Hello, world.');

let prodCatalog = [];

//////// CONSTRUCTOR //////////
// gotta be in /img/; gotta be .jpg;
function Product(name){
  this.name = name;
  this.img = './img/' + name + '.jpg';
  this.shownCount = 0;
  this.chosenCount = 0;

  prodCatalog.push(this);
}

/////////// PROTO ///////////

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
  let randIdx = Math.floor(Math.random() * prodCatalog.length);
  return randIdx;
}

function randProducts(amount = 3){
  let arr = [];

  while (arr.length < amount){
    let randyPro = prodCatalog[randIndex()];
    if(!arr.includes(randyPro)){
      arr.push(randyPro);
    }
  }
  return arr;
}
