import React, { useState, useContext } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import ErrorModal from '../modals/ErrorModal';
import { loginFetch } from '../services/authService';
import { UserContext } from '../context/UserContext';

function LoginForm() {
  const [userContext, updateUserContext] = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const location = useLocation();
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
        updateUserContext({
          user: data.user,
          isAuthenticated: true,
        });
        if (location.pathname === '/login') {
          history.push('/');
        }
      } else {
        setShow(true);
        setErrorMessage(data.error);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className="loginpage">
      <h1 className="loginpage__logo">Ljudio</h1>
      <h2 className="loginpage__heading">Log in</h2>
      <form className="loginpage__form" onSubmit={handleSubmit}>
        <div className="loginpage__form-control">
          <input
            className="loginpage__input"
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email" className="loginpage__label">
            Email
          </label>
        </div>
        <div className="loginpage__form-control">
          <input
            className="loginpage__input"
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password" className="loginpage__label">
            Password
          </label>
        </div>
        <input className="loginpage__btn" type="submit" value="Log in" />
      </form>
      <ErrorModal title="Error" onClose={() => setShow(false)} show={show}>
        <p>{errorMessage}</p>
      </ErrorModal>
    </section>
  );
}

export default LoginForm;
