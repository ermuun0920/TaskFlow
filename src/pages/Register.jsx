import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';

const Register = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [fname, setFname] = useState('');
	const [lname, setLname] = useState('');
	const [uname, setUname] = useState('');

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			const user = auth.currentUser;
			console.log(user);
			if (user) {
				await setDoc(doc(db, "Users", user.uid), {
					email: user.email,
					uname: uname,
					fname: fname,
					lname: lname
				});
			}
			console.log("User Registered Successfully!!");
			toast.success('User Registered Successfully!!', {
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
							<h1 className="text-3xl font-bold">Register</h1>
							<form className="mt-6 space-y-3" onSubmit={handleRegister}>
								<div>
									<input
										type="text"
										placeholder="Enter First Name"
										className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
										onChange={(e) => setFname(e.target.value)}
										required
									/>
								</div>
								<div>
									<input
										type="text"
										placeholder="Enter Last Name"
										className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
										onChange={(e) => setLname(e.target.value)}
									/>
								</div>
								<div>
									<input
										type="text"
										placeholder="Enter User Name"
										className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
										onChange={(e) => setUname(e.target.value)}
										required
									/>
								</div>
								<div>
									<input
										type="email"
										placeholder="Enter Email"
										className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</div>
								<div>
									<input
										type="password"
										placeholder="Enter Password"
										className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
								</div>
								<button type="submit" className="w-1/4 bg-violet-500 text-white font-semibold rounded-lg px-3 py-2 cursor-pointer">Register</button>

								<div><span className="text-[#212427] text-base font-medium">Already have an account? </span><Link to={"/LogIn"} className="text-[#008ad9] text-base font-medium">Log In</Link></div>
							</form>
						</div>

						<div className="flex-1"><img src="/assets/login-img.png" alt="" className="mt-50 ml-20 w-[30vw]" /></div>

					</div>

				</div>
			</div>
		</div>
	);
}

export default Register;