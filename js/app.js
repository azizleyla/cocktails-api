const URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=a";
const baseURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
const sectionCenter = document.querySelector('.section-center');
const searchForm = document.querySelector('.search-form');
const searchInput = document.getElementById('search');
const titleElement = document.querySelector('.title');
const singleDrink = document.querySelector('.single-drink');
let drinks = [];

const displayDrinks = async (drinks) => {
    if (drinks === null) {
        titleElement.textContent = "Sorry,No Drinks Matched Your Search";
        sectionCenter.innerHTML = null;
        return
    }
    sectionCenter.innerHTML = "";
    drinks.forEach(drink => {
        const { idDrink: id, strDrink: name, strDrinkThumb: image, strInstructions: desc } = drink;
        const singleDrinkElement = document.createElement('div');
        singleDrinkElement.innerHTML = `
        <a href="#">
        <article class="cocktail" data-id="${id}" >
        <img src="${image}" alt="${name}" />
        <h3>${name}</h3>
        </article>
        </a
        `
        sectionCenter.append(singleDrinkElement)
        titleElement.textContent = "";

        singleDrinkElement.addEventListener('click', function () {
            let ingredients = "";
            const list = [
                drink.strIngredient1,
                drink.strIngredient2,
                drink.strIngredient3,
                drink.strIngredient4,
                drink.strIngredient5,
            ];
            ingredients = list.map(item => {
                if (!item) return
                return `<li><i class="far fa-check-square"></i>${item}</li>`

            })


            sectionCenter.style.display = "none"
            let element = "";
            element += `
            <img src="${image}" class="drink-img" alt="" />
            <article class="drink-info">
                <h2 class="drink-name">${name}</h2>
                <p class="drink-desc">${desc}</p>
                <ul class="drink-ingredients">
              ${ingredients.join("")}
                </ul>
                <a href="index.html" class="btn">all cocktails</a>
            </article>
            `
            singleDrink.innerHTML = element;

        })
    })

}

const getData = async (URL) => {
    const response = await fetch(URL);
    const data = await response.json();
    drinks = data.drinks;
    displayDrinks(drinks);
    console.log(drinks);
}
searchInput.addEventListener('keyup', searchDrinks);

//search drinks 
function searchDrinks(e) {
    e.preventDefault();
    const value = searchInput.value;
    if (!value) return;
    getData(`${baseURL}${value}`)

}

window.addEventListener('DOMContentLoaded', getData(URL));