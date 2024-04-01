'use client';
import data from '../data.json'
import { useState } from 'react'

export default function LocationInterface() {
  const [location, setLocation] = useState("All");
  const [counter, setCounter] = useState("77");

  return (<>
    <LocationInfo name={location} count={counter}/>
    <LocationSelector setLocation={setLocation} getCounter ={GetCounter} setCounter={setCounter}/>
  </>);
}

//COMPONENT: Displays location name and counter
function LocationInfo(props: any) {
  return(
    <>
      <p>Location Selected: {props.name}</p>
      <p>Location Counter: {props.count}</p>
    </>
  );
}

//COMPONENT: Allows user to select location
function LocationSelector(props: any) {
  
  return(<>
    <select onChange={
      event => {
        props.setLocation(event.target.value);
        props.getCounter(props.setCounter, event.target.value);
      }
    }>
      {data.map( (data, index) => (<option key={index}>{data.name}</option>))}
    </select>
  </>);
}

function GetCounter(setCounter: any, value: any) {
  //console.log("Location: " + value);
  for(let i = 0; i < data.length; i++) {
    //console.log(data[i].name);
    if (data[i].name === value)
    {
      //console.log(data[i].counter);
      setCounter(data[i].counter);
      break;
    }

  }
}