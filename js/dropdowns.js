import {recipes} from './recipes.js';
import {buildFilterCardDom, compareBothFilterAndTagArrays} from './filters.js';

let tabIngredients = [], tabAppareils = [], tabUstentiles = [], sumIngr = 0, sumUst = 0;
export let arrayOfTagIngredients = [], arrayOfTagUstentiles = [], arrayOfTagAppareils = [], arrayOfFilteredRecipes = [], ingredientsForOneRecipeToCheck = [[]], appareilsForOneRecipeToCheck = [], ustentilesForOneRecipeToCheck = [[]];
//Allow to check includes() between two arrays
const includesAll = (arr, values) => values.every(v => arr.includes(v));
const searchIngredient = document.querySelector('#search-ingredients');
const searchAppareil = document.querySelector('#search-appareils');
const searchUstentile = document.querySelector('#search-ustentiles');

function lookForASpecificTag(searchBar, dropdownArrayContent, dropdownNodeContent){
    searchBar.addEventListener('input', (e) => {
        let inputValue = e.target.value.toLowerCase();
        for (let i=0; i<dropdownArrayContent.length; i++){
            if(inputValue.length > 0){
                if ((dropdownArrayContent[i].innerText).includes(inputValue)){
                    dropdownNodeContent[i].style.display = "flex";
                }
                else{
                    dropdownNodeContent[i].style.display = "none";
                }
            }
            else{
                dropdownNodeContent[i].style.display = "flex";
            }
        }
    })
}

function setDropdownElements(dropdownElement, arrayOfElements){
    let HtmlElementDropdown, HtmlElementDropdownChild;
    //no duplicates
    const elements = arrayOfElements.filter((el, index) => arrayOfElements.indexOf(el) === index);
    const orderedElements = elements.sort((a, b) => a.localeCompare(b, 'fr', {ignorePunctuation: true}));
    for (let i=0; i<orderedElements.length; i++){
        if(orderedElements.includes(orderedElements[i] + "s")){
            i++;
            orderedElements.splice(i, 1);
            i--;
        }
    }
    for (let i=0; i<elements.length; i++){
        HtmlElementDropdown = document.createElement('li');
        if (dropdownElement.classList.contains("dropdown-ingredients")){
            HtmlElementDropdown.setAttribute('class', "dropdown-tag ingredient");
        }
        else if(dropdownElement.classList.contains("dropdown-appareils")){
            HtmlElementDropdown.setAttribute('class', "dropdown-tag appareil");
        }
        else if(dropdownElement.classList.contains("dropdown-ustentiles")){
            HtmlElementDropdown.setAttribute('class', "dropdown-tag ustentile");
        }
        HtmlElementDropdownChild = document.createElement('a');
        HtmlElementDropdownChild.classList.add("dropdown-item-tag", "|", "dropdown-item");
        HtmlElementDropdownChild.innerText = orderedElements[i];
        HtmlElementDropdown.appendChild(HtmlElementDropdownChild);
        dropdownElement.appendChild(HtmlElementDropdown) ;
    }
}

function deleteTagFromArray(arrayTag, tagSelected){
    for (let a=0; a<arrayTag.length; a++){
        if (arrayTag[a] === tagSelected){
            arrayTag.splice(a, 1);
        }
    }
    return arrayTag;
}

export function checkIfRecipesIncludeArraysOfTagElements(arrayOfTagElements){
    for (let j=0; j<arrayOfTagElements.length; j++){
        for (let k=0; k<recipes.length; k++){
            if (includesAll(ingredientsForOneRecipeToCheck[k], arrayOfTagIngredients) && 
                includesAll(appareilsForOneRecipeToCheck[k], arrayOfTagAppareils) &&
                includesAll(ustentilesForOneRecipeToCheck[k], arrayOfTagUstentiles) &&
                !(arrayOfFilteredRecipes.includes(recipes[k]))){
                arrayOfFilteredRecipes.push(recipes[k]);
            }
        }
    }
    if(arrayOfTagIngredients.length === 0 && arrayOfTagAppareils.length === 0 && arrayOfTagUstentiles.length === 0){
        arrayOfFilteredRecipes = [];
    }
}

export function setTagFilter(dropdownTags){
    dropdownTags.classList.toggle("bg-primary");
    //check if the dropdown is already selected or not
    if(dropdownTags.classList.contains("bg-primary")){
        if(dropdownTags.classList.contains("ingredient")){
            arrayOfTagIngredients.push(dropdownTags.firstChild.innerText);
        }
        else if(dropdownTags.classList.contains("appareil")){
            arrayOfTagAppareils.push(dropdownTags.firstChild.innerText);
        }
        else{
            arrayOfTagUstentiles.push(dropdownTags.firstChild.innerText);
        }
    }
    else{
        deleteTagFromArray(arrayOfTagIngredients, dropdownTags.firstChild.innerText);
        deleteTagFromArray(arrayOfTagAppareils, dropdownTags.firstChild.innerText);
        deleteTagFromArray(arrayOfTagUstentiles, dropdownTags.firstChild.innerText);
    }
    setArraysOfTags();
    checkIfRecipesIncludeArraysOfTagElements(arrayOfTagIngredients);
    checkIfRecipesIncludeArraysOfTagElements(arrayOfTagAppareils);
    checkIfRecipesIncludeArraysOfTagElements(arrayOfTagUstentiles);

    return arrayOfFilteredRecipes;
}

function setArraysOfTags(){
    ingredientsForOneRecipeToCheck = new Array(recipes.length);
    appareilsForOneRecipeToCheck = new Array(recipes.length);
    ustentilesForOneRecipeToCheck = new Array(recipes.length);

    for (let k=0; k<recipes.length; k++){
        ingredientsForOneRecipeToCheck[k] = new Array(recipes[k].ingredients.length);
        //Array of all ingredients per recipe for all of them
        for (let l=0; l<recipes[k].ingredients.length; l++){
            ingredientsForOneRecipeToCheck[k][l] = (recipes[k].ingredients[l].ingredient).toLowerCase(); 
        }
        appareilsForOneRecipeToCheck[k] = (recipes[k].appliance).toLowerCase(); 
        ustentilesForOneRecipeToCheck[k] = new Array(recipes[k].ustensils.length);
        for (let l=0; l<recipes[k].ustensils.length; l++){
            ustentilesForOneRecipeToCheck[k][l] = (recipes[k].ustensils[l]).toLowerCase();
        }
    }
}

export let tagFilter = [];
//allow to trigger add event listener from an ingredient selected or appareil or ustentile
function addEventListenerToASpecificDropDown (dropdown){
    for (let i=0; i<dropdown.length; i++){
        dropdown[i].addEventListener('click', () => {
            tagFilter = setTagFilter(dropdown[i]);
            let filterCompared = compareBothFilterAndTagArrays();
            buildFilterCardDom(filterCompared);
        });
    }
}

const ingredients = document.querySelector('.dropdown-ingredients');
const appareils = document.querySelector('.dropdown-appareils');
const ustentiles = document.querySelector('.dropdown-ustentiles');
//Add numbers according to ingredients and ustentils length 
for (let i=0; i<recipes.length; i++){
    sumIngr += recipes[i].ingredients.length;
    sumUst += recipes[i].ustensils.length;
} 
//Sets tagArrays for dropdowns
for (let i=0; i<recipes.length; i++){
    for (let j=0; j<recipes[i].ingredients.length; j++){
        for (let k=0; k<sumIngr; k++){
            tabIngredients.push(recipes[i].ingredients[j].ingredient.toLowerCase());
        }
    }
    tabAppareils[i] = recipes[i].appliance.toLowerCase();
    for (let j=0; j<recipes[i].ustensils.length; j++){
        for(let k=0; k<sumUst; k++){
            tabUstentiles.push(recipes[i].ustensils[j].toLowerCase());

        }
    }
}

setDropdownElements(ingredients, tabIngredients);
setDropdownElements(appareils, tabAppareils);
setDropdownElements(ustentiles, tabUstentiles);

//Once dropdown DOM generated, get them to use the event listener
const dropdownIngredients = document.querySelectorAll('.ingredient');
const dropdownAppareils = document.querySelectorAll('.appareil');
const dropdownUstentiles = document.querySelectorAll('.ustentile');

addEventListenerToASpecificDropDown(dropdownIngredients);
addEventListenerToASpecificDropDown(dropdownAppareils);
addEventListenerToASpecificDropDown(dropdownUstentiles);

const dropdownIngredientsIntoAnArray = [...dropdownIngredients];
const dropdownAppareilsIntoAnArray = [...dropdownAppareils];
const dropdownUstentilesIntoAnArray = [...dropdownUstentiles];


lookForASpecificTag(searchIngredient, dropdownIngredientsIntoAnArray, dropdownIngredients);
lookForASpecificTag(searchAppareil, dropdownAppareilsIntoAnArray, dropdownAppareils);
lookForASpecificTag(searchIngredient, dropdownIngredientsIntoAnArray, dropdownIngredients);
