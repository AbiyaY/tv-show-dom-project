//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();
const rootElem = document.getElementById("root");

const divSearchElem = document.createElement("div");
divSearchElem.setAttribute("id", "divSearch");
rootElem.appendChild(divSearchElem);
const searchElem = document.createElement("input");
searchElem.setAttribute("id", "search");
searchElem.setAttribute("type", "search");
searchElem.setAttribute("name", "search");
searchElem.setAttribute("placeholder", "Search");
divSearchElem.appendChild(searchElem);

// const buttonElem = document.createElement("button");
// buttonElem.setAttribute("class", "search");
// buttonElem.innerHTML = "Search";
// rootElem.appendChild(buttonElem);

const divContainerElem = document.createElement("div");
divContainerElem.id = "div-container";
rootElem.appendChild(divContainerElem);



function setup() {
  
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  
  episodeList.forEach(episode => {

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

  searchElem.addEventListener("keypress", e => {
    const searchItem = e.target.value.toLowerCase();
    const searchFilter = allEpisodes.filter(episodes => {
      return episodes.name.toLowerCase().includes(searchItem) || episodes.summary.toLowerCase().includes(searchItem);
    });
    console.log(searchFilter);
    divContainerElem.innerHTML = "";
   makePageForEpisodes(searchFilter);
  });

  //rootElem.innerHTML = `Got ${episodeList.name} episode(s)`;
}

window.onload = setup;
