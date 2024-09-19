'use client';

/* This page contains the UI for the page that allows users to create a fountain in the databasae. 
The user can enter in the name (fountian location) and initial number of bottles counted on fountain.
After clicking submit, fountain is created in database.

API returns the fountain object, which is then used to retieve the ID number.
This ID value is then displayed on the website as this info needs to be used to set the ID on the Arduino.
*/

import { FormEvent } from 'react'
import './create-styles.css';
import prisma from '@/app/prismaFountains';

export default function CreateFountain() {
  //Whenever the form is submitted, this function retrieves the data from the input boxes and sends it to the Create API
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    //const formData = new FormData(event.currentTarget.id);
    console.log((event.currentTarget.elements[0] as HTMLInputElement).value); // building
    console.log((event.currentTarget.elements[1] as HTMLInputElement).value); // description
    console.log((event.currentTarget.elements[1] as HTMLInputElement).value); // bottleNum

    const fountain = ({
      building: (event.currentTarget.elements[0] as HTMLInputElement).value,
      description: (event.currentTarget.elements[1] as HTMLInputElement).value,
      bottleNum: parseInt( (event.currentTarget.elements[2] as HTMLInputElement).value ),
    });
    
    const res = await fetch('/api/webapp/create', {
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
        returnString = "On " + returnString
      }
      else {
        returnString = "Off " +  returnString
      } // I know this looks backwards but the dipswitches were implemented in reverse so this is correct

    }
    console.log(returnString)

    const dipswitchValsLabel = document.getElementById('DipswitchVals');
    if (dipswitchValsLabel !== null) {
        dipswitchValsLabel.innerHTML = returnString;
    }
    


  
    alert("Fountain Created!"/*\nID: */);
  }

  //return button takes you back to main page (acts as a refresh)
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

        <label htmlFor="fbuilding" className="create-label">
        Type the building of the new fountain here <div className="second-line-block">(e.g., Jonsson Hall)</div>
        </label>
        <input id="fbuilding" type="text" placeholder="Fountain Building"
        className="create-input" required/>

        <label htmlFor="flocation" className="create-label">
        Type the general location description of the new fountain here <div className="second-line-block">(e.g., Near the first floor elevator)</div>
        </label>
        <input id="flocation" type="text" placeholder="Fountain Description"
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