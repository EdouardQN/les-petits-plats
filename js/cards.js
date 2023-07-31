import {recipes} from './recipes.js';

const rowCard = document.querySelector('.card-row');
const inputSearch = document.querySelector('.search-recipe');

// Create element document and set attributes to it
function setElement(elementType, classContent, innerTextContent, srcMedia, altMedia){
    let element = document.createElement(elementType);
    element.setAttribute('class', classContent);
    if (innerTextContent != "" || innerTextContent != null || innerTextContent != undefined){
        element.innerText = innerTextContent;
    }
    if (elementType === 'img'){
        element.setAttribute('src', srcMedia);
        element.setAttribute('alt', altMedia);
    }
    return element;
} 

function setCardDom() {
    let col = [], card, cardTime, cardImg, cardBody, cardTitle, cardRecipeTitle, cardRecipeText, cardIngredients, cardIngredientsText, spanIngredient, spanQuantityUnit, twoArrays = new Array(recipes.length);

    for (let i=0; i<recipes.length; i++){  

        card = setElement('div', "card position-relative rounded-4 shadow", null);
       
        cardTime = setElement('span', "card-time | bg-primary px-3 py-1 position-absolute end-5 top-3 rounded-pill", `${recipes[i].time} min`);
        cardImg = setElement('img', "card-img-top rounded-top-4", null, `/assets/photos plats/${recipes[i].image}`, `Photo ${recipes[i].name}`);

        cardBody = setElement('div', "card-body d-flex flex-column", null);
        cardTitle = setElement('h5', "card-title", `${recipes[i].name}`);
        cardRecipeTitle = setElement('span', "text-secondary my-2", "R E C E T T E");
        cardRecipeText = setElement('p', "card-text", `${recipes[i].description}`);
        cardBody.append(cardTitle, cardRecipeTitle, cardRecipeText);

        cardIngredients = setElement('div', "card-ingredients | card-body d-flex flex-wrap", null);
        cardIngredientsText = setElement('span', "text-secondary my-2 w-100", "I N G R É D I E N T S");
        cardIngredients.append(cardIngredientsText);

        twoArrays[i] = new Array(recipes[i].ingredients.length);

        for (let j=0; j<recipes[i].ingredients.length; j++){
            twoArrays[i][j] = setElement('div', "card-text col-6 d-flex flex-column", null);
            spanIngredient = setElement('span', "text-dark", recipes[i].ingredients[j].ingredient);         

            if (recipes[i].ingredients[j].quantity !== undefined){     
                spanQuantityUnit = setElement('span', "text-secondary", null);
                if(recipes[i].ingredients[j].unit !== undefined){                
                    spanQuantityUnit.innerText = recipes[i].ingredients[j].quantity + ' ' + recipes[i].ingredients[j].unit; 
                }
                else{
                    spanQuantityUnit.innerText = recipes[i].ingredients[j].quantity;
                }
                twoArrays[i][j].append(spanIngredient, spanQuantityUnit);
            }
            else{
                twoArrays[i][j].append(spanIngredient);
            }
            cardIngredients.append(twoArrays[i][j]);
        }
        card.append(cardTime, cardImg, cardBody, cardIngredients);
        col[i] = setElement('div', "col d-flex justify-content-center", null);
        col[i].appendChild(card);
    }
    return col;
}

function setFilter(){}

function init(){
    // Dom Injection
    let cardDOM = setCardDom(), cardTitle = [], cardDescription = [], cardIngredients;
    for (let i=0; i<recipes.length; i++){
        for (let j=0; j<recipes[i].ingredients.length; j++){
            rowCard.append(cardDOM[i]);
        }
    }
    let cards = document.querySelectorAll('.col');
    // Input search user
    inputSearch.addEventListener('input', (e) =>{
        const value = e.target.value.toLowerCase();
        if(value.length >= 3){
            for (let i=0; i<cardDOM.length; i++){
                if(!(cardTitle[i].includes(value)) && !(cardDescription[i].includes(value))){
                    cards[i].classList.toggle('hidden');
                }
            }
        }
    });
    console.log(recipes[0]);
    let nbrRecettes = document.querySelectorAll('.card').length;
    let recettes = document.querySelector('.number-recipes');
    recettes.innerText = `${nbrRecettes} recettes`
}

init();