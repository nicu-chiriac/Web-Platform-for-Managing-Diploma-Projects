import React, { useEffect, useState } from 'react';
import { FaFileCsv } from 'react-icons/fa';
import { CSVLink } from "react-csv";
import StudentFinder from '../apis/StudentFinder';


function ExportCSVStudenti() {

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await StudentFinder.get("/");
        setData(response.data.data.studenti);
        setLoading(true);
        console.log(response.data.data.studenti);

      } catch (error) { }
    };

    fetchData()

  }, []);


  const headers = [
    { label: "ID", key: 'id' },
    { label: "Nume", key: "nume" },
    { label: "Preume", key: "prenume" },
    { label: "Email", key: "email" },
    { label: "Emal institutional", key: "email_institutional" },
    { label: "An inscriere", key: "an_inscriere" },
    { label: "An curent", key: "an_curent_student" },
    { label: "Specializare", key: "specializare" },
    { label: "Grupa", key: "grupa" },
  ]

  return (
    <div>
      {loading ? (
        <CSVLink
          data={data} headers={headers} separator={","} enclosingCharacter={`"`} filename={"csvStudenti.csv"}
          className="btn btn-success"
        ><FaFileCsv size="1.8em" /> Downlaod</CSVLink>
      ) : (<div>Loading...</div>)
      }
    </div>
  )
}

export default ExportCSVStudenti
