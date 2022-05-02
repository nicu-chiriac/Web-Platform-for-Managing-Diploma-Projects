import React, { useContext } from 'react'
import { StudentiContext } from "../context/StudentiContext";
import StudentSearch from "../apis/StudentSearch";
import { MdPersonSearch } from 'react-icons/md';
import './SearchBar.css';

const SearchBar = () => {
  const {setStudenti} = useContext(StudentiContext);

  const fetchData = async (searchValue) => {
    try {
      const response = await StudentSearch.get(`?param=${searchValue}`);
      setStudenti(response.data.data.studenti);
    } catch (error) {}
  };

  return (
    <div className ="inputContainer">
      <MdPersonSearch size='1.8em' className="inputIcon" />
      <input 
        size={30}
        className="search" 
        placeholder="Cauta..." 
        onChange={(event) => fetchData(event.target.value)}
        >
      </input>
    </div>
  )
}


export default SearchBar;
