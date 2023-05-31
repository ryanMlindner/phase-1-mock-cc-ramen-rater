//wrote my code here
const apiURL = 'http://localhost:3000/ramens';
const headers = {
  Accept: 'application/json',
  'Content-type': 'application/json',
}

let ramenList = [];
const ramenHolder = document.getElementById("ramen-menu");
const ramenDescriptionContainer = document.getElementById("ramen-detail");
const imgDetailDisplay = document.getElementById("detail-image");
const nameDisplay = document.getElementById("name");
const restaurantDisplay = document.getElementById("restaurant");
const ratingDisplay = document.getElementById("rating-display");
const commentDisplay = document.getElementById("comment-display");
let currentRamenId;

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
  //extra deliverable 1
  assignRamenData(1);
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
  currentRamenId = id;
}

function emptyRamenData() {
  imgDetailDisplay.src = './assets/image-placeholder.jpg';
  nameDisplay.innerText = 'Insert Name Here';
  restaurantDisplay.innerText =  'Insert Restaurant Here';
  ratingDisplay.innerText = '';
  commentDisplay.innerText = '';
}

const newRamenForm = document.getElementById("new-ramen");
newRamenForm.addEventListener("submit", addNewRamen);

//persist ramen adding
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

  fetch(apiURL, {
    headers,
    method: "POST",
    body: JSON.stringify(newRamen),
  })
    .then(res => res.json())
    .then(json => {
      ramenList.push(json);
      loadMenu();
      assignRamenData(json.id);
    })
}

const updateRamenForm = document.getElementById("edit-ramen");
updateRamenForm.addEventListener("submit", updateFeaturedRamen);

//persist ramen updating
function updateFeaturedRamen(event) {
  event.preventDefault();
  const form = event.target;
  const ramenTarget = ramenList.find(ramen => ramen.id === currentRamenId);
  const newRating = form.rating.value;
  const newComment = form.comment.value;

  fetch(`${apiURL}/${currentRamenId}`, {
    headers,
    method: "PATCH",
    body: JSON.stringify({
      rating: newRating,
      comment: newComment
    })
  })
    .then(res => res.json())
    .then(json => {
      ramenTarget.rating = json.rating;
      ramenTarget.comment = json.comment;
      assignRamenData(ramenTarget.id);
    })
}

const deleteButton = document.getElementById("delete");
deleteButton.addEventListener("click", deleteFeaturedRamen)

//no persist ramen deleting
function deleteFeaturedRamen() {
  const newList = ramenList.filter(ramen => ramen.id !== currentRamenId);
  ramenList = newList;
  if(ramenList.length !== 0) {
  nextRamenId = ramenList[0].id;
  loadMenu();
  assignRamenData(nextRamenId);
  }
  else {
    loadMenu();
    emptyRamenData();
  }
}
