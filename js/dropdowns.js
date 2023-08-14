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

function setDropdownElements(dropdownElement, elements){
    let domElementDropdown;
    const uniqueElement = elements.filter((el, index) => elements.indexOf(el) === index);
    for (let i=0; i<uniqueElement.length; i++){
        domElementDropdown = `<li><a class="dropdown-tag | dropdown-item">${uniqueElement[i]}</a></li>`;
        dropdownElement.innerHTML += domElementDropdown;
    }
}

setDropdownElements(dropdownIngredients, tabIngredients);
setDropdownElements(dropdownAppareils, tabAppareils);
setDropdownElements(dropdownUstentiles, tabUstentiles);
