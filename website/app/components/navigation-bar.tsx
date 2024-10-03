/*
This component contains code for the navigation bar at the top of webpage.
It uses Next.js Link feature for navigation/routing.
*/
import Link from 'next/link';

export default function NavBar() {
  return (<>
    <div className='nav-bar'>
      <div></div>
      <div><Link href="/"> <p>Search</p> </Link></div>
      <div><Link href="/create"> <p>Create</p> </Link></div>
      <div><Link href="/delete"> <p>Delete</p> </Link></div>
      <div><Link href="/edit"> <p>Edit</p> </Link></div>
      <div><Link href="/download"> <p>Download</p> </Link></div>
      <div><Link href="/map"> <p>Map</p> </Link></div>
      <div></div>
    </div>
    <div className='text-3xl font-bold text-green-500'>Hello</div>
  </>);
}