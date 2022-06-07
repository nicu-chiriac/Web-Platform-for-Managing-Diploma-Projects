import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { TemeContext } from "../context/TemeContext";
import TemeFinder from "../apis/TemeFinder";
import StudentFinder from "../apis/StudentFinder";


const UploadTema = (props) => {

  const { id } = useParams();
  const { teme } = useContext(TemeContext);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState();
  const [file, setFile] = useState(null);

  const [idStudent, setIdStudent] = useState();

  const [numeTema, setNumeTema] = useState();
  const [student, setStudent] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await TemeFinder.get(`/${id}`);
      const response2 = await StudentFinder.get(`/fullname/${response.data.data.teme.id_studenti}`);

      setNumeTema(response.data.data.teme.denumire_descriere_tema);

      setIdStudent(response.data.data.teme.id_studenti);

      setStudent(response2.data.data.studenti.fullname_s);

      if (response2.data.data.studenti.fullname_s.length > 1) {
        setLoading(true);
      }
    };

    fetchData();

  }, []);

  const onFormSubmit = e => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", name);
    data.append("file", file);
    data.append("id_student", idStudent)

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    axios.post('http://localhost:3001/api/upload', data, config)
      .then((response) => {
        alert("Imagine incarcata cu succes!")
      }).catch((err) => {
        console.log('err', err)
      })
  };

  const onInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <h3>Zona de încărcare a fișierelor pentru tema</h3>
      <h5>{`${numeTema}`}</h5>
      <br></br>
      {loading ? (
        <h3>Student <b>{`${student}`}</b></h3>
      ) : (
        <h3>Nu există student atribuit acestei teme</h3>
      )}
      <br></br>
      {!loading ? (
        <h3>Nu se pot încărca fișiere întrucât nu există un student alocat</h3>
      ) : (
        <form onSubmit={onFormSubmit}>
          <div className='flex'>
            <label htmlFor="name">Nume</label>
            <input
              type="text"
              id="name"
              onChange={event => {
                const { value } = event.target;
                setName(value);
              }}
            />
          </div>
          <div className='flex'>
            <label htmlFor="file">File</label>
            <input
              type="file"
              id='file'
              name='file'
              onChange={onInputChange}
            />
          </div>
          <button type="submit">Upload</button>
        </form>
      )}
    </div>
  );
};

export default UploadTema