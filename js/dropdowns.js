import {recipes} from './recipes.js';

const dropdownIngredients = document.querySelector('.dropdown-ingredients');
const dropdownAppareil = document.querySelector('.dropdown-appareils');
const dropdownUstentiles = document.querySelector('.dropdown-ustentiles');

let tabIngredients = [], tabAppareils = [], tabUstentiles = [];

for (let i=0; i<recipes.length; i++){
    for (let j=0; j<recipes[i].ingredients.length; j++){
        tabIngredients[i] = recipes[i].ingredients[j].ingredient;
    }
    tabAppareils[i] = recipes[i].appliance;
    for (let j=0; j<recipes[i].ustensils.length; j++){
        tabUstentiles[i] = recipes[i].ustensils[j];
    }
}

function setDropdownElements(dropdownElement, elements){
    let domElementDropdown;
    const uniqueElement = elements.filter((el, index) => elements.indexOf(el) === index);

    for (let i=0; i<uniqueElement.length; i++){
        domElementDropdown = `<li><a class="dropdown-item" href="#">${uniqueElement[i]}</a></li>`;
        dropdownElement.innerHTML += domElementDropdown;
    }

}

setDropdownElements(dropdownIngredients, tabIngredients);
setDropdownElements(dropdownAppareil, tabAppareils);
setDropdownElements(dropdownUstentiles, tabUstentiles);
