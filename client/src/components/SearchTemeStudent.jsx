import React, { useContext } from 'react'
import { StudentiContext } from "../context/StudentiContext";
import StudentSearch from "../apis/StudentSearch";
import './../components/styles/SearchTemeStudent.css';

const SearchTemeStudent = () => {
  const { studenti, setStudenti } = useContext(StudentiContext);

  const fetchData = async (searchValue) => {
    try {
      const response = await StudentSearch.get(`?param=${searchValue}`);
      setStudenti(response.data.data.studenti);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
      <div className ="inputContainer">
        <input 
          size={30}
          className="search" 
          placeholder="Cauta..." 
          onChange={(event) => fetchData(event.target.value)}
          >
        </input>
      </div>
      <select>
        {studenti && studenti.map(student => {
          return (
              <option id={student.id}>
                <option>{`${student.nume} ${student.prenume}`}</option>
              </option>
          )
        })}
      </select>
    </div>
   
  )
}

export default SearchTemeStudent