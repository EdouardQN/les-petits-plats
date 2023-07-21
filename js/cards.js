import {recipes} from './recipes.js';


function setIngredientsDom(){
    let divAllIngredients = [], divIngredient = [], divQuantityUnit = [];

    for (let i=0; i<recipes.length; i++){
        // génère un text en desous de I N G R E D I E N T S pour chaque ingrédients 
        divAllIngredients[i] = document.createElement('div');
        divAllIngredients[i].setAttribute('class', "card-text col-6 d-flex flex-column");

        for (let j=0; j<recipes[i].ingredients.length; j++){

            divIngredient = document.createElement('span');
            divIngredient.setAttribute('class', "text-dark");
            
            divIngredient.innerText = recipes[i].ingredients[j].ingredient;

            if (recipes[i].ingredients[j].quantity !== undefined){
                divQuantityUnit = document.createElement('span');
                divQuantityUnit.setAttribute('class', "text-secondary");
                if(recipes[i].ingredients[j].unit !== undefined){                
                    divQuantityUnit.innerText = recipes[i].ingredients[j].quantity + ' ' + recipes[i].ingredients[j].unit; 
                }
                else{
                    divQuantityUnit.innerText = recipes[i].ingredients[j].quantity;
                }
                divAllIngredients[i].appendChild(divIngredient);
                divAllIngredients[i].appendChild(divQuantityUnit);
            }
            else{
                divAllIngredients[i].appendChild(divIngredient);
            }
        }
    }
    return divAllIngredients;
}

function createCard() {
    let col = [], htmlDom;

    for (let i=0; i<recipes.length; i++){  
        //dom
        htmlDom = 
        ` 
            <div class="card position-relative rounded-4 shadow" style="width: 380px;">
                <span class="card-time | bg-primary px-3 py-1 position-absolute end-5 top-3 rounded-pill" style="font-size: 12px;">${recipes[i].time} min</span>
                <img src="/assets/photos plats/${recipes[i].image}" class="card-img-top rounded-top-4" alt="Photo recette">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${recipes[i].name}</h5>
                    <span class="text-secondary my-2">R E C E T T E</span>
                    <p class="card-text">${recipes[i].description}</p>
                </div>
                <div class="card-ingredients | card-body d-flex flex-wrap ">
                    <span class="text-secondary my-2 w-100">I N G R É D I E N T S</span>
                </div>
            </div>           
        `
        col[i] = document.createElement('div');
        col[i].setAttribute('class', "col d-flex justify-content-center")
        col[i].innerHTML = htmlDom;
        
    }
    return col;
}

const rowCard = document.querySelector('.card-row');
function init(){
    let cardDomIngredients = setIngredientsDom();
    let cardDOM = createCard();
    for (let i=0; i<recipes.length; i++){
        // console.log(cardDomIngredients[i].innerHTML);
        rowCard.append(cardDOM[i]);
        // ingredient.appendChild(cardDomIngredients[i])
    }
    const cardIngredients = document.querySelectorAll('.card-ingredients');

    for (let i=0; i<recipes.length; i++){
        cardIngredients[i].append(cardDomIngredients[i]);
    }

    console.log(recipes[0]);
    const nbrRecettes = document.querySelectorAll('.card').length;
    const recettes = document.querySelector('.number-recipes');
    recettes.innerText = `${nbrRecettes} recettes`

}


init();