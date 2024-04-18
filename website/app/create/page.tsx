'use client';
export default function CreateFountain() {
  return (<>
    <p>Fountain Creation Page</p>
    <input placeholder="Enter Name of Fountain"></input>
    <input placeholder='Enter current count on counter "if not zero"'></input>
    <button>Create</button>
    <p>Fountain "name here" is now in database!</p>
    <p>Here is the id of new fountain: </p>
  </>);
}