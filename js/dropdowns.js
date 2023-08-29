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

function deleteTagFromArray(arrayTag, tagSelected){
    for (let a=0; a<arrayTag.length; a++){
        if (arrayTag[a] === tagSelected){
            arrayTag.splice(a, 1);
        }
    }
    return arrayTag;
}

let arrayOfTagIngredients = [], arrayOfTagUstentiles = [], arrayOfTagAppareils = [], arrayOfFilteredRecipes = [], ingredientsForOneRecipeToCheck = [[]];
const includesAll = (arr, values) => values.every(v => arr.includes(v));
for (let i=0; i<dropdownTags.length; i++){
    dropdownTags[i].addEventListener('click', () => {
        dropdownTags[i].classList.toggle("bg-primary");
        if(dropdownTags[i].classList.contains("bg-primary")){
            if(i<=34){
                arrayOfTagIngredients.push(dropdownTags[i].firstChild.innerText);
            }
            else if(i<=45){
                arrayOfTagAppareils.push(dropdownTags[i].firstChild.innerText);
            }
            else{
                arrayOfTagUstentiles.push(dropdownTags[i].firstChild.innerText);
            }
        }
        else{
            deleteTagFromArray(arrayOfTagIngredients, dropdownTags[i].firstChild.innerText);
            deleteTagFromArray(arrayOfTagAppareils);
            deleteTagFromArray(arrayOfTagUstentiles);
        }

        for (let j=0; j<arrayOfTagIngredients.length; j++){
            ingredientsForOneRecipeToCheck = new Array(recipes.length);
            for (let k=0; k<recipes.length; k++){
                ingredientsForOneRecipeToCheck[k] = new Array(recipes[k].ingredients.length);
                for (let l=0; l<recipes[k].ingredients.length; l++){
                    ingredientsForOneRecipeToCheck[k][l] = (recipes[k].ingredients[l].ingredient).toLowerCase(); 
                }
                if (includesAll(ingredientsForOneRecipeToCheck[k], arrayOfTagIngredients) && !(arrayOfFilteredRecipes.includes(recipes[k]))){
                    arrayOfFilteredRecipes.push(recipes[k]);
                    
                }
                // if(arrayOfTagIngredients.includes(((recipes[k].ingredients[l].ingredient).toLowerCase())) && !(arrayOfFilteredRecipes.includes(recipes[k]))){
                //     arrayOfFilteredRecipes.push(recipes[k]);
                //     console.log(arrayOfFilteredRecipes[k], " ajouté au filtre");
                //     // if(j>0 && !(((recipes[k].ingredients[l].ingredient).toLowerCase()).includes(arrayOfTagIngredients[j-1]))){
                //     //     console.log(arrayOfFilteredRecipes[j], " déjà dans le filtre, mais ne contient pas le filtre ", arrayOfTagIngredients[j-1])
                //     //     arrayOfFilteredRecipes.splice(k, 1);
                //     // }
                // }
                
            }
        }
        console.log("contenu array ingredients to check", ingredientsForOneRecipeToCheck);
        console.log("contenu array tagFilter", arrayOfFilteredRecipes);
        arrayOfFilteredRecipes = [];
    })
}
