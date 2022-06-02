import React, { useContext } from 'react'
import { TemeContext } from "../context/TemeContext";
import TemaSearch from "../apis/TemaSearch";
import { AiOutlineFileSearch } from 'react-icons/ai';
import './SearchBar.css';

const SearchBarTeme = () => {
  const { setTeme } = useContext(TemeContext);

  const fetchData = async (searchValue) => {
    try {
      const response = await TemaSearch.get(`?param=${searchValue}`);
      setTeme(response.data.data.teme);
    } catch (error) { }
  };

  return (
    <div className="inputContainer">
      <AiOutlineFileSearch size='1.8em' className="inputIcon" />
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


export default SearchBarTeme;