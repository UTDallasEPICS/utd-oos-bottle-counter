'use client';
import { FormEvent } from 'react'
import './create-styles.css';
import prisma from '@/app/prismaFountains';

/*
This file contains code for UI allowing users to rename existing fountains in database.
In the Rename page in webapp, there is a form requesting the user to enter an "ID" and "New Name."
With that data, the API uses Prisma to search the database for the fountain with the corresponding ID,
and then changes the name attribute with the new user entered name value.
*/

export default function EditFountain() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    //const formData = new FormData(event.currentTarget.id);
    console.log("This is element 0:" + (event.currentTarget.elements[0] as HTMLInputElement).value);
    console.log("This is element 1:" +(event.currentTarget.elements[1] as HTMLInputElement).value);

    const fountain = ({
      id: parseInt( (event.currentTarget.elements[0] as HTMLInputElement).value ),
      description: (event.currentTarget.elements[1] as HTMLInputElement).value,
    });
    
    const res = await fetch('/api/webapp/rename', {
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
        <legend className="create-legend">Edit Fountain</legend>

        <label htmlFor="fname" className="create-label">
        Type the ID of The Fountain you want to edit<div className="second-line-block">(if multiple fountains in same building, we recommend typing a #number following the name)</div>
        </label>
        <input id="fname" type="number" placeholder="Fountain ID" min="0"
        className="create-input" required/>

        <label htmlFor="fcounter" className="create-label">
        Type the new description of the fountain here
        </label>
        <input id="fcounter" type="text" placeholder="New Fountain Description"
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