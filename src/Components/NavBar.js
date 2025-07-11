import React, { useEffect } from 'react';
import { auth } from "../Utils/Firebase";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../Utils/userSlice';

const NavBar = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  const handleSignOut = () => {
    
    signOut(auth).then(() => {
    // Sign-out successful.
    }).catch((error) => {
    // An error happened.
        navigate("/error");
    });
  }

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid, email, displayName} = user;

        // dispatch an action
        dispatch(addUser({uid: uid, email: email, displayName: displayName}));
        navigate("/home");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("login");
      }
    });

    return () => unsubscribe();

  }, []);

  return (
    <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">Sakura TV</a>
  </div>
  { user && (
    <div className="flex gap-2">
    <div className="dropdown dropdown-end mx-5">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" /> 
        </div>
      </div>
      
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Connections</a></li>
        <li>
          <button onClick={handleSignOut}>Logout</button>
        </li>
      </ul>
    </div>
  </div>
  )}
</div>
  )
}

export default NavBar
