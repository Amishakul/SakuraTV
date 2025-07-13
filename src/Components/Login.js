import React, { useRef, useState } from 'react';
import { checkValidData } from '../Utils/VaildData';
import { auth } from "../Utils/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser } from '../Utils/userSlice';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const name = useRef(null);
  const email = useRef(null);
  const pass = useRef(null);

  const handleLogin = () => {
    const message = checkValidData(email.current.value, pass.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, email.current.value, pass.current.value)
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name.current.value,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName }));
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, pass.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className="flex justify-center items-start mt-32">
      <div className="card bg-base-300 w-96 shadow-md border border-base-200">
        <div className="card-body space-y-4">
          <h2 className="card-title justify-center text-2xl font-bold">
            {isSignInForm ? "Login" : "Sign Up"}
          </h2>

          <div className="space-y-3">
            {!isSignInForm && (
              <div>
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  ref={name}
                  className="input input-bordered w-full"
                  placeholder="Enter your name"
                />
              </div>
            )}

            <div>
              <label className="label">
                <span className="label-text">Email ID</span>
              </label>
              <input
                type="text"
                ref={email}
                className="input input-bordered w-full"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                ref={pass}
                className="input input-bordered w-full"
                placeholder="Enter your password"
              />
            </div>

            {errorMessage && (
              <p className="text-red-500 font-semibold text-sm pt-2">{errorMessage}</p>
            )}
          </div>

          <div className="card-actions flex flex-col items-center space-y-2">
            <button className="btn btn-primary w-full" onClick={handleLogin}>
              {isSignInForm ? "Login" : "Sign Up"}
            </button>
            <p
              className="text-sm text-blue-500 hover:underline cursor-pointer"
              onClick={toggleSignInForm}
            >
              {isSignInForm
                ? "New to Sakura TV? Sign Up Here"
                : "Already registered? Sign in Now"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
