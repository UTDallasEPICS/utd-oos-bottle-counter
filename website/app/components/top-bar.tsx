/*
This component just contains code to display Project Partner Organization Name and App Name
*/

export default function TopBar() {
  return (<>
  <div className="top-bar">
    <img src="/media/header_logo.png" alt="not found" />
    <div>
      <p className="project-partner">UTD Office of Sustainability</p>
      <p className="project-title">Water Bottle Counter</p>
    </div>
  </div>
  </>);
}