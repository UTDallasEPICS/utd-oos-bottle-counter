'use client';

import { FormEvent, useEffect, useState } from 'react';
import { buildingsToCoordinates } from '@/app/utilities';
import './create-styles.css';

export default function CreateFountain() {
  // State to hold the list of buildings
  const [buildings, setBuildings] = useState<string[]>([]);

  // Fetch the building list from buildingsToCoordinates when the component mounts
  useEffect(() => {
    if (buildingsToCoordinates) {
      const buildingNames = Array.from(buildingsToCoordinates.keys());
      setBuildings(buildingNames);
    } else {
      console.error("buildingsToCoordinates is undefined");
    }
  }, []);

  // Handle fountain creation form submission
  async function onSubmitFountain(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Retrieve form data for fountain creation
    const building = (event.currentTarget.elements[0] as HTMLSelectElement).value;
    const description = (event.currentTarget.elements[1] as HTMLInputElement).value;
    const bottleNum = parseInt((event.currentTarget.elements[2] as HTMLInputElement).value);

    // Construct fountain data object
    const fountain = { building, description, bottleNum };

    try {
      // Send POST request to create fountain
      const res = await fetch('/api/webapp/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fountain }),
      });

      if (!res.ok) throw new Error("Failed to create fountain");

      // Parse response
      const data = await res.json();
      if (!data?.res?.id) throw new Error("Invalid response from API");

      // Generate dipswitch binary display
      const binaryDisplay = createBinaryDisplay(data.res.id);

      // Display dipswitch values
      const dipswitchValsLabel = document.getElementById('DipswitchVals');
      if (dipswitchValsLabel) dipswitchValsLabel.innerHTML = binaryDisplay;

      alert('Fountain Created!');
      window.location.href = '/';
    } catch (error) {
      console.error("Error creating fountain:", error);
      alert('Failed to create fountain. Please try again.');
    }
  }

  // Handle building creation form submission
  async function onSubmitBuilding(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = (event.currentTarget.elements[0] as HTMLInputElement).value;
    const location = (event.currentTarget.elements[1] as HTMLInputElement).value;

    const building = { name, location };

    try {
      const res = await fetch('/api/webapp/create-building', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ building }),
      });

      if (!res.ok) throw new Error("Failed to create building");

      alert('Building Created!');
      window.location.href = '/';
    } catch (error) {
      console.error("Error creating building:", error);
      alert('Failed to create building. Please try again.');
    }
  }

  // Helper function to generate dipswitch binary display
  function createBinaryDisplay(id: number) {
    let binary = id.toString(2).padStart(8, '0');
    return Array.from(binary)
      .map((bit) => (bit === '1' ? 'On' : 'Off'))
      .join(' ');
  }

  return (
    <div className="create-container">
      {/* Fountain Creation Form */}
      <form onSubmit={onSubmitFountain} className="create-form">
        <legend className="create-legend">Add New Fountain</legend>
        <label htmlFor="fbuilding" className="create-label">Select the building of the new fountain here</label>
        <select id="fbuilding" className="create-input" required>
          <option value="">-- Select a Building --</option>
          {buildings.map((building, index) => (
            <option key={index} value={building}>{building}</option>
          ))}
        </select>

        <label htmlFor="flocation" className="create-label">Type the general location description</label>
        <input id="flocation" type="text" placeholder="Fountain Description" className="create-input" required />

        <label htmlFor="fcounter" className="create-label">Type the number of water bottles saved</label>
        <input id="fcounter" type="number" min="0" placeholder="Initial Counter" className="create-input" required />

        <div className="buttonbox">
          <button type="submit" className="create-submit-btn">Create Fountain</button>
        </div>
      </form>

      {/* Building Creation Form */}
      <form onSubmit={onSubmitBuilding} className="create-form">
        <legend className="create-legend">Add New Building</legend>
        <label htmlFor="bname" className="create-label">Enter the building name</label>
        <input id="bname" type="text" placeholder="Building Name" className="create-input" required />

        <label htmlFor="blocation" className="create-label">Enter the building's general location</label>
        <input id="blocation" type="text" placeholder="Building Location" className="create-input" required />

        <div className="buttonbox">
          <button type="submit" className="create-submit-btn">Create Building</button>
        </div>
      </form>

      {/* Dipswitch Display */}
      <div>
        <p>Format For Device Dipswitch 1 to 8, Left to Right:</p>
        <p id="DipswitchVals"></p>
      </div>
    </div>
  );
}
