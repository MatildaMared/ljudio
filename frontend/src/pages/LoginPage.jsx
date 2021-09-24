import React, { useState, useRef } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

function LoginPage() {
  const [activeComponent, setActiveComponent] = useState('login');
  const signupBtn = useRef();
  const loginBtn = useRef();

  return (
    <>
      {activeComponent === 'login' ? (
        <>
          <LoginForm />
          <p className="loginpage__text">
            Don't have an account yet?
            <button
              className="loginpage__link"
              ref={signupBtn}
              onClick={() => {
                setActiveComponent('signup');
                signupBtn.current.blur();
              }}
            >
              Click here
            </button>
            to sign up!
          </p>
        </>
      ) : (
        <>
          <SignupForm />
          <p className="loginpage__text">
            Already have an account?
            <button
              className="loginpage__link"
              ref={loginBtn}
              onClick={() => {
                setActiveComponent('login');
                loginBtn.current.blur();
              }}
            >
              Click here
            </button>
            to log in!
          </p>
        </>
      )}
    </>
  );
}

export default LoginPage;
