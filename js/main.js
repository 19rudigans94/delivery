const restaurantURL = "./db/partners.json"
const restouransNode = document.querySelector(".restaurants")
const foodMenuNode = document.querySelector(".food-menu")
const backBtn = document.querySelector(".btn")

const card = []
let foodMenuArr = []


const getData = async (URL) => {
    const res = await fetch(URL, {
        method: "GET",
    });
    if (res.ok) {
        const data = await res.json();
        return data;
    }

    throw new Error('Ошибка');
}


const createRestaurantsCards = ({ name, kitchen, price, stars, time_of_delivery, image, products }) => {
    const restaurantCard = `
        <div class="restourant-card" data-product="${products}">
            <h3>${name}</h3>
            <span>${kitchen}</span>
            <ul>
                <li>${price}</li>
                <li>${stars}</li>
                <li>${time_of_delivery}</li>
            </ul>
            <img src="${image}" alt="#">
        </div>
    `;
    restouransNode.insertAdjacentHTML("beforeend", restaurantCard);
}


const openRestorant = async (event) => {
    const target = event.target;
    const restourant = target.closest(".restourant-card");
    if (restourant) {
        // console.log(restourant);
        // console.log(restourant.dataset.product);
        const restouransData = await getData(`./db/${restourant.dataset.product}`)
        if (restouransData.length > 0) {
            foodMenuArr = restouransData
            foodMenuNode.innerHTML = ""

            restouransData.map((menuItem) => createFoodCard(menuItem))
        }
    }
}


const toggleMenu = () => {
    restouransNode.classList.remove('hide')
    foodMenuNode.classList.add('hide')
    backBtn.classList.add('hide')
}


const createFoodCard = ({ name, price, description, image }) => {
    const foodCard = `
    <div class="food-card">
    <h3>${name}</h3>
    <span>${price}</span>
    <button class="add-to-card">Купить</button>
    <p>${description}</p>
    <img src="${image}" alt="#">
    </div>
    `
    restouransNode.classList.add("hide");
    backBtn.classList.remove('hide')
    foodMenuNode.classList.remove('hide')
    foodMenuNode.insertAdjacentHTML("beforeend", foodCard)

};


const addToCard = (e) => {
    const buyBtn = e.target.closest(".add-to-card")
    if (buyBtn) {
        const foodCard = buyBtn.parentElement;
        // console.log(buyBtn.parentElement);
        // const goodObject = {
        //     name: foodCard.closest("h3").textContent
        // }
        console.log(foodMenuArr);
    }
}


const init = async () => {
    const restaurantArr = await getData(restaurantURL);
    restaurantArr.map((restaurant) => {
        console.log(restaurant);
        createRestaurantsCards(restaurant);
    })
    restouransNode.addEventListener("click", openRestorant)
    backBtn.addEventListener('click', toggleMenu)
    foodMenuNode.addEventListener("click", addToCard)
}


init();