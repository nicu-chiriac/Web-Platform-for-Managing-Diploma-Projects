import { useState } from 'react';
import { onLogin } from '../../apis/AuthFinder';
import { useDispatch } from 'react-redux';
import { authenticateUser } from '../../redux/slices/authSlice';
import './../../components/styles/auth.css'
import { BsPersonFill } from 'react-icons/bs';
import { RiShieldKeyholeFill } from 'react-icons/ri';
import Swal from 'sweetalert2';


const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState(false)

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const dispatch = useDispatch()
  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      await onLogin(values)
      dispatch(authenticateUser())

      localStorage.setItem('isAuth', 'true')
      Swal.fire({
        position: 'bottom-start',
        title: "Autentificare realizată cu succes!",
        button: "OK!",
        timer: 2500,
        timerProgressBar: true,
        allowOutsideClick: true
      });
      localStorage.setItem('email', values.email)
    } catch (error) {
      console.log(error.response.data.errors[0].msg)
      setError(error.response.data.errors[0].msg)
    }
  }

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)} className='container'>
        <h1 className='authHeader'>Login</h1>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Adresă de email
          </label>
          <div className='input-wrapper'>
            <BsPersonFill size='1.5em' className='icon' />
            <input
              onChange={(e) => onChange(e)}
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={values.email}
              placeholder='test@gmail.com'
              required
            />
          </div>
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Parolă
          </label>
          <div className='input-wrapper'>
            <RiShieldKeyholeFill size='1.5em' className='icon' />
            <input
              onChange={(e) => onChange(e)}
              type='password'
              value={values.password}
              className='form-control'
              id='password'
              name='password'
              placeholder='parolă'
              required
            />
          </div>
        </div>

        <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>
        <div className='centerize'>
          <button type='submit' className='submitButton'>
            Submit
          </button>
        </div>

      </form>
    </div>
  )
}

export default Login