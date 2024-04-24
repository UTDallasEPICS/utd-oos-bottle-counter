'use client';

export default function SearchBar(props:any) {
  console.log(props.fountainArray)
  return (<>
  <input type="text" id="myInput" placeholder="Search for Fountain..." className="search-bar" onKeyUp={searchFeature}/>

  <ul id="myUL">
    {props.fountainArray.map( (fountain:any, index:Number) => (
    <li className="fountain">
        <div className="fountainID">ID #{fountain.id}, <div className="fountainName">{fountain.name}</div> </div>
      <div>{fountain.bottleNum}</div>
      </li>) )}
  </ul>

  </>);
}

//source: https://www.w3schools.com/howto/howto_js_filter_lists.asp
function searchFeature() {
  // Declare variables
  let input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for(i=0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
