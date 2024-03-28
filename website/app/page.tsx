import { getItem } from './utils'

//export const revalidate = 3600 // revalidate the data at most every hour
 
export default async function Page() {
  const item = await getItem()

  return (
    <main>
      <div>
        { item }
      </div>
    </main>
    )
}

/* //Front-End
import './styles.css'

export default function Page() {

  return (<>
    <InfoBox />
    <DropdownMenu/>
            
  </>);
}

function Title() {
  return <p className="project-title">Water Bottle Counter</p>;
}

function SelectedLocation({location}) {
  return (<>
  <p className="current-location">Current Location: {location}</p>
  <p className="global-counter">1587029</p>
  </>);
}

function InfoBox() {
  return (<>
  <div className="dropdown-middle-placement">
    <div></div>
    <div className="dropdown-grid">
      <Title />
      <SelectedLocation location="All Locations"/>
    </div>
    <div></div>
  </div>
    
  </>);
}

function DropdownMenu() {
  return (
  <>
    <div className="dropdown-middle-placement">
      <div></div>
      <div className="dropdown-grid">
        <div>
        <label htmlFor="station-select" className="dropdown-title">Select Refill Station Location:</label>
        </div>

        <div className="dropdown-grid2">
          <div>
            <select className="dropdown-menu" name="stations" id="station-select">
              <option value="all">All Stations</option>
              <option value="ECSN-1">ECS North #1</option>
              <option value="ECSN-2">ECS North #2</option>
              <option value="ECSW">ECS West</option>
              <option value="GR">Green Hall</option>
              <option value="MC">McDermott Library</option>
              <option value="SU">Student Union</option>
            </select>
          </div>
        
          <div>
            <button className="js-selector-button">Get Location</button>
          </div>

        </div>
        
      </div>
      <div></div>
    </div>
  </>
  );
}

*/


