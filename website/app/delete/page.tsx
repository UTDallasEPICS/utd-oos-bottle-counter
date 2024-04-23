'use client';
import { FormEvent } from 'react';

export default function DeleteFountain() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
 
    //const formData = new FormData(event.currentTarget.id);
    console.log((event.currentTarget.elements[0] as HTMLInputElement).value);

    const fountain = ({
      id: parseInt( (event.currentTarget.elements[0] as HTMLInputElement).value ),
    });
    
    const res = await fetch('/api/delete', {
      method: 'POST',
      body: JSON.stringify({fountain: fountain}),
    });

    // Handle response if necessary
    const data = await res.json()
    // ...
    window.location.href = '/'
  }

  return (<>
    <form onSubmit={onSubmit}>
      <legend>Remove Fountain</legend>

      <label htmlFor="id"> Please type ID of fountain you want to delete </label>
      <input id="id" type="text" placeholder='ID: e.g. "10"'/>

      <button type="submit">Submit</button>
    </form>
  </>);;
}