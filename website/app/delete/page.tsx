'use client';
import { FormEvent } from 'react';
import './delete-styles.css';

export default function DeleteFountain() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
 
    //const formData = new FormData(event.currentTarget.id);
    console.log((event.currentTarget.elements[0] as HTMLInputElement).value);

    const fountain = ({
      id: parseInt( (event.currentTarget.elements[0] as HTMLInputElement).value ),
    });
    
    const res = await fetch('/api/webapp/delete', {
      method: 'POST',
      body: JSON.stringify({fountain: fountain}),
    });

    // Handle response if necessary
    const data = await res.json();
    //console.log({ data });
    
    if(data.res !== "ID_NOT_FOUND_ERROR") {
      //console.log('success delete path');
      alert('Success: ID found, fountain deleted');
      window.location.href = '/'
    }  
    else {
      //console.log('There was an error...');
      alert('Error: This ID does not exist in database...');
    }
  }

  return (<>
  <div className='delete-container'>
    <div></div>
    <div>
      <form onSubmit={onSubmit} className="delete-form">
        <legend className="delete-legend">Remove Fountain</legend>

        <label htmlFor="id" className="delete-label"> Please type ID of fountain you want to delete </label>
        <input id="id" type="number" min="1" placeholder='ID: e.g. "10"' className="delete-input"  required/>

        <button type="submit" className="delete-submit-btn">Delete</button>
      </form>
    </div>
    <div></div>
  </div>
  </>);;
}