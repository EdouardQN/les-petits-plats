import {recipes} from './recipes.js';
import {createDocumentElementAndAttributes, buildCardDom, rowCard, appendDomToHtml, nbrRecettes, recettes} from './cards.js';
import {tagFilter, arrayOfTagIngredients, arrayOfTagAppareils, arrayOfTagUstentiles} from './dropdowns.js';

let inputFilter = [], filteredDom, rowCardFiltered, cardFilteredDOM, isFinalArrayEmptyButNotOneOfTheFiltersArrays = false;
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

export function checkIfEitherInputOrTagFilterIsEmptyIfFinalArrayIs(finalArray){
    //Checking for tags
    if ((tagFilter.length === 0 && arrayOfTagIngredients.length !== 0) || 
        (tagFilter.length === 0 && arrayOfTagAppareils.length !==0) ||
        (tagFilter.length === 0 && arrayOfTagUstentiles.length !== 0)){
        return true;
    }
    //Checking for input
    if (finalArray.length === 0 && inputSearch.value.length >= 3){
        return true;
    }
    return false;
}


export function buildFilterCardDom(finalFilteredArray, booleanForFilter){
    cardContainer.innerHTML = '';
    filteredDom = buildCardDom(finalFilteredArray);
    rowCardFiltered = createDocumentElementAndAttributes('div', "card-row | row d-flex g-5", null);
    cardFilteredDOM = appendDomToHtml(filteredDom, finalFilteredArray, rowCardFiltered);
    cardContainer.appendChild(rowCardFiltered);
    recettes.innerText = `${finalFilteredArray.length} recettes`;
    if (finalFilteredArray.length === 0 && !booleanForFilter){
        cardContainer.innerHTML = '';
        cardContainer.appendChild(rowCard);
        recettes.innerText = `${nbrRecettes} recettes`; 
    }
    else if(finalFilteredArray.length === 0 && booleanForFilter){
        cardContainer.innerHTML = '';
        cardContainer.appendChild(rowCardFiltered);
    }

}

inputSearch.addEventListener('input', (e) =>{
    inputFilter = setInputFilter();
    let filterCompared = compareBothFilterAndTagArrays();
    isFinalArrayEmptyButNotOneOfTheFiltersArrays = checkIfEitherInputOrTagFilterIsEmptyIfFinalArrayIs(filterCompared);
    buildFilterCardDom(filterCompared, isFinalArrayEmptyButNotOneOfTheFiltersArrays);
    // console.log("résultat input filter", inputFilter);
}); 
