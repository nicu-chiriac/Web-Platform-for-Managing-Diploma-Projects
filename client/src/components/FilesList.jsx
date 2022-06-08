import React, { useEffect, useContext, useState, useRef } from 'react';
import FilesFinder from '../apis/FilesFinder';
import { FilesContext } from '../context/FilesContext';
import TemeFinder from "../apis/TemeFinder";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import FileDownload from "js-file-download";
import { TiDelete } from 'react-icons/ti';
import { FcDownload } from 'react-icons/fc';
import Swal from 'sweetalert2';
import { fetchRestrictedInfo } from '../apis/AuthFinder';

const FilesList = () => {

  const { id } = useParams();

  const { files, setFiles } = useContext(FilesContext)

  const [fileName, setFileName] = useState();

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

  let isRestricted = useRef(false);

  const restrictedInfo = async () => {
    try {
      const request = await fetchRestrictedInfo()

      if (request.status === 200) {
        isRestricted.current = true;

      }

    } catch (error) {

    }
  }
  restrictedInfo();
  restrictedInfo();

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Esti sigur?',
      text: "Odată ștearsă înregistrarea nu va mai putea fi recuperată!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Da, șterge!'
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          TemeFinder.delete(`/${id}`);
          if (isRestricted.current === true) {
            setFiles(files.filter(file => {
              return file.id !== id
            }))
            Swal.fire(
              'Șters!',
              'Înregistrarea a fost ștearsă cu succes.',
              'info'
            )
          } else {
            Swal.fire({
              position: 'center',
              title: "Eșuat!",
              text: "Nu sunteți autorizat!",
              button: "Închide",
              allowOutsideClick: true
            })
          }
        } catch (error) {
          console.log(error)
        }
      }
    })
  }

  const updateButtonState = () => {
    setFileName(null)
  }

  const download = (e) => {
    e.preventDefault()
    Axios({
      url: `http://localhost:3001/api/download`,
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: "blob",
      data: { fileName }
    }).then((res) => {
      FileDownload(res.data, `${fileName}`)
    })
  }

  return (
    <div className='list-group'>
      <div className='lable-wrapper'>
        <table className='table table-hover table-default'>
          <thead>
            <tr>
              <th scope='col'>Fișiere încărcate</th>
              <th scope='col'>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {files && files.filter(f => f.id > 0).map(file => {
              return (
                <tr key={file.id}>
                  <td>{file.file_path.slice(64)}</td>
                  <td>
                    <button onClick={(e) => { setFileName(file.file_path.slice(64)); download(e); console.log(fileName); setFileName(file.file_path.slice(64)) }} className='btn btn-outline-light btn-sm'><FcDownload size="1.5em" /></button>
                    <button onClick={() => handleDelete(file.id)} className='btn btn-outline-danger btn-sm'><TiDelete size="1.5em" /></button>
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <td><b>Total fisiere încărcate : {files.filter(f => f.id > 0).length}</b></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default FilesList
