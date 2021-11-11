//You can edit ALL of the code here
//const allEpisodes = getAllEpisodes();
// const allShows = getAllShows();
const rootElem = document.getElementById("root");
const searchWrapEl = document.getElementById("search-wrap");

//Show Select Bar
const showSelectElem = document.createElement("select");
showSelectElem.setAttribute("id", "showSelect");
const showOptionEl = document.createElement("option");
showOptionEl.innerHTML = "Select a Show";
showSelectElem.appendChild(showOptionEl);
searchWrapEl.appendChild(showSelectElem);

//Episode Select Bar
const selectElem = document.createElement("select");
selectElem.setAttribute("id", "select");
const optionEl = document.createElement("option");
optionEl.innerHTML = "Select an Episodes";
selectElem.appendChild(optionEl);
searchWrapEl.appendChild(selectElem);

//Search Bar
const searchElem = document.createElement("input");
searchElem.setAttribute("id", "search");
searchElem.setAttribute("type", "search");
searchElem.setAttribute("name", "search");
searchElem.setAttribute("placeholder", "Search");
searchWrapEl.appendChild(searchElem);

//Display Element
const divDisplay = document.createElement("div");
divDisplay.setAttribute("id", "display");
rootElem.appendChild(divDisplay);

//Container Element
const divContainerElem = document.createElement("div");
divContainerElem.id = "div-container";
rootElem.appendChild(divContainerElem);

const h4El = document.createElement("h4"); 
divDisplay.appendChild(h4El);


function setup() {  
  const allShows = getAllShows();
  //To sort the shows in alphabetical order
  let sortedArr = allShows.sort(function(a, b) {
    return a.name === b.name ? 0 : a.name < b.name ? -1 : 1;
  });
  let defaultId = 82;
  getFetch(defaultId);
  makePageForShows(sortedArr);    
}

//Fetching API
function getFetch(showId) {
  let allEpisodes = fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
    .then(response => response.json())
    .then(data => {
        allEpisodes = data;
        console.log(data);
        makePageForEpisodes(allEpisodes);
        selectEpisodes(allEpisodes);
        searchEpisodes(allEpisodes);
    })
    .catch(err => console.log(err));
}

//List of Shows
function makePageForShows(showList){
  showList.forEach(show => {
    const optionEl = document.createElement("option");
    optionEl.innerHTML = show.name;
    optionEl.setAttribute("value", show.id);
    showSelectElem.appendChild(optionEl);
    console.log(show);
  });
}

//List of Episodes
function makePageForEpisodes(episodeList) {

  h4El.textContent = `Displaying ${episodeList.length} episodes`;
  
  episodeList.forEach(episode => {

    const optionElem = document.createElement("option"); 
    selectElem.appendChild(optionElem);    

    if(episode.number < 10){
      optionElem.setAttribute("value", `${episode.name}`);
      optionElem.innerText = `S0${episode.season}E0${episode.number} - ${episode.name}`;
    } else {
      optionElem.innerText = `S0${episode.season}E${episode.number} - ${episode.name}`;        
    }

    const divCardElem = document.createElement("div");
    divCardElem.setAttribute("id", "divCard");
    const divTitleElem = document.createElement("div");
    divTitleElem.setAttribute("id", "divTitle");
    const divImgElem = document.createElement("div");
    divImgElem.setAttribute("id", "divImg");
    const divSummaryElem = document.createElement("div");
    divSummaryElem.setAttribute("id", "divSummary");

    const h1Elem = document.createElement("h1");
    if(episode.number < 10) {
       h1Elem.innerHTML = `${episode.name} - S0${episode.season}E0${episode.number}`;
    } else {
      h1Elem.innerHTML = `${episode.name} - S0${episode.season}E${episode.number}`;
    }
   
    //Title
    divTitleElem.appendChild(h1Elem);
    //Image
    const imageElem = document.createElement("img");
    imageElem.setAttribute("class", "image");
    imageElem.src = `${episode.image.medium}`;
    divImgElem.appendChild(imageElem);
    //Summary
    const p1Elem = document.createElement("p");
    p1Elem.innerHTML = `${episode.summary}`;
    divSummaryElem.appendChild(p1Elem);

    divCardElem.appendChild(divTitleElem);
    divCardElem.appendChild(divImgElem);
    divCardElem.appendChild(divSummaryElem);
    divContainerElem.appendChild(divCardElem);
  });
 
  console.log(episodeList);
}

//Event handler for Show Select
showSelectElem.addEventListener("change", (e) => {
  let showSelctId = e.target.value;
  console.log(showSelctId);
  divContainerElem.innerHTML = "";
  selectElem.innerText="";
  getFetch(showSelctId);
});

//Event Handler for Select Episodes
function selectEpisodes(episodeList) {
  selectElem.addEventListener("change", (e) => {    
    let selectItem = e.target.value;
    let selectFilter = episodeList.filter(episode => {
      return episode.name === selectItem;
    });
    //console.log(selectFilter);
    divContainerElem.innerHTML = "";
    makePageForEpisodes(selectFilter);
    console.log(selectFilter);
    h4El.textContent = `Displaying ${selectFilter.length}/${episodeList.length} episodes`;  
  });
}

//Event Handler for Search Item
function searchEpisodes(allEpisodes) {
  searchElem.addEventListener("input", e => {
    const searchItem = e.target.value.toLowerCase();
    const searchFilter = allEpisodes.filter(episodes => {
      return episodes.name.toLowerCase().includes(searchItem) || episodes.summary.toLowerCase().includes(searchItem);
    });
    console.log(searchFilter);
    divContainerElem.innerHTML = "";
    makePageForEpisodes(searchFilter);
    console.log(allEpisodes.length);
    h4El.textContent = `Displaying ${searchFilter.length}/${allEpisodes.length} episodes`;
  });
}


window.onload = setup;
