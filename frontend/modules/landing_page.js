import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
 //console.log("http://3.6.45.251:8082/cities");
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  try {
    let response = await fetch(`${config.backendEndpoint}/cities`);
    let user = await response.json();
    return user;
  }
  catch(err){
    //alert(err);
    return null;

  }
   
   // console.log(user);
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
 // return user;
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  let container=document.createElement("div");
  container.className="col-md-3 col-6";
  let innerHTML =`<a class="tile" href="pages/adventures/?city=${id}" id=${id}>
  <img src="${image}" >
  <div class="tile-text">
  <p>${city}</p>
  <p>${description}</p>
  </div>
  </a>`;
  container.innerHTML=innerHTML;
  document.getElementById("data").appendChild(container);
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

}

export { init, fetchCities, addCityToDOM };
