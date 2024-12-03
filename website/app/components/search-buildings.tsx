'use client';

import { getBuildingsList } from "../utilities";

/*
This component contains code that takes in the "All Fountains" prop (from the prismaFountains.tsx file passed to the main page.tsx file).
It uses the map function to read each fountain in the fountain array of objects it received and displays each fountain on the page.
Then there is a search bar that can be used to narrow the selection of fountains displayed.
*/

export default function BuildingSearchBar(props:any) {

  return (<>
  <input type="text" id="myBuildingInput" placeholder="Search for Building..." className="search-bar" onKeyUp={searchFeature}/>

  <ul id="myBuildingUL">
    {props.buildingArray.map( (building:any, index:Number) => (
    <li className="fountain" key={building.buildingId}>
      <div className="fountainID buildingId">
        ID #{building.buildingId}, <div className="fountainName buildingName">{building.buildingName}</div> 
      </div>
      <div>{building.buildingBottleCount}</div>
    </li>) )}
  </ul>
  </>);
}

//source: https://www.w3schools.com/howto/howto_js_filter_lists.asp
function searchFeature() {
  // Declare variables
  let input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myBuildingInput') as HTMLInputElement;
  filter = input.value.toUpperCase();
  ul = document.getElementById("myBuildingUL") as HTMLElement;
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for(i=0; i < li.length; i++) {
    a = li[i].getElementsByClassName("buildingName")[0] as HTMLElement;
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
