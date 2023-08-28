import {recipes} from './recipes.js';

export const dropdownIngredients = document.querySelector('.dropdown-ingredients');
export const dropdownAppareils = document.querySelector('.dropdown-appareils');
export const dropdownUstentiles = document.querySelector('.dropdown-ustentiles');

//Sets arrays for dropdowns
let tabIngredients = [], tabAppareils = [], tabUstentiles = [];
for (let i=0; i<recipes.length; i++){
    for (let j=0; j<recipes[i].ingredients.length; j++){
        tabIngredients[i] = recipes[i].ingredients[j].ingredient.toLowerCase();
    }
    tabAppareils[i] = recipes[i].appliance.toLowerCase();
    for (let j=0; j<recipes[i].ustensils.length; j++){
        tabUstentiles[i] = recipes[i].ustensils[j].toLowerCase();
    }
}

function setDropdownElements(dropdownElement, arrayOfElements){
    let HtmlElementDropdown;
    const uniqueElement = arrayOfElements.filter((el, index) => arrayOfElements.indexOf(el) === index);
    for (let i=0; i<uniqueElement.length; i++){
        HtmlElementDropdown = `<li class="dropdown-tag"><a class="dropdown-item-tag | dropdown-item">${uniqueElement[i]}</a></li>`;
        dropdownElement.innerHTML += HtmlElementDropdown;
    }
}

//a corriger
// function searchDropDownElement(dropdownElement, arrayOfElements, input){
//     let filteredHtmlElementDropdown;
//     const resultOfInputSearch = arrayOfElements.filter((el) => arrayOfElements.indexOf(el).includes(input));
//     for (let i=1; i<uniqueElement.length; i++){
//         if(resultOfInputSearch[i] != undefined){
//             filteredHtmlElementDropdown = `<li class="dropdown-tag"><a class="dropdown-item-tag | dropdown-item">${resultOfInputSearch[i]}</a></li>`;
//         }
//         dropdownElement.innerHTML += filteredHtmlElementDropdown;
//     }

// }

setDropdownElements(dropdownIngredients, tabIngredients);
setDropdownElements(dropdownAppareils, tabAppareils);
setDropdownElements(dropdownUstentiles, tabUstentiles);

const dropdownInputSearch = document.querySelectorAll('.dropdown-search');
const dropdownTags = document.querySelectorAll('.dropdown-tag');

function setFilterArrayAccordingToIngredientTag(){
    let arrayIncludingFilteredIngredients = [];
    for (let j=0; j<recipes.length; j++){
        for (let l=0; l<recipes[j].ingredients.length; l++){
            if(((recipes[j].ingredients[l].ingredient).toLowerCase()).includes(arrayIncludingTagSelectedElements)){
                arrayIncludingFilteredIngredients.push(recipes[j]);             
            }
        }
    }
    return arrayIncludingFilteredIngredients;
}

function setFilterArrayAccordingToAppareilsTag(){
    let arrayIncludingFilteredAppareils = [];
    for(let j=0; j<recipes.length; j++){
        if(((recipes[j].appliance).toLowerCase()).includes(arrayIncludingTagSelectedElements)){
            arrayIncludingFilteredAppareils.push(recipes[j]);
        }
    }
    return arrayIncludingFilteredAppareils;
}

function setFilterArrayAccordingToUstentilesTag(){
    let arrayIncludingFilteredUstentiles = [];
    for (let j=0; j<recipes.length; j++){
        for (let l=0; l<recipes[j].ustensils.length; l++){
            if(((recipes[j].ustensils[l]).toLowerCase()).includes(arrayIncludingTagSelectedElements)){
                arrayIncludingFilteredUstentiles.push(recipes[j]);             
            }
        }
    }
    return arrayIncludingFilteredUstentiles;
}

let arrayIncludingTagSelectedElements = [], arrayIncludingFilteredElements = [];
for (let i=0; i<dropdownTags.length; i++){
    dropdownTags[i].addEventListener('click', () => {
        dropdownTags[i].classList.toggle("bg-primary");
        if(dropdownTags[i].classList.contains("bg-primary")){
            arrayIncludingTagSelectedElements.push(dropdownTags[i].firstChild.innerText);
        }
        else{
            for (let a=0; a<arrayIncludingTagSelectedElements.length; a++){
                if (arrayIncludingTagSelectedElements[a] === dropdownTags[i].firstChild.innerText){
                    arrayIncludingTagSelectedElements.splice(a, 1);
                }
            }
        }
        console.log("contenu array tagFilter", arrayIncludingTagSelectedElements);
        if(arrayIncludingTagSelectedElements != 0){
            if(i<=34){
               let ingredientsToAddToFilteredArray = setFilterArrayAccordingToIngredientTag();
                console.log("Tag ingredients array value : ", ingredientsToAddToFilteredArray);
            }
            else if(i<=45){
                let appliancesToAddToFilteredArray = setFilterArrayAccordingToAppareilsTag();
                console.log("Tag appareils array value", appliancesToAddToFilteredArray);
            }
            else{
                let ustentilesToAddToFilteredArray = setFilterArrayAccordingToUstentilesTag();
                console.log("Tag ustentiles array value", ustentilesToAddToFilteredArray);
            }
            if (arrayIncludingFilteredElements.length === 0){
                for (let i=0; i<ingredientsToAddToFilteredArray.length; i++){
                    arrayIncludingFilteredElements[i] = ingredientsToAddToFilteredArray[i];
                }
            }
            else{
                for (let i=0; i<ingredientsToAddToFilteredArray.length; i++){
                    if(!(ingredientsToAddToFilteredArray.includes(arrayIncludingFilteredElements[i].id))){
                        arrayIncludingFilteredElements.splice(i, 1);
                    }
                    arrayIncludingFilteredElements.push(ingredientsToAddToFilteredArray[i]);
                }            
            }
            console.log("final array: ", arrayIncludingFilteredElements);
        }
        else{
            arrayIncludingFilteredElements = [];
        }
    })
}
