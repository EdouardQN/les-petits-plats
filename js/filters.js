import {createDocumentElementAndAttributes} from './cards.js';
import {buildCardDom} from './cards.js';
import {rowCard} from './cards.js';
import {setRecipeFilterToAnArray} from './cards.js';
import {appendDomToHtml} from './cards.js';
import {nbrRecettes} from './cards.js';
import {recettes} from './cards.js';

let cardContainer = document.querySelector('.card-container');
const inputSearch = document.querySelector('.search-recipe');
// Input search user
let inputFilter = [], inputFilterDom, rowCardFiltered, cardFilteredDOM;
inputSearch.addEventListener('input', (e) =>{
    const valueInput = e.target.value.toLowerCase();
    if(valueInput.length >= 3){
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
}); 
