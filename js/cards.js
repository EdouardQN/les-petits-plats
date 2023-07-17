import {recipes} from './recipes.js';

function createCard() {
    let recipeSrc, recipeHeading, recipeDescription, recipeIngredients, recipeTime, col = [], htmlDom;

    for (let i=0; i<recipes.length; i++){
        recipeSrc = `/assets/photos plats/${recipes[i].image}`
        recipeIngredients = recipes[i].ingredients;
        recipeTime = recipes[i].time;
        recipeHeading = recipes[i].name;
        //p card text en dessous de R E C E T T E
        recipeDescription = recipes[i].description;
        // génère une card text en desous de I N G R E D I E N T S pour chaque ingrédients 

        //dom
        htmlDom = 
        ` 
            <div class="card position-relative rounded-4" style="width: 380px;">
                <span class="card-time | bg-primary px-3 py-1 position-absolute end-5 top-3 rounded-pill" style="font-size: 12px;">${recipeTime} min</span>
                <img src="${recipeSrc}" class="card-img-top rounded-top-4" alt="Photo recette">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${recipeHeading}</h5>
                    <span class="text-secondary my-2">R E C E T T E</span>
                    <p class="card-text">${recipeDescription}</p>
                </div>
                <div class="card-body d-flex flex-wrap ">
                    <span class="text-secondary my-2 w-100">I N G R É D I E N T S</span>
                    <div class="card-text col-6 d-flex flex-column">
                    <span class="text-dark">Lait de coco</span>
                    <span class="text-secondary">400ml</span>
                    </div>
                    <div class="card-text col-6 d-flex flex-column">
                    <span class="text-dark">Jus de citron</span>
                    <span class="text-secondary">2</span>
                    </div>
                    <div class="card-text col-6 d-flex flex-column">
                    <span class="text-dark">Crème de coco</span>
                    <span class="text-secondary">4 cuillères</span>
                    </div>
                    <div class="card-text col-6 d-flex flex-column">
                    <span class="text-dark">Sucre</span>
                    <span class="text-secondary">20g</span>
                    </div>
                    <div class="card-text col-6 d-flex flex-column">
                    <span class="text-dark">Glaçons</span>
                    <span class="text-secondary">2</span>
                    </div>
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
    let cardDOM = createCard();

    for (let i=0; i<recipes.length; i++){
        rowCard.append(cardDOM[i]);
    }
    console.log(recipes[0]);
    const nbrRecettes = document.querySelectorAll('.card').length;
    const recettes = document.querySelector('.number-recipes');
    recettes.innerText = `${nbrRecettes} recettes`
}

init();