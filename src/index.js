//wrote my code here
const apiURL = 'http://localhost:3000/ramens';
let ramenList = [];

const ramenHolder = document.getElementById("ramen-menu");
const ramenDescriptionContainer = document.getElementById("ramen-detail");
const imgDetailDisplay = document.getElementById("detail-image");
const nameDisplay = document.getElementById("name");
const restaurantDisplay = document.getElementById("restaurant");
const ratingDisplay = document.getElementById("rating-display");
const commentDisplay = document.getElementById("comment-display");

fetch(apiURL)
  .then(res => res.json())
  .then(populateList);

function populateList(ramens) {
  console.log(ramens);
  ramens.forEach(addToList);
}

function addToList(ramen) {
  ramenList.push(ramen);
  loadMenu();
}

//populate ramen menu at the top of screen, attach click events to each
function loadMenu() {
  ramenHolder.innerHTML = '';
  ramenList.forEach((ramen) => {
    const menuImage = document.createElement("img");
    menuImage.src = ramen.image;
    menuImage.addEventListener("click", () =>{assignRamenData(ramen.id)})
    ramenHolder.append(menuImage);
  })
}

//populate ramen display details
function assignRamenData(id) {
  targetRamen = ramenList.find(ramen => ramen.id === id);
  imgDetailDisplay.src = targetRamen.image;
  nameDisplay.innerText = targetRamen.name;
  restaurantDisplay.innerText =  targetRamen.restaurant;
  ratingDisplay.innerText = targetRamen.rating;
  commentDisplay.innerText = targetRamen.comment;
}


const form = document.getElementById("new-ramen");
form.addEventListener("submit", addNewRamen);

//no persist ramen adding
function addNewRamen(event) {
  event.preventDefault();
  const form = event.target;
  const newRamen = {
    id: (ramenList.length + 1),
    name: form.name.value,
    restaurant: form.restaurant.value,
    image: form.image.value,
    rating: form.rating.value,
    comment: form.comment.value,
  }
  ramenList.push(newRamen);
  loadMenu();
}