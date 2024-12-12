'use client';

import { FormEvent, useEffect, useState } from 'react';
import { buildingsToCoordinates } from '@/app/utilities';
import './delete-styles.css';

export default function DeleteFountain() {

  // Handle fountain deletion form submission
  async function onDeleteFountain(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const id = (event.currentTarget.elements[0] as HTMLSelectElement).value;

    console.log("id is ", id)

    try {
      // Send POST request to create fountain
      const res = await fetch(`/api/webapp/fountains/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw new Error("Failed to delete fountain");

      // Parse response
      const data = await res.json();
      if (!data?.res?.id) throw new Error("Invalid response from API");

      // Generate dipswitch binary display
      // const binaryDisplay = createBinaryDisplay(data.res.id);

      // // Display dipswitch values
      // const dipswitchValsLabel = document.getElementById('DipswitchVals');
      // if (dipswitchValsLabel) dipswitchValsLabel.innerHTML = binaryDisplay;

      alert('Fountain Deleted!');
      window.location.href = '/';
    } catch (error) {
      console.error("Error deleting fountain:", error);
      alert('Failed to delete fountain. Please try again.');
    }
  }

  // Handle building deletion form submission
  async function onDeleteBuilding(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const id = (event.currentTarget.elements[0] as HTMLInputElement).value;

    console.log("building id is ", id)

    try {
      const res = await fetch(`/api/webapp/buildings/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw new Error("Failed to delete building");

      alert('Building deleted!');
      window.location.href = '/';
    } catch (error) {
      console.error("Error deleting building:", error);
      alert('Failed to delete building. Please try again.');
    }
  }

  return (
    <div className="delete-container">
      {/* Fountain Creation Form */}
      <form onSubmit={onDeleteFountain} className="delete-form">
        <legend className="delete-legend">Delete Fountain</legend>
        <label htmlFor="fbuilding" className="delete-label">Enter Fountain ID</label>
          <input id="bname" type="text" placeholder="Fountain ID" className="delete-input" required />


        <div className="buttonbox">
          <button type="submit" className="delete-submit-btn">Delete Fountain</button>
        </div>
      </form>

      {/* Building Creation Form */}
      <form onSubmit={onDeleteBuilding} className="delete-form">
        <legend className="delete-legend">Delete Building</legend>
        <label htmlFor="bname" className="delete-label">Enter Building ID</label>
        <input id="bname" type="text" placeholder="Building ID" className="delete-input" required />

  

        <div className="buttonbox">
          <button type="submit" className="delete-submit-btn">Delete Building</button>
        </div>
      </form>
    </div>
  );
}
