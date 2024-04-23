'use client';
import { FormEvent } from 'react'

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
  }

  return (<>
    <form onSubmit={onSubmit}>
      <legend>Add New Fountain</legend>

      <label htmlFor="fname">
      Type the location name of the new fountain here (if there are multiple, type a #number following the name)
      </label>
      <input id="fname" type="text" placeholder="Fountain Name"/>

      <label htmlFor="fcounter">
      Type the number of water bottles saved (zero if unused)
      </label>
      <input id="fcounter" type="text" placeholder="Initial Counter"/>
      <button type="submit">Submit</button>
    </form>
  </>);
}