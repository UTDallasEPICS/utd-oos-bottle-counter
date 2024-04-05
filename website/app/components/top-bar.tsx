import Title from './title';
import SearchBar from './search-bar';

export default function TopBar() {
  return (<>
  <div className="top-bar">
    <Title/>
    <SearchBar/>
  </div>
  </>);
}