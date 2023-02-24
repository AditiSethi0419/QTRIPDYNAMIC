
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
let obj=new URLSearchParams(search);
return obj.get('city');
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  //console.log("Hello khuch toh btao");
  //console.log(city);
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    let res= await fetch(config.backendEndpoint + `/adventures?city=${city}`);
    let adventures = await res.json();
    return adventures;
  }
  catch(err)
  {
    return null;
  }
 

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
 // document.getElementById("data").textContent="";
  adventures.forEach((ele) => {
    let card = document.createElement('div');
    card.className=('col-xl-3 col-lg-4 col-sm-6 mb-3') ;
    card.innerHTML=`<a href="detail/?adventure=${ele.id}" id=${ele.id}>
    <div class="activity-card">
    <img class="activity-card img" src="${ele.image}"/>
    <div class="category-banner">
    ${ele.category}
    </div>
    <div class="card-body d-md-flex justify-content-between flex-wrap  w-100">
    <h5 class="card-title">${ele.name}</h5>
    <h6 class="card-text">${ele.currency} ${ele.costPerHead}</h5>
    </div> 
    <div class="card-body d-md-flex justify-content-between flex-wrap  w-100">
    <h5 class="card-title">Duration</h5>
    <h6 class="card-text">${ele.duration} Hours</h6>
    </div>
    </div>
    </a>`
    document.getElementById("data").appendChild(card);
  });
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
let newfilter= list.filter(adv => low <= adv.duration && adv.duration<=high);

console.log(newfilter);
return newfilter;
}
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  //console.log(list,categoryList);
  function filterByCategory(list, categoryList) {
  return list.filter(adv=>categoryList.indexOf(adv.category) >-1);
  }
//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  saveFiltersToLocalStorage(filters);
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if(filters.duration&&filters.category.length){
    let filteredList = filterByDuration(list,parseInt(filters.duration.split('-')[0]),parseInt(filters.duration.split('-')[1]));
   // console.log(filters);
    return filterByCategory(filteredList,filters.category);
  }
  if(filters.duration){
    //console.log(filters.duration);
    return filterByDuration(list,parseInt(filters.duration.split('-')[0]),parseInt(filters.duration.split('-')[1]));
    
  }
  if(filters.category.length)
  {
    //console.log(filters.category);
    return filterByCategory(list,filters.category);
  }
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  return localStorage.setItem('filters',JSON.stringify(filters));
  //return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  
  // Place holder for functionality to work in the Stubs
  return JSON.parse(localStorage.getItem('filters'));
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  let parent = document.getElementById("category-list");
  filters.category.forEach((item,i)=>{
    parent.innerHTML+=
    `<span class="category-filter">${item} 
    <span id="pillremove" class="ms-2" onclick="FilterRemover(${i})">x</span></span> `})
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
// let filteredAdventures=filterFunction(adventures,filters);
// addAdventureToDOM(filteredAdventures);
  
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
