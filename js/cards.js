import {recipes} from './recipes.js';

function setIngredientsDom(){
    let divAllIngredients = [], spanIngredient, spanQuantityUnit, twoArrays = new Array(recipes.length);
    for (let i=0; i<recipes.length; i++){

        twoArrays[i] = new Array(recipes[i].ingredients.length);
        divAllIngredients[i] = document.createElement('div');

        for (let j=0; j<recipes[i].ingredients.length; j++){

            twoArrays[i][j] = document.createElement('div');
            twoArrays[i][j].setAttribute('class', "card-text col-6 d-flex flex-column");
            spanIngredient = document.createElement('span');
            spanIngredient.setAttribute('class', "text-dark");
            
            spanIngredient.innerText = recipes[i].ingredients[j].ingredient;

            if (recipes[i].ingredients[j].quantity !== undefined){
                spanQuantityUnit = document.createElement('span');
                spanQuantityUnit.setAttribute('class', "text-secondary");
                if(recipes[i].ingredients[j].unit !== undefined){                
                    spanQuantityUnit.innerText = recipes[i].ingredients[j].quantity + ' ' + recipes[i].ingredients[j].unit; 
                }
                else{
                    spanQuantityUnit.innerText = recipes[i].ingredients[j].quantity;
                }
                twoArrays[i][j].appendChild(spanIngredient);
                twoArrays[i][j].appendChild(spanQuantityUnit);
            }
            else{
                twoArrays[i][j].appendChild(spanIngredient);
            }
        }
    }
    return twoArrays;
}

function setCardDom() {
    let col = [], card, cardTime, cardImg, cardBody, cardTitle, cardRecipeTitle, cardRecipeText, cardIngredients, cardIngredientsText;

    for (let i=0; i<recipes.length; i++){  
        card = document.createElement('div');
        card.setAttribute('class', "card position-relative rounded-4 shadow");
        card.setAttribute('style', "width: 380px;");

        cardTime = document.createElement('span');
        cardTime.setAttribute('class', "card-time | bg-primary px-3 py-1 position-absolute end-5 top-3 rounded-pill");
        cardTime.setAttribute('style', "font-size: 12px;");
        cardTime.innerText = `${recipes[i].time} min`;

        cardImg = document.createElement('img');
        cardImg.setAttribute('class', "card-img-top rounded-top-4");
        cardImg.setAttribute('src', `/assets/photos plats/${recipes[i].image}`);
        cardImg.setAttribute('alt', "Photo recette");

        card.appendChild(cardTime);
        card.appendChild(cardImg);

        // Card Body | Recipe description
        cardBody = document.createElement('div');
        cardBody.setAttribute('class', "card-body d-flex flex-column");

        cardTitle = document.createElement('h5');
        cardTitle.setAttribute('class', "card-title");
        cardTitle.innerText = `${recipes[i].name}`;

        cardRecipeTitle = document.createElement('span');
        cardRecipeTitle.setAttribute('class', "text-secondary my-2");
        cardRecipeTitle.innerText = "R E C E T T E";

        cardRecipeText = document.createElement('p');
        cardRecipeText.setAttribute('class', "card-text");
        cardRecipeText.innerText = `${recipes[i].description}`;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardRecipeTitle);
        cardBody.appendChild(cardRecipeText); 

        // Card Ingredients
        cardIngredients = document.createElement('div');
        cardIngredients.setAttribute('class', "card-ingredients | card-body d-flex flex-wrap");

        cardIngredientsText = document.createElement('span');
        cardIngredientsText.setAttribute('class', "text-secondary my-2 w-100");
        cardIngredientsText.innerText = "I N G R É D I E N T S";

        cardIngredients.appendChild(cardIngredientsText);

        card.appendChild(cardBody);
        card.appendChild(cardIngredients);

        col[i] = document.createElement('div');
        col[i].setAttribute('class', "col d-flex justify-content-center")
        col[i].appendChild(card);
    }
    return col;
}

const rowCard = document.querySelector('.card-row');

function init(){
    let cardDomIngredients = setIngredientsDom();
    let cardDOM = setCardDom();
    for (let i=0; i<recipes.length; i++){
        rowCard.append(cardDOM[i]);
    }
    const cardIngredients = document.querySelectorAll('.card-ingredients');

    for (let i=0; i<recipes.length; i++){
        for (let j=0; j<recipes[i].ingredients.length; j++){
            cardIngredients[i].append(cardDomIngredients[i][j]);
        }
    }
    console.log(recipes[0]);
    const nbrRecettes = document.querySelectorAll('.card').length;
    const recettes = document.querySelector('.number-recipes');
    recettes.innerText = `${nbrRecettes} recettes`
}

init();