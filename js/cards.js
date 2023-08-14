import {recipes} from './recipes.js';
import {dropdownIngredients} from './dropdowns.js';
import {dropdownAppareils} from './dropdowns.js';
import {dropdownUstentiles} from './dropdowns.js';

let cardContainer = document.querySelector('.card-container');
let rowCard = document.querySelector('.card-row');
const inputSearch = document.querySelector('.search-recipe');
// Create element document and set attributes to it
function createDocumentElementAndAttributes(elementType, classContent, innerTextContent, srcMedia, altMedia){
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

function buildCardDom(arrayElement) {
    let col = [], card, cardTime, cardImg, cardBody, cardTitle, cardRecipeTitle, cardRecipeText, cardIngredients, cardIngredientsText, spanIngredient, spanQuantityUnit, twoArrays = new Array(arrayElement.length);

    for (let i=0; i<arrayElement.length; i++){  
        card = createDocumentElementAndAttributes('div', "card position-relative rounded-4 shadow", null);
        cardTime = createDocumentElementAndAttributes('span', "card-time | bg-primary px-3 py-1 position-absolute end-5 top-3 rounded-pill", `${arrayElement[i].time} min`);
        cardImg = createDocumentElementAndAttributes('img', "card-img-top rounded-top-4", null, `/assets/photos plats/${arrayElement[i].image}`, `Photo ${arrayElement[i].name}`);
        cardBody = createDocumentElementAndAttributes('div', "card-body d-flex flex-column", null);
        cardTitle = createDocumentElementAndAttributes('h5', "card-title", `${arrayElement[i].name}`);
        cardRecipeTitle = createDocumentElementAndAttributes('span', "text-secondary my-2", "R E C E T T E");
        cardRecipeText = createDocumentElementAndAttributes('p', "card-text", `${arrayElement[i].description}`);
        cardBody.append(cardTitle, cardRecipeTitle, cardRecipeText);
        cardIngredients = createDocumentElementAndAttributes('div', "card-ingredients | card-body d-flex flex-wrap", null);
        cardIngredientsText = createDocumentElementAndAttributes('span', "text-secondary my-2 w-100", "I N G R É D I E N T S");
        cardIngredients.append(cardIngredientsText);
        twoArrays[i] = new Array(arrayElement[i].ingredients.length);
        for (let j=0; j<arrayElement[i].ingredients.length; j++){
            twoArrays[i][j] = createDocumentElementAndAttributes('div', "card-text col-6 d-flex flex-column", null);
            spanIngredient = createDocumentElementAndAttributes('span', "text-dark", arrayElement[i].ingredients[j].ingredient);         
            if (arrayElement[i].ingredients[j].quantity !== undefined){     
                spanQuantityUnit = createDocumentElementAndAttributes('span', "text-secondary", null);
                if(arrayElement[i].ingredients[j].unit !== undefined){                
                    spanQuantityUnit.innerText = arrayElement[i].ingredients[j].quantity + ' ' + arrayElement[i].ingredients[j].unit; 
                }
                else{
                    spanQuantityUnit.innerText = arrayElement[i].ingredients[j].quantity;
                }
                twoArrays[i][j].append(spanIngredient, spanQuantityUnit);
            }
            else{
                twoArrays[i][j].append(spanIngredient);
            }
            cardIngredients.append(twoArrays[i][j]);
        }
        card.append(cardTime, cardImg, cardBody, cardIngredients);
        col[i] = createDocumentElementAndAttributes('div', "col d-flex justify-content-center", null);
        col[i].appendChild(card);
    }
    return col;
}

// function selectElementsForTagBtn(dropdownTag){
//     let btnContent = [];
//     for (let i=1; i< dropdownTag.children.length; i++){
//         btnContent[i] = (dropdownTag.children[i].innerText).toLowerCase();
//     }
//     btnContent.shift();
//     return btnContent;
// }
// let btnIngredientsContentFitler = selectElementsForTagBtn(dropdownIngredients);
// let btnAppareilsContentFilter = selectElementsForTagBtn(dropdownAppareils);
// let btnUstentilesContentFilter = selectElementsForTagBtn(dropdownUstentiles);

function setRecipeFilterToAnArray(valueToBeFiltered){
    let filteredElements = [], isAlreadyInTheArrayToFilter = false;
    for(let i=0; i<recipes.length; i++){
        if (((recipes[i].name).toLowerCase()).includes(valueToBeFiltered) || ((recipes[i].description).toLowerCase()).includes(valueToBeFiltered)){
            filteredElements.push(recipes[i]);
            isAlreadyInTheArrayToFilter = true;
        }
        for(let j=0; j<recipes[i].ingredients.length; j++){
            if (((recipes[i].ingredients[j].ingredient).toLowerCase()).includes(valueToBeFiltered)){
                if(!isAlreadyInTheArrayToFilter){ 
                    filteredElements.push(recipes[i]); 
                    isAlreadyInTheArrayToFilter = true;
                }
            }
        }
    }
    console.log("filter element array", filteredElements)
    return filteredElements;
}

function appendDomToHtml(dom, index, divCardToPutInContainer){
    for (let i=0; i<index.length; i++){
        for (let j=0; j<index[i].ingredients.length; j++){     
            divCardToPutInContainer.appendChild(dom[i]);          
        }
    }
    return divCardToPutInContainer;
}
// Input search user
let inputFilter = [], inputFilterDom, rowCardFiltered, cardFilteredDOM;
inputSearch.addEventListener('input', (e) =>{
    const valueInput = e.target.value.toLowerCase();
    if(valueInput.length >= 3){
        //container sans card
        inputFilter = setRecipeFilterToAnArray(valueInput);
        inputFilterDom = buildCardDom(inputFilter);
        rowCardFiltered = createDocumentElementAndAttributes('div', "card-row | row d-flex g-5", null);
        cardFilteredDOM = appendDomToHtml(inputFilterDom, inputFilter, rowCardFiltered);
        if(cardContainer.childNodes[1].childNodes.length === recipes.length){
            cardContainer.replaceChild(rowCardFiltered, rowCard);
        }
        recettes.innerText = `${inputFilter.length} recettes`;
    }
    else if(valueInput.length <= 2){
        if(rowCardFiltered != undefined && cardContainer.childNodes[1].childNodes.length !== recipes.length){
            cardContainer.replaceChild(rowCard, rowCardFiltered);
            recettes.innerText = `${nbrRecettes} recettes`;
        }
    }
    console.log("contenu du node", cardContainer.childNodes[1])
}); 
// Tag selected
let tagFilter = [], tagFilterDOM;
// const dropdownTags = document.querySelectorAll('.dropdown-tag');
// console.log(dropdownTags)
// .addEventListener('click', () => {
//     for (let i =0; i<recipes.length; i++){
//         for (let j=0; i<recipes[i].ingredients.length; i++){
            
//         }
//     }
// });


function init(){
    let recipesDOM = buildCardDom(recipes);
    let cardDOM = appendDomToHtml(recipesDOM, recipes, rowCard);
    console.log(recipes[0]);
    return cardDOM;
}
let firstLoad = init();

let nbrRecettes = document.querySelectorAll('.card').length;
let recettes = document.querySelector('.number-recipes');
recettes.innerText = `${nbrRecettes} recettes`