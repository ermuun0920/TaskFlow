import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';
import SignInwithGoogle from "../components/SignInWithGoogle";

const LogIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, email, password);
			toast.success("User Logged In Successfully!", { position: "top-center" });
			window.location.href = "/Home";
		} catch (error) {
			toast.error(error.message, { position: "bottom-center" });
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen w-screen bg-[url('/assets/login-bg.png')] bg-violet-400 p-4">
			<div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-5xl h-auto md:h-[70vh]">


				{/* Form Section */}
				<div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start p-6 md:p-10">
					<h1 className="text-3xl font-bold text-center md:text-left">Log In</h1>
					<form className="mt-6 space-y-4 w-full max-w-md" onSubmit={handleSubmit}>
						<div>
							<label className="block text-sm font-medium">Email</label>
							<input
								type="email"
								placeholder="Enter email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-violet-300"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium">Password</label>
							<input
								type="password"
								placeholder="Enter password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-violet-300"
							/>
						</div>
						<button
							type="submit"
							className="w-full bg-violet-500 text-white font-semibold rounded-lg px-3 py-2 cursor-pointer hover:bg-violet-600 transition"
						>
							Log In
						</button>
						<div className="text-center md:text-left">
							<span className="text-gray-700">Don’t have an account? </span>
							<Link to="/Register" className="text-blue-500 hover:underline">
								Create One
							</Link>
						</div>
						<SignInwithGoogle/>
					</form>
				</div>

				{/* Image Section */}
				<div className="w-full md:w-1/2 md:flex justify-center items-center p-6 md:p-10 hidden">
					<img
						src="/assets/login-img.png"
						alt="Login"
						className="w-[30vw] min-w-md"
					/>
				</div>
			</div>

			<ToastContainer />
		</div>
	);
};

export default LogIn;