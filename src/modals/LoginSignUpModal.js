import React, { useState } from "react";
import ReactDom from "react-dom";

import { useMutation } from "@apollo/client";
import { ADD_USER, LOGIN_USER } from "../util/mutations";

import Auth from "../util/auth";

export default function LoginSignUpModal({ open, children, onClose }) {
  const [atLoginForm, setAtLoginForm] = useState(true);
  const [loginError, setLoginError] = useState(null);
  const [signUpError, setSignUpError] = useState(null);
  const [validated] = useState(false);
  const [showPassword, setShowPassword] = useState('password')
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });
  const [signUpFormData, setSignUpFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [addUser, { error, data }] = useMutation(ADD_USER);
  const [login, { error: error2, data: data2 }] = useMutation(LOGIN_USER);

  const handleShowPassword =() => {
    if (showPassword==='password'){
      setShowPassword('text')
    } else {
      setShowPassword('password')
    }
  }
  
  const handleSignupChange = (event) => {
    const { name, value } = event.target;
    setSignUpFormData({ ...signUpFormData, [name]: value });
  };
  
  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };
  
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    // check if form has everything filled out
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    //TODO: INSERT THE MUTATION HERE
    try {
      const { data } = await login({
        variables: {
          username: loginFormData.userLogin,
          password: loginFormData.passwordLogin,
        },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
      setLoginError(e.message);
      setLoginFormData({
        userLogin: "",
        passwordLogin: "",
      });
    }
    setLoginFormData({
      userLogin: "",
      passwordLogin: "",
    });
  };
  
  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    // check if form has everything
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (signUpFormData.password !== signUpFormData.password2) {
      event.preventDefault();
      event.stopPropagation();
      setSignUpError("Your passwords did not match.");
      return setSignUpFormData({
        username: "",
        email: "",
        password: "",
        password2: "",
      });
    }
    try {
      const { data } = await addUser({
        variables: {
          username: signUpFormData.username,
          email: signUpFormData.email,
          password: signUpFormData.password,
        },
      });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
      setSignUpError(e.message);
    }
    setSignUpFormData({
      username: "",
      email: "",
      password: "",
      password2: "",
    });
  };
  
  const logo = process.env.PUBLIC_URL + "/dokkanIcons/logo.png";

  if (!open) return null;
  
  return ReactDom.createPortal(
    <>
      <div 
      onClick={onClose}
      className="fixed top-0 left-0 right-0 bottom-0 bg-black/[.8] z-[1000]" />
      <div className="w-3/4 lg:w-1/3 p-2 lg:p-10 rounded-lg shadow-lg fixed top-[20%] right-[13%] lg:top-[15%] lg:right-[33.5%] bg-white z-[1000]">
        <div className="flex flex-col items-center">
          <img src={logo} className="h-[5.5vh] logo-md:h-[6vh] md:h-[7.2vh] p-2 mb-2 border-b-4 border-black" />
          <div className="flex justify-around w-full">
            <button className={`text-xl lg:text-4xl font-bold pb-2 ${atLoginForm ?'text-blue-500 border-b-2 border-blue-500':'text-gray-300'}`} onClick={() => [setAtLoginForm(true), setShowPassword('password')]}>
              Login
            </button>
            <button className={`text-xl lg:text-4xl font-bold pb-2 ${!atLoginForm ?'text-blue-500 border-b-2 border-blue-500':'text-gray-300'}`} onClick={() => [setAtLoginForm(false), setShowPassword('password')]}>
              Sign-Up
            </button>
          </div>
        </div>
        <div className="flex flex-col pt-2">
          {atLoginForm ? (
            <form
              noValidate
              validated={validated}
              onSubmit={handleLoginSubmit}
              className="w-full p-2"
              onFocus={() => setLoginError(null)}
            >
              <input
                onChange={handleLoginChange}
                className="flex w-full h-12 p-2 mb-4 bg-gray-200 text-2xl border border-gray-400 rounded-lg border-black text-start items-center shadow-md text-lg"
                type="text"
                placeholder="username"
                name="userLogin"
                value={loginFormData.userLogin}
              ></input>
              <div className="flex items-center">
                <input
                  onChange={handleLoginChange}
                  className="flex w-full h-12 p-2 bg-gray-200 text-2xl border border-gray-400 rounded-lg border-black text-start items-center shadow-md text-lg hover:"
                  type={showPassword}
                  placeholder="password"
                  name="passwordLogin"
                  value={loginFormData.passwordLogin}
                ></input>
                <img 
                onClick={() => handleShowPassword()}
                className="w-8 lg:w-10 ml-2 lg:ml-4 cursor-pointer"
                src= {process.env.PUBLIC_URL + '/dokkanIcons/show-password.png'}
                />
              </div>
                  {loginError && <p className="w-full pt-4 text-center text-lg text-red-500 font-bold">{loginError}</p>}
              <button
                disabled={
                  !(loginFormData.userLogin && loginFormData.passwordLogin)
                }
                type="submit"
                variant="success"
                className="inline-block px-7 py-3 mt-4 bg-orange-400 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-orange-700 hover:shadow-lg focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
              >
                Login
              </button>
            </form>
          ) : (
            <form
              noValidate
              validated={validated}
              onSubmit={handleSignUpSubmit}
              className="w-full p-2"
              onFocus={() => setSignUpError(null)}
            >
              <input
                onChange={handleSignupChange}
                className="flex w-full h-12 p-2 mb-4 bg-gray-200 text-2xl border border-gray-400 rounded-lg border-black text-start items-center shadow-md text-lg"
                type="text"
                placeholder="username"
                name="username"
                value={signUpFormData.username}
              ></input>
              <input
                onChange={handleSignupChange}
                className="flex w-full h-12 p-2 mb-4 bg-gray-200 text-2xl border border-gray-400 rounded-lg border-black text-start items-center shadow-md text-lg"
                type="text"
                placeholder="email"
                name="email"
                value={signUpFormData.email}
              ></input>
              <div className="flex items-center">
                <input
                  onChange={handleSignupChange}
                  className="flex w-full h-12 p-2 bg-gray-200 text-2xl border border-gray-400 rounded-lg border-black text-start items-center shadow-md text-lg"
                  type={showPassword}
                  placeholder="password"
                  name="password"
                  value={signUpFormData.password}
                ></input>
                <img 
                  onClick={() => handleShowPassword()}
                  className="w-8 lg:w-10 ml-2 lg:ml-4 cursor-pointer"
                  src= {process.env.PUBLIC_URL + '/dokkanIcons/show-password.png'}
                />
              </div>
              <input
                onChange={handleSignupChange}
                className="flex w-full h-12 p-2 my-4 bg-gray-200 text-2xl border border-gray-400 rounded-lg border-black text-start items-center shadow-md text-lg"
                type={showPassword}
                placeholder="write the same password"
                name="password2"
                value={signUpFormData.password2}
              ></input>
              <p className="ml-1 mb-4 text-sm text-gray-400">*password must be eight characters long with at least one uppercase letter, one lowercase letter, one number and one special character*</p>
              {signUpError && <p className="w-full pb-4 text-center text-lg text-red-500 font-bold">{signUpError}</p>}
              <button
                disabled={
                  !(
                    signUpFormData.username &&
                    signUpFormData.email &&
                    signUpFormData.password &&
                    signUpFormData.password2
                  )
                }
                type="submit"
                variant="success"
                className="disabled:bg-gray-500 inline-block px-7 py-3 bg-orange-400 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-orange-700 hover:shadow-lg focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
              >
                Sign up
              </button>
            </form>
          )}
        </div>
      </div>
    </>,
    document.getElementById("LoginPortal")
  );
}
