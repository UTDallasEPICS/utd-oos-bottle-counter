'use client';
import { FormEvent } from 'react'
import './create-styles.css';
import prisma from '@/app/prismaFountains';

export default function RenameFountain() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    //const formData = new FormData(event.currentTarget.id);
    console.log((event.currentTarget.elements[0] as HTMLInputElement).value);
    console.log((event.currentTarget.elements[1] as HTMLInputElement).value);

    const fountain = ({
      id: parseInt( (event.currentTarget.elements[0] as HTMLInputElement).value ),
      name: (event.currentTarget.elements[1] as HTMLInputElement).value,
    });
    
    const res = await fetch('/api/rename', {
      method: 'POST',
      body: JSON.stringify({fountain: fountain}),
    });

    // Handle response if necessary
    const data = await res.json()
    console.log("This works")
    console.log(data.res)

    if(data.res !== "ID_NOT_FOUND_ERROR") {
      //console.log('success delete path');
      alert('Success: ID found, fountain renamed');
      window.location.href = '/'
    }  
    else {
      //console.log('There was an error...');
      alert('Error: This ID does not exist in database...');
    }
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
        Type the ID of The Fountain you want to rename<div className="second-line-block">(if multiple fountains in same building, we recommend typing a #number following the name)</div>
        </label>
        <input id="fname" type="number" placeholder="Fountain ID" min="0"
        className="create-input" required/>

        <label htmlFor="fcounter" className="create-label">
        Type the location name of the fountain here
        </label>
        <input id="fcounter" type="text" placeholder="Fountain Name"
        className="create-input" required/>

        <div className="buttonbox">
        <button type="submit" className="create-submit-btn">Create</button>
        <button onClick={returnfunct} type="button" className="create-submit-btn" id="returnbutton">Return</button>
        </div>
      </form>
    </div>
    <div></div>
    <div></div>

  </div>
  
    
  </>);
}