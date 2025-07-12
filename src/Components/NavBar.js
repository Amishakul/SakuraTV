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
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        navigate("/error");
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate("/home");
      } else {
        dispatch(removeUser());
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="navbar bg-base-300 shadow-md px-6">
      <div className="flex-1 flex items-center">
        <a className="btn btn-ghost text-2xl font-bold text-pink-600 hover:text-pink-800 transition duration-300">
          🌸 Sakura TV
        </a>
      </div>

      {user && (
        <div className="flex items-center gap-4">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring ring-pink-300 ring-offset-base-100 ring-offset-2">
                <img
                  alt="User Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow-lg z-10"
            >
              <li>
                <a className="justify-between">
                  Profile <span className="badge badge-accent">New</span>
                </a>
              </li>
              <li><a>Connections</a></li>
              <li>
                <button onClick={handleSignOut} className="text-red-500 hover:text-red-700">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
