export default function TotalCounter(props:any) {
  return (<>
  <div className="total-counter-box">
    <p className="total-counter">Total Number of Water Bottles Saved: {props.counter}</p>
  </div>
  </>);
}
