import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import '../../styles/signup.css';

function SignupPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    passwordIdentical(password, confirmPassword);
  };

  const passwordIdentical = (pass1, pass2) => {
    if (pass1 !== pass2) {
      console.log(
        `Password don't match 💥 First: '${pass1}', Second: '${pass2}'`
      );
    } else if (pass1 === pass2) {
      console.log(`It's a match!! 😀 ${pass1} = ${pass2}`);
      createAccount(firstName, lastName, email, password);
    }
  };

  async function createAccount(firstName, lastName, email, password) {
    try {
      const res = await fetch('http://localhost:8000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('token', data.user.token);
        history.push('/');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="controlling-form">
          <label htmlFor="text">First name: </label>
          <input
            type="text"
            className="firstName"
            name="firstName"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="controlling-form">
          <label htmlFor="text">Last name: </label>
          <input
            type="text"
            className="lastName"
            name="lastName"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="controlling-form">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            className="email"
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="controlling-form">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            className="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="controlling-form">
          <label htmlFor="password">Confirm password: </label>
          <input
            type="password"
            name="password"
            className="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <input type="submit" className="form__btn" value="Create account" />

        <p className="form__text">
          Already have an account?{' '}
          <Link to="/login" className="form__link">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignupPage;
