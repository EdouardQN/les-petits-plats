import {recipes} from './recipes.js';
import {createDocumentElementAndAttributes, buildCardDom, rowCard, appendDomToHtml, nbrRecettes, recettes} from './cards.js';
import {tagFilter} from './dropdowns.js';

let inputFilter = [], filteredDom, rowCardFiltered, cardFilteredDOM;
let cardContainer = document.querySelector('.card-container');
export const inputSearch = document.querySelector('.search-recipe');

function setRecipeInputFilterToAnArray(valueToBeFiltered){
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
    // console.log("filter element array", filteredElements)
    return filteredElements;
}

export function setInputFilter(){
    const valueInput = inputSearch.value.toLowerCase();
    if(valueInput.length >= 3){
        inputFilter = setRecipeInputFilterToAnArray(valueInput);
    }
    else{
        inputFilter = [];
    }
    return inputFilter;
}

export function compareBothFilterAndTagArrays(){
    let finalFilteredArray = [];
    if(inputFilter.length === 0){
        finalFilteredArray = tagFilter;
    }
    else if (tagFilter.length === 0){
        finalFilteredArray = inputFilter;
    }
    else{
        if (inputFilter.length > tagFilter.length){
            for(let i=0; i<inputFilter.length; i++){
                if(inputFilter.includes(tagFilter[i])){
                    finalFilteredArray.push(inputFilter[i]);
                }
            }
        }
        else if (tagFilter.length > inputFilter.length){
            for(let i=0; i<tagFilter.length; i++){
                if(tagFilter.includes(inputFilter[i])){
                    finalFilteredArray.push(tagFilter[i]);
                }
            }
        }
    }
    return finalFilteredArray;
}

export function buildFilterCardDom(finalFilteredArray){
    cardContainer.innerHTML = '';
    filteredDom = buildCardDom(finalFilteredArray);
    rowCardFiltered = createDocumentElementAndAttributes('div', "card-row | row d-flex g-5", null);
    cardFilteredDOM = appendDomToHtml(filteredDom, finalFilteredArray, rowCardFiltered);
    cardContainer.appendChild(rowCardFiltered);
    recettes.innerText = `${finalFilteredArray.length} recettes`;
    if (finalFilteredArray.length === 0){
        cardContainer.innerHTML = '';
        cardContainer.appendChild(rowCard);
        recettes.innerText = `${nbrRecettes} recettes`; 
    }

}

inputSearch.addEventListener('input', (e) =>{
    inputFilter = setInputFilter();
    let filterCompared = compareBothFilterAndTagArrays();
    buildFilterCardDom(filterCompared);
    // console.log("résultat input filter", inputFilter);
}); 
