'use client';
import { FormEvent } from 'react'
import './create-styles.css';
import prisma from '@/app/prismaFountains';

export default function CreateFountain() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    //const formData = new FormData(event.currentTarget.id);
    console.log((event.currentTarget.elements[0] as HTMLInputElement).value);
    console.log((event.currentTarget.elements[1] as HTMLInputElement).value);

    const fountain = ({
      name: (event.currentTarget.elements[0] as HTMLInputElement).value,
      bottleNum: parseInt( (event.currentTarget.elements[1] as HTMLInputElement).value ),
    });
    
    const res = await fetch('/api/create', {
      method: 'POST',
      body: JSON.stringify({fountain: fountain}),
    });

    // Handling turning the ID of the newly created fountain
    //into binary for input on the dipswitch for its respective device
    const data = await res.json()
    const displayNum = data.res.id
    let binary = displayNum.toString(2)
    while(binary.length < 8) {
      binary = "0" + binary;
    }
    let returnString = "";
    for (let i = 0; i < binary.length; i++) {
      if (binary.charAt(i) === '1') {
        returnString = returnString + "On "
      }
      else {
        returnString = returnString + "Off "
      }

    }
    console.log(returnString)
    document.getElementById('DipswitchVals').innerHTML = returnString


  alert("Fountain Created!"/*\nID: */);
  }
  async function returnfunct() {
    window.location.href = '/';
  }
  

  return (<>
  <div className="create-container">
    <dialog id="success">Fountain created successfully!</dialog>
    <div></div>
    <div>
      <form onSubmit={onSubmit} className="create-form">
        <legend className="create-legend">Add New Fountain</legend>

        <label htmlFor="fname" className="create-label">
        Type the location name of the new fountain here <div className="second-line-block">(if multiple fountains in same building, we recommend typing a #number following the name)</div>
        </label>
        <input id="fname" type="text" placeholder="Fountain Name"
        className="create-input" required/>

        <label htmlFor="fcounter" className="create-label">
        Type the number of water bottles saved (zero if unused)
        </label>
        <input id="fcounter" type="number" min="0" placeholder="Initial Counter"
        className="create-input" required/>

        <div className="buttonbox">
        <button type="submit" className="create-submit-btn">Create</button>
        <button onClick={returnfunct} type="button" className="create-submit-btn" id="returnbutton">Return</button>
        </div>
      </form>
    </div>
    <div></div>
    <div></div>
    <div><p>Format For Device Dipswitch 1 to 8, Left to Right:</p>
    <p id='DipswitchVals'></p>
    
    </div>

  </div>
  
    
  </>);
}