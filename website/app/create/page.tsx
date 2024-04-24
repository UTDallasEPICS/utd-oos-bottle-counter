'use client';
import { useNavigate } from "react-router-dom";
import { FormEvent } from 'react'
import './create-styles.css';

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
    // ...
    window.location.href = '/'  }

  return (<>
  <div className="create-container">
    <div></div>
    <div>
      <form onSubmit={onSubmit} className="create-form">
        <legend className="create-legend">Add New Fountain</legend>

        <label htmlFor="fname" className="create-label">
        Type the location name of the new fountain here <div className="second-line-block">(if there are multiple, type a #number following the name)</div>
        </label>
        <input id="fname" type="text" placeholder="Fountain Name"
        className="create-input"/>

        <label htmlFor="fcounter" className="create-label">
        Type the number of water bottles saved (zero if unused)
        </label>
        <input id="fcounter" type="text" placeholder="Initial Counter"
        className="create-input"/>
        <button type="submit" className="create-submit-btn">Submit</button>
      </form>
    </div>
    <div></div>
  </div>
    
  </>);
}