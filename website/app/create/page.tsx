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

    // Handle response if necessary
    const data = await res.json()
    console.log("This works")
    console.log("Data: " +  data.stringify());

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

  </div>
  
    
  </>);
}