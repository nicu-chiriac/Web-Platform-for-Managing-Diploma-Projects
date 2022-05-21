import React, { useContext } from 'react'
import { ProfessorsContext } from "../context/ProfessorsContext";
import ProfessorSearch from "../apis/ProfessorSearch";


const SearchTemeProfessors = () => {
  const { professors, setProfessors } = useContext(ProfessorsContext);

  const fetchData = async (searchValue) => {
    try {
      const response = await ProfessorSearch.get(`?param=${searchValue}`);
      setProfessors(response.data.data.professors);
      console.log(response.data.data.professors)
    } catch (error) {}
  };

  return (
    <div>
      <input 
        size={30}
        className="search" 
        placeholder="Cauta..." 
        onChange={(event) => fetchData(event.target.value)}
        >
      </input>
      <select>
        {professors && professors.map(professor => {
          return (
              <option id={professor.id}>
                <option>{`${professor.nume} ${professor.prenume}`}</option>
              </option>
          )
        })}
      </select>
    </div>
    
  )
}


export default SearchTemeProfessors;