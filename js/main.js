const restaurantURL = "./db/partners.json"
const restouransNode = document.querySelector(".restaurants")


const getData = async (URL) => {
    const res = await fetch(URL, {
        method: 'GET',
    });
    if (res.ok) {
        const data = await res.json();
        return data;
    }
    throw new Error('Ошибка');
}


const createRestaurantCards = ({ name, kitchen, price, stars, time_of_delivery, image, products }) => {
    const restaurantCard = `
        <div class="restourant-card" data-product=${products}>
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
    restouransNode.insertAdjacentHTML("beforeend", restaurantCard)
}


const openRestorant = (event) => {
    const target = event.target;
    const restourant = target.closest(".restourant-card");
    if (restourant) {
        getData(`../db/${restourant.dataset.products}`)
    }
}


const init = async () => {
    const restaurantArr = await getData(restaurantURL);
    restaurantArr.map((restaurant) => {
        // console.log(restaurant);
        createRestaurantCards(restaurant);
    })
    restouransNode.addEventListener("click", openRestorant)
}


init();