'use client';

import { FormEvent, useEffect, useState } from 'react';
import { buildingsToCoordinates } from '@/app/utilities'; // Import buildingsToCoordinates from your utilities file
import './create-styles.css';

export default function CreateFountain() {
  // State to hold the list of buildings
  const [buildings, setBuildings] = useState<string[]>([]);

  // Fetch the building list from buildingsToCoordinates when the component mounts
  useEffect(() => {
    const fetchBuildings = () => {
      // Get building names (the keys from the buildingsToCoordinates map)
      const buildingNames = Array.from(buildingsToCoordinates.keys());
      setBuildings(buildingNames); // Set building names in state
    };

    fetchBuildings(); // Call the function to set the buildings from the map
  }, []);

  // Whenever the form is submitted, this function retrieves the data from the input boxes and sends it to the Create API
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const fountain = {
      building: (event.currentTarget.elements[0] as HTMLSelectElement).value, // Get selected building from dropdown
      description: (event.currentTarget.elements[1] as HTMLInputElement).value,
      bottleNum: parseInt((event.currentTarget.elements[2] as HTMLInputElement).value),
    };

    const res = await fetch('/api/webapp/create', {
      method: 'POST',
      body: JSON.stringify({ fountain }),
    });

    const data = await res.json();
    const displayNum = data.res.id;
    let binary = displayNum.toString(2);
    while (binary.length < 8) {
      binary = '0' + binary;
    }

    let returnString = '';
    for (let i = 0; i < binary.length; i++) {
      returnString = binary.charAt(i) === '1' ? 'On ' + returnString : 'Off ' + returnString;
    }

    const dipswitchValsLabel = document.getElementById('DipswitchVals');
    if (dipswitchValsLabel !== null) {
      dipswitchValsLabel.innerHTML = returnString;
    }

    alert('Fountain Created!');
    window.location.href = '/';
  }

  return (
    <>
      <div className="create-container">
        <dialog id="success">Fountain created successfully!</dialog>
        <div></div>
        <div>
          <form onSubmit={onSubmit} className="create-form">
            <legend className="create-legend">Add New Fountain</legend>

            {/* Building dropdown */}
            <label htmlFor="fbuilding" className="create-label">
              Select the building of the new fountain here
            </label>
            <select id="fbuilding" className="create-input" required>
              <option value="">-- Select a Building --</option>
              {buildings.map((building, index) => (
                <option key={index} value={building}>
                  {building}
                </option>
              ))}
            </select>

            <label htmlFor="flocation" className="create-label">
              Type the general location description of the new fountain here
              <div className="second-line-block">(e.g., Near the first floor elevator)</div>
            </label>
            <input id="flocation" type="text" placeholder="Fountain Description" className="create-input" required />

            <label htmlFor="fcounter" className="create-label">
              Type the number of water bottles saved (zero if unused)
            </label>
            <input id="fcounter" type="number" min="0" placeholder="Initial Counter" className="create-input" required />

            <div className="buttonbox">
              <button type="submit" className="create-submit-btn">Create</button>
            </div>
          </form>
        </div>
        <div></div>
        <div></div>
        <div>
          <p>Format For Device Dipswitch 1 to 8, Left to Right:</p>
          <p id="DipswitchVals"></p>
        </div>
      </div>
    </>
  );
}
