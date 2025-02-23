import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [fname, setFname] = useState("");
	const [lname, setLname] = useState("");
	const [uname, setUname] = useState("");
  
	const handleRegister = async (e) => {
	  e.preventDefault();
	  try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		const user = userCredential.user;
		if (user) {
		  await setDoc(doc(db, "Users", user.uid), {
			email: user.email,
			uname,
			fname,
			lname,
		  });
		}
		toast.success("User Registered Successfully!", { position: "top-center" });
		window.location.href = "/Home";
	  } catch (error) {
		toast.error(error.message, { position: "bottom-center" });
	  }
	};
  
	return (
	  <div className="flex justify-center items-center min-h-screen w-screen bg-[url('/assets/login-bg.png')] bg-violet-400 p-4">
		<div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-5xl h-auto md:h-[80vh]">
		  
  
		  {/* Form Section */}
		  <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start p-6 md:p-10">
			<h1 className="text-3xl font-bold text-center md:text-left">Register</h1>
			<form className="mt-6 space-y-4 w-full max-w-md" onSubmit={handleRegister}>
			  <input
				type="text"
				placeholder="First Name"
				className="w-full border border-gray-300 rounded-lg px-3 py-2"
				onChange={(e) => setFname(e.target.value)}
				required
			  />
			  <input
				type="text"
				placeholder="Last Name"
				className="w-full border border-gray-300 rounded-lg px-3 py-2"
				onChange={(e) => setLname(e.target.value)}
			  />
			  <input
				type="text"
				placeholder="User Name"
				className="w-full border border-gray-300 rounded-lg px-3 py-2"
				onChange={(e) => setUname(e.target.value)}
				required
			  />
			  <input
				type="email"
				placeholder="Email"
				className="w-full border border-gray-300 rounded-lg px-3 py-2"
				onChange={(e) => setEmail(e.target.value)}
				required
			  />
			  <input
				type="password"
				placeholder="Password"
				className="w-full border border-gray-300 rounded-lg px-3 py-2"
				onChange={(e) => setPassword(e.target.value)}
				required
			  />
			  <button
				type="submit"
				className="w-full bg-violet-500 text-white font-semibold rounded-lg px-3 py-2 cursor-pointer hover:bg-violet-600 transition"
			  >
				Register
			  </button>
			  <div className="text-center md:text-left">
				<span className="text-gray-700">Already have an account? </span>
				<Link to="/LogIn" className="text-blue-500 hover:underline">
				  Log In
				</Link>
			  </div>
			</form>
		  </div>

		  {/* Image Section */}
		  <div className="w-full md:w-1/2 md:flex justify-center items-center p-6 md:p-10 hidden">
			<img 
			  src="/assets/login-img.png" 
			  alt="Register" 
			  className="w-[30vw] min-w-md"
			/>
		  </div>
		</div>
  
		<ToastContainer />
	  </div>
	);
  };
  
  export default Register;