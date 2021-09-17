import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import ErrorModal from '../modals/ErrorModal';
import { loginFetch } from '../services/authService';
import '../styles/signup.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  	//Show or hide modal that displays an error message when user typed something wrong
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
    <section className="login">
      <h1 className="login__logo">Ljudio</h1>
      <h2 className="login__heading">Log in</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__form-control">
          <input
            className="login__input"
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email" className="login__label">
            Email
          </label>
        </div>
        <div className="login__form-control">
          <input
            className="login__input"
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password" className="login__label">
            Password
          </label>
        </div>
        <input className="login__btn" type="submit" value="Log in" />
        <p className="login__text">
          Don't have an account yet?
          <Link to="/signup" className="login__link">
            Click here
          </Link>
          to sign up!
        </p>
      </form>
      <ErrorModal title="Error" onClose={() => setShow(false)} show={show}>
        <p>{errorMessage}</p>
      </ErrorModal>
    </section>
  );
}

export default LoginPage;
