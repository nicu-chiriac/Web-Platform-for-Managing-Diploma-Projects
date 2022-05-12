import React, { useContext } from 'react'
import { ProfessorsContext } from "../context/ProfessorsContext";
import ProfessorSearch from "../apis/ProfessorSearch";
import { MdPersonSearch } from 'react-icons/md';
import './SearchBar.css';

const SearchBarProfessors = () => {
  const {setProfessors} = useContext(ProfessorsContext);

  const fetchData = async (searchValue) => {
    try {
      const response = await ProfessorSearch.get(`?param=${searchValue}`);
      setProfessors(response.data.data.professors);
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


export default SearchBarProfessors;
