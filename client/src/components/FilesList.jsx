import React, { useEffect, useContext, useState } from 'react';
import FilesFinder from '../apis/FilesFinder';
import { FilesContext } from '../context/FilesContext';
import TemeFinder from "../apis/TemeFinder";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import FileDownload from "js-file-download";

const FilesList = () => {

  const { id } = useParams();

  const { files, setFiles } = useContext(FilesContext)

  const [idStudent, setIdStudent] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TemeFinder.get(`/${id}`);
        setIdStudent(response.data.data.teme.id_studenti);

        console.log(response.data.data.teme.id_studenti)

        if (response !== undefined) {
          const response2 = await FilesFinder.get(`/${response.data.data.teme.id_studenti}`);
          setFiles(response2.data.data.files);
          console.log(response2.data.data.files)
        }

      } catch (error) { }
    };

    fetchData();

  }, []);

  const download = (e) => {
    e.preventDefault()
    Axios({
      url: "http://localhost:3001/api/files/download",
      method: "GET",
      responseType: "blob"
    }).then((res) => {
      FileDownload(res.data, "downloaded.jpeg")
    })
  }

  return (
    <div>
      {files && files.filter(f => f.id > 0).map(file => {
        return (
          <div className="list-group" key={file.id}>
            <button
              type="button"
              className="list-group-item list-group-item-action list-group-item-primary"
            >
              {file.file_path.slice(64)}
            </button>
          </div>
        )
      })}
      <div>
        <button onClick={(e) => download(e)}>Download</button>
      </div>
    </div>
  )
}

export default FilesList
