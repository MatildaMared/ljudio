import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import ErrorModal from '../modal/ErrorModal';
import { loginFetch } from '../services/authService';
import '../styles/signup.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    login(email, password);
  }

  async function login(email, password) {
    const obj = {
      email,
      password,
    };
    try {
      const data = await loginFetch(obj);
      if (data.success) {
        localStorage.setItem('token', data.token);
        history.push('/');
      } else {
        setShow(true);
        setErrorMessage(data.error);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="container">
      <h1>Log in</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__form-control">
          <label htmlFor="email" className="form__label">
            Email:{' '}
          </label>
          <input
            className="form__input"
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form__form-control">
          <label htmlFor="password" className="form__label">
            Password:{' '}
          </label>
          <input
            className="form__input"
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input className="form__btn" type="submit" value="Log in" />
        <p className="form__text">
          Don't have an account yet?
          <Link to="/signup" className="form__link">
            {' '}
            Click here{' '}
          </Link>
          to sign up!
        </p>
      </form>
      <ErrorModal title="Error" onClose={() => setShow(false)} show={show}>
        <p>{errorMessage}</p>
      </ErrorModal>
    </div>
  );
}

export default LoginPage;
