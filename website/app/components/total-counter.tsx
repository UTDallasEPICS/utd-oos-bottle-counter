/*
This component contains text to display the total bottle counter.
The prop it receives is from prismaFountains.tsx and is passed in the main page.tsx file.
The main page.tsx file actually contains the code for calculating the total number of bottles saved.
*/

export default function TotalCounter(props:any) {
  return (<>
  <div className="total-counter-box">
    <div className="total-counter">
      <p className="total-counter">Total Number of Water Bottles Saved:</p>
      <h1 style={{fontSize: "4em"}}>{props.counter.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
    </div>
  </div>
  </>);
}