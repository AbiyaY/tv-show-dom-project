//You can edit ALL of the code here
//const allEpisodes = getAllEpisodes();
const allShows = getAllShows();
const rootElem = document.getElementById("root");
const searchWrapEl = document.getElementById("search-wrap");

const showSelectElem = document.createElement("select");
// const showSelectElem = document.createElement("select");
// showSelectElem.setAttribute("id", "showSelect");
// const showOptionEl = document.createElement("option");
// showOptionEl.innerHTML = "Show";
// showSelectElem.appendChild(showOptionEl);
// searchWrapEl.appendChild(showSelectElem);


// const divSelectElem = document.createElement("div");
// rootElem.appendChild(divSelectElem);

const selectElem = document.createElement("select");
selectElem.setAttribute("id", "select");
const optionElem = document.createElement("option");
optionElem.innerHTML = "Episodes";
//selectElem.appendChild(optionElem);

//selectElem.setAttribute("placeholder", "Search");
searchWrapEl.appendChild(selectElem);
//const optionElem = document.createElement("option");
//selectElem.appendChild(optionElem);

//const divSearchElem = document.createElement("div");
//divSearchElem.setAttribute("id", "divSearch");
//rootElem.appendChild(divSearchElem);
const searchElem = document.createElement("input");
searchElem.setAttribute("id", "search");
searchElem.setAttribute("type", "search");
searchElem.setAttribute("name", "search");
searchElem.setAttribute("placeholder", "Search");
searchWrapEl.appendChild(searchElem);

const divDisplay = document.createElement("div");
divDisplay.setAttribute("id", "display");
rootElem.appendChild(divDisplay);

// const buttonElem = document.createElement("button");
// buttonElem.setAttribute("class", "search");
// buttonElem.innerHTML = "Search";
// rootElem.appendChild(buttonElem);

const divContainerElem = document.createElement("div");
divContainerElem.id = "div-container";
rootElem.appendChild(divContainerElem);



const h4El = document.createElement("h4");
 
  divDisplay.appendChild(h4El);

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

function setup() {  
  // let allEpisodes = fetch("https://api.tvmaze.com/shows/82/episodes")
  //   .then(response => response.json())
  //   .then(data => {
  //       allEpisodes = data;
  //       console.log(data);
  //       makePageForEpisodes(allEpisodes);
  //       selectEpisodes(allEpisodes);
  //       searchEpisodes(allEpisodes);
  //   })
  //   .catch(err => console.log(err));
    //makePageForEpisodes(allEpisodes);
    let defaultId = 82;
    getFetch(defaultId);
    makePageForShows(allShows);
    
}

function makePageForShows(showList){
    //const showSelectElem = document.createElement("select");
    showSelectElem.setAttribute("id", "showSelect");
    const showOptionEl = document.createElement("option");
    showOptionEl.innerHTML = "Show";
    showSelectElem.appendChild(showOptionEl);
    searchWrapEl.appendChild(showSelectElem);

    showList.forEach(show => {
        const optionEl = document.createElement("option");
        optionEl.innerHTML = show.name;
        optionEl.setAttribute("value", show.id);
        showSelectElem.appendChild(optionEl);
        console.log(show);
    });
    
}


function makePageForEpisodes(episodeList) {

   h4El.textContent = `Displaying ${episodeList.length} episodes`;
  
  episodeList.forEach(episode => {

    const optionElem = document.createElement("option");
    

    
    //optionElem.setAttribute("value", `${episode.name}`);
    
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
   
    

    //pElem.innerHTML = ``;
    divTitleElem.appendChild(h1Elem);

    const imageElem = document.createElement("img");
    imageElem.setAttribute("class", "image");
    imageElem.src = `${episode.image.medium}`;
    divImgElem.appendChild(imageElem);

    const p1Elem = document.createElement("p");
    p1Elem.innerHTML = `${episode.summary}`;
    divSummaryElem.appendChild(p1Elem);

    divCardElem.appendChild(divTitleElem);
    divCardElem.appendChild(divImgElem);
    divCardElem.appendChild(divSummaryElem);
    divContainerElem.appendChild(divCardElem);
  });
 
  console.log(episodeList);

  // searchElem.addEventListener("input", e => {
  //   const searchItem = e.target.value.toLowerCase();
  //   const searchFilter = allEpisodes.filter(episodes => {
  //     return episodes.name.toLowerCase().includes(searchItem) || episodes.summary.toLowerCase().includes(searchItem);
  //   });
  //   console.log(searchFilter);
  //   divContainerElem.innerHTML = "";
  //  makePageForEpisodes(searchFilter);
  // });

  //rootElem.innerHTML = `Got ${episodeList.name} episode(s)` 
  



}

showSelectElem.addEventListener("change", (e) => {
  let showSelctId = e.target.value;
  console.log(showSelctId);
  divContainerElem.innerHTML = "";
  selectElem.innerText="";
  getFetch(showSelctId);
});

function selectEpisodes(episodeList) {

    selectElem.addEventListener("click", (e) => {
    
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
//console.log(allEpisodes);


window.onload = setup;
