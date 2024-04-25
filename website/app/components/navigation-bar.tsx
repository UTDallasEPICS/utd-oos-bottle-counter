import Link from 'next/link';

export default function NavBar() {
  return (<>
    <div className='nav-bar'>
      <div><Link href="/"> <p>Search</p> </Link></div>
      <div><Link href="/create"> <p>Create</p> </Link></div>
      <div><Link href="/delete"> <p>Delete</p> </Link></div>
      <div><Link href="/download"> <p>Download</p> </Link></div>

    </div>
  </>);
}