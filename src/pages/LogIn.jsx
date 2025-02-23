import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';

const LogIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, email, password);
			console.log("User Logged In Successfully!!");
			window.location.href = "/Home";
			toast.success('User Logged In Successfully!!', {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		} catch (error) {
			console.log(error.message);
			toast.error(error.message, {
				position: "bottom-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}
	}

	return (
		<div className="flex justify-center items-center h-screen w-screen bg-[url('/assets/login-bg.png')] bg-violet-400">
			<div className="flex justify-center items-center h-screen">
				<div className="w-[70vw] h-[80vh] bg-white rounded-lg shadow-lg p-15 flex justify-center ">

					<div className="flex justify-center items-center w-full">

						<ToastContainer />

						<div className="flex-1 ">
							<h1 className="text-3xl font-bold">Log In</h1>
							<form className="mt-6 space-y-6" onSubmit={handleSubmit}>
								<div>
									<label className="block text-sm font-medium">Email</label>
									<input type="email"
										placeholder="Enter email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1" />
								</div>
								<div>
									<label className="block text-sm font-medium">Password</label>
									<input type="password"
										placeholder="Enter password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1" />
								</div>
								<button type='submit' className="w-1/4 bg-violet-500 text-white font-semibold rounded-lg px-3 py-2 cursor-pointer">Log In</button>
								<div><span className="text-[#212427] text-base font-medium">Don’t have an account? </span><Link to={"/Register"} className="text-[#008ad9] text-base font-medium">Create One</Link></div>
							</form>
						</div>

						<div className="flex-1"><img src="/assets/login-img.png" alt="" className="mt-50 ml-20 w-[30vw]" /></div>

					</div>

				</div>
			</div>
		</div>
	);
}

export default LogIn;