import {recipes} from './recipes.js';

export const dropdownIngredients = document.querySelector('.dropdown-ingredients');
export const dropdownAppareils = document.querySelector('.dropdown-appareils');
export const dropdownUstentiles = document.querySelector('.dropdown-ustentiles');

let tabIngredients = [], tabAppareils = [], tabUstentiles = [], tabNbrOfIngredients = [], tabNbrOfUstentiles = [], sumIngr = 0, sumUst = 0;
for (let i=0; i<recipes.length; i++){
    tabNbrOfIngredients.push(recipes[i].ingredients.length);
    tabNbrOfUstentiles.push(recipes[i].ustensils.length);
} 

for (let j = 0; j < tabNbrOfIngredients.length; j++) {
    sumIngr += tabNbrOfIngredients[j];
}

for (let j = 0; j < tabNbrOfUstentiles.length; j++) {
    sumUst += tabNbrOfUstentiles[j];
}
//Sets arrays for dropdowns
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

function setDropdownElements(dropdownElement, arrayOfElements){
    let HtmlElementDropdown;
    const uniqueElement = arrayOfElements.filter((el, index) => arrayOfElements.indexOf(el) === index);
    for (let i=0; i<uniqueElement.length; i++){
        HtmlElementDropdown = `<li class="dropdown-tag"><a class="dropdown-item-tag | dropdown-item">${uniqueElement[i]}</a></li>`;
        dropdownElement.innerHTML += HtmlElementDropdown;
    }
}

setDropdownElements(dropdownIngredients, tabIngredients);
setDropdownElements(dropdownAppareils, tabAppareils);
setDropdownElements(dropdownUstentiles, tabUstentiles);

const dropdownInputSearch = document.querySelectorAll('.dropdown-search');
const dropdownTags = document.querySelectorAll('.dropdown-tag');
function deleteTagFromArray(arrayTag, tagSelected){
    for (let a=0; a<arrayTag.length; a++){
        if (arrayTag[a] === tagSelected){
            arrayTag.splice(a, 1);
        }
    }
    return arrayTag;
}

let arrayOfTagIngredients = [], arrayOfTagUstentiles = [], arrayOfTagAppareils = [], arrayOfFilteredRecipes = [], ingredientsForOneRecipeToCheck = [[]], appareilsForOneRecipeToCheck = [], ustentilesForOneRecipeToCheck = [[]];
//Allow to check includes() between two arrays
const includesAll = (arr, values) => values.every(v => arr.includes(v));

function checkIfRecipesIncludeArraysOfTagElements(arrayOfTagElements){
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
}

for (let i=0; i<dropdownTags.length; i++){
    dropdownTags[i].addEventListener('click', () => {
        dropdownTags[i].classList.toggle("bg-primary");
        if(dropdownTags[i].classList.contains("bg-primary")){
            if(i<=119){
                arrayOfTagIngredients.push(dropdownTags[i].firstChild.innerText);
            }
            else if(i<=130){
                arrayOfTagAppareils.push(dropdownTags[i].firstChild.innerText);
            }
            else{
                arrayOfTagUstentiles.push(dropdownTags[i].firstChild.innerText);
            }
        }
        else{
            deleteTagFromArray(arrayOfTagIngredients, dropdownTags[i].firstChild.innerText);
            deleteTagFromArray(arrayOfTagAppareils, dropdownTags[i].firstChild.innerText);
            deleteTagFromArray(arrayOfTagUstentiles, dropdownTags[i].firstChild.innerText);
        }

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
        checkIfRecipesIncludeArraysOfTagElements(arrayOfTagIngredients);
        checkIfRecipesIncludeArraysOfTagElements(arrayOfTagAppareils);
        checkIfRecipesIncludeArraysOfTagElements(arrayOfTagUstentiles);
        console.log("contenu array tagFilter", arrayOfFilteredRecipes);
        arrayOfFilteredRecipes = [];
    })
}
