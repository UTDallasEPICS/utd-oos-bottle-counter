const button = document.querySelector('.js-selector-button');
const selector = document.querySelector('.js-location-selector');
const counter = document.querySelector('.js-counter');

button.onclick = (event) => {
  event.preventDefault();
  // show the selected index
  //alert(selector.value);
  if(selector.value === "all") {
    counter.innerHTML = 1000000;
  }
  else if (selector.value === "ESCN") {
    counter.innerHTML = 123456;
  }
  else if (selector.value === "ECSS") {
    counter.innerHTML = 231987;
  }
  else if (selector.value === "ECSW") {
    counter.innerHTML = 304235;
  }
  else if (selector.value === "GR") {
    counter.innerHTML = 473054;
  }
  else if (selector.value === "MC") {
    counter.innerHTML = 324950;
  }
  else if (selector.value === "SU") {
    counter.innerHTML = 129347;
  }
};