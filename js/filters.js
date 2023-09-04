import {createDocumentElementAndAttributes, buildCardDom, rowCard, setRecipeFilterToAnArray, appendDomToHtml, nbrRecettes, recettes} from './cards.js';
import {arrayOfTagIngredients, arrayOfTagAppareils, arrayOfTagUstentiles, checkIfRecipesIncludeArraysOfTagElements} from './dropdowns.js';

let cardContainer = document.querySelector('.card-container');
const inputSearch = document.querySelector('.search-recipe');

function setInputFilter(input){
    const valueInput = input.target.value.toLowerCase();
    if(valueInput.length >= 3){
        checkIfRecipesIncludeArraysOfTagElements(arrayOfTagIngredients);
        checkIfRecipesIncludeArraysOfTagElements(arrayOfTagAppareils);
        checkIfRecipesIncludeArraysOfTagElements(arrayOfTagUstentiles);
        inputFilter = setRecipeFilterToAnArray(valueInput);
        inputFilterDom = buildCardDom(inputFilter);
        rowCardFiltered = createDocumentElementAndAttributes('div', "card-row | row d-flex g-5", null);
        cardFilteredDOM = appendDomToHtml(inputFilterDom, inputFilter, rowCardFiltered);
        cardContainer.innerHTML = '';
        cardContainer.appendChild(rowCardFiltered);
        recettes.innerText = `${inputFilter.length} recettes`;
    }
    else{
        cardContainer.innerHTML = '';
        cardContainer.appendChild(rowCard);
        recettes.innerText = `${nbrRecettes} recettes`;  
    }
}
// Input search user
let inputFilter = [], inputFilterDom, rowCardFiltered, cardFilteredDOM;
inputSearch.addEventListener('input', (e) =>{setInputFilter(e)}); 
