import {recipes} from './recipes.js';
import {createDocumentElementAndAttributes} from './cards.js';
import {buildFilterCardDom, compareBothFilterAndTagArrays, checkIfEitherInputOrTagFilterIsEmptyIfFinalArrayIs} from './filters.js';

let tabIngredients = [], tabAppareils = [], tabUstentiles = [], tabSelectedContainer = [], sumIngr = 0, sumUst = 0, isFinalArrayEmptyButNotOneOfTheFiltersArrays = false;
export let arrayOfTagIngredients = [], arrayOfTagUstentiles = [], arrayOfTagAppareils = [], ingredientsForOneRecipeToCheck = [[]], appareilsForOneRecipeToCheck = [], ustentilesForOneRecipeToCheck = [[]], tagHTML, tagHTMLContent, tagDeleteIcon;
//Allow to check includes() between two arrays
const includesAll = (arr, values) => values.every(v => arr.includes(v));
const searchIngredient = document.querySelector('#search-ingredients');
const searchAppareil = document.querySelector('#search-appareils');
const searchUstentile = document.querySelector('#search-ustentiles');
const tagSelectedContainer = document.querySelector('.tags-container');

function lookForASpecificTag(searchBar, dropdownArrayContent, dropdownNodeContent){
    searchBar.addEventListener('input', (e) => {
        let inputValue = e.target.value.toLowerCase();
        // const filteredDropdownArrayContent = dropdownArrayContent.filter(content => content.childNodes[0].innerText.includes(inputValue));
        // console.log(filteredDropdownArrayContent)
        // console.log("dropdownNodeContent", dropdownNodeContent);

        // if (filteredDropdownArrayContent.length !== 0){
        //     dropdownNodeContent = filteredDropdownArrayContent;
        // }
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
    //no duplicates and ordered alpha
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
        dropdownElement.appendChild(HtmlElementDropdown);
    }
}


function setSelectedTagInHTMLContainer(tagName){
    // console.log(document.querySelector('.tags-container').removeChild(document.querySelector('.tags-container').children[0]))
    tagHTML = createDocumentElementAndAttributes('div', "selected-tag | dropdown d-flex gap-5 m-3 flex-wrap justify-content-start", null);
    tagHTMLContent = createDocumentElementAndAttributes('button', "selected-tag-btn | btn btn-primary pe-5 position-relative", tagName);
    // tagHTMLContent.setAttribute('onClick', "");
    tagDeleteIcon = createDocumentElementAndAttributes('i', "selected-tag-delete | bi-x-lg position-absolute", null);
    tagHTMLContent.appendChild(tagDeleteIcon);
    tagHTML.append(tagHTMLContent);     
    tagSelectedContainer.appendChild(tagHTML);
}


function deleteTagFromArray(arrayTag, tagSelected){
    // console.log("arrayOfTags before", arrayTag)
    // const deleteFromTag = arrayTag.filter(tag => {if(tag !== tagSelected) return tag});
    // console.log("tag after", deleteFromTag);
    for (let a=0; a<arrayTag.length; a++){
        if (arrayTag[a] === tagSelected){
            arrayTag.splice(a, 1);
        }
    }
    return arrayTag;
}
export function checkIfRecipesIncludeArraysOfTagElements(tagIngredients, tagAppareils, tagUstentiles){
    const arrayOfFilteredRecipes = recipes.filter(
    recipe => 
        recipe.ingredients.some((el) => includesAll(el.ingredient.toLowerCase(), (tagIngredients))) &&
        recipe.appliance.toLowerCase().includes(tagAppareils) &&
        recipe.ustensils.some((el) => includesAll(el.toLowerCase(), tagUstentiles))
    );
    // console.log(arrayOfFilteredRecipes)
    return arrayOfFilteredRecipes;
}

export function setTagFilter(dropdownTags){
    dropdownTags.classList.toggle("bg-primary");
    //check if the dropdown is already selected or not
    if(dropdownTags.classList.contains("bg-primary")){
        setSelectedTagInHTMLContainer(dropdownTags.innerText);
        tabSelectedContainer.push(tagSelectedContainer.childNodes[1].childNodes[0])
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
        for(let b=0; b<tagSelectedContainer.childNodes.length; b++){
            if(dropdownTags.innerText === tagSelectedContainer.childNodes[b].innerText){
                tagSelectedContainer.childNodes[b].remove();
            }
        }
        deleteTagFromArray(arrayOfTagIngredients, dropdownTags.firstChild.innerText);
        deleteTagFromArray(arrayOfTagAppareils, dropdownTags.firstChild.innerText);
        deleteTagFromArray(arrayOfTagUstentiles, dropdownTags.firstChild.innerText);
    }
    const arrayOfFilteredRecipes = checkIfRecipesIncludeArraysOfTagElements(arrayOfTagIngredients, arrayOfTagAppareils, arrayOfTagUstentiles);
    return arrayOfFilteredRecipes;
}

export let tagFilter = [];
//allow to trigger add event listener from an ingredient selected or appareil or ustentile
function addEventListenerToASpecificDropDown (dropdown){
    for (let i=0; i<dropdown.length; i++){
        dropdown[i].addEventListener('click', () => {
            tagFilter = setTagFilter(dropdown[i]);
            let filterCompared = compareBothFilterAndTagArrays();
            isFinalArrayEmptyButNotOneOfTheFiltersArrays = checkIfEitherInputOrTagFilterIsEmptyIfFinalArrayIs(filterCompared);
            buildFilterCardDom(filterCompared, isFinalArrayEmptyButNotOneOfTheFiltersArrays);
        });
    }
}

const ingredients = document.querySelector('.dropdown-ingredients');
console.log(ingredients.children)
const appareils = document.querySelector('.dropdown-appareils');
const ustentiles = document.querySelector('.dropdown-ustentiles');

searchIngredient.value = '';
searchAppareil.value = '';
searchUstentile.value = '';
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
lookForASpecificTag(searchUstentile, dropdownUstentilesIntoAnArray, dropdownUstentiles);
