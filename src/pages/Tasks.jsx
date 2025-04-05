import { useEffect, useState } from 'react';
import Task from '../components/Task'
import { db, auth } from '../firebase'
import { collection, query, onSnapshot, updateDoc, doc, addDoc, getDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'

const Tasks = () => {
	const [date, setDate] = useState(new Date());
	const [tasks, setTasks] = useState([]);
	const [input, setInput] = useState('');
	const [importance, setImportance] = useState('Normal');
	const [userDetails, setUserDetails] = useState(null);
	const user = auth.currentUser;
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	// Create
	const addTask = async (e) => {
		e.preventDefault(e)
		const user = auth.currentUser
		if (input === '') {
			alert('Please enter a task')
			return
		}

		// const selectedDate = date ? date.toISOString().split("T")[0] : new Date().toISOString().split("T")[0];
		const selectedDate = date.toISOString().split("T")[0];

		try {
			await addDoc(collection(db, 'Tasks', user.uid, "UserTasks"), {
				text: input,
				completed: false,
				createdAt: serverTimestamp(),
				date: selectedDate,
				importance
			});
			setInput('');
			setImportance('Normal');

			// Reset input field
			setInput('');
		} catch (error) {
			console.error("Error adding task:", error);
		}
		setIsModalOpen(false);
	}

	// Read

	useEffect(() => {
		const fetchTasks = async () => {
			if (!user || !user.uid) return;

			try {
				const q = query(collection(db, "Tasks", user.uid, "UserTasks"));

				const unsub = onSnapshot(q, (querySnapshot) => {
					let tasksArr = [];
					querySnapshot.forEach((doc) => {
						tasksArr.push({ ...doc.data(), id: doc.id });
					});
					setTasks(tasksArr);
				});

				return () => unsub();
			} catch (error) {
				console.error("Error fetching tasks:", error);
			}
		};

		fetchTasks();
	}, [user?.uid]);

	const fetchUserDetails = async () => {
		auth.onAuthStateChanged(async (user) => {
			setUserDetails(userDetails);
			const docRef = doc(db, "Users", user.uid);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setUserDetails(docSnap.data());
				console.log(docSnap.data());
			} else {
				console.log("No such document!");
			}
		});
	}

	useEffect(() => {
		fetchUserDetails();
	}, []);

	const getImportanceColor = (level) => {
		switch (level) {
			case "Low":
				return "bg-green-500"; // Green
			case "Normal":
				return "bg-yellow-500"; // Yellow
			case "High":
				return "bg-red-500"; // Red
			default:
				return "bg-gray-500"; // Default
		}
	};

	// Update
	const toggleComplete = async (task) => {
		const user = auth.currentUser;
		if (!user || !user.uid) return console.error("User not authenticated");

		try {
			const taskRef = doc(db, "Tasks", user.uid, "UserTasks", task.id);
			await updateDoc(taskRef, { completed: !task.completed });
		} catch (error) {
			console.error("Error updating task:", error);
		}
	};


	// Delete
	const deleteTask = async (task) => {
		const user = auth.currentUser;
		if (!user || !user.uid) return console.error("User not authenticated");

		try {
			const taskRef = doc(db, "Tasks", user.uid, "UserTasks", task.id);
			await deleteDoc(taskRef);
		} catch (error) {
			console.error("Error deleting task:", error);
		}
	};


	return (
		<>
			<div className="flex-1 p-6 lg:ml-72">

				<div className="flex justify-between items-center">
					<h2 className="text-black text-2xl font-bold font-['Lexend Deca']">My Tasks</h2>
					{userDetails ? (
						<span className="text-black text-2xl font-bold font-['Lexend Deca']">{userDetails.uname}</span>
					) : (
						<p>Loading...</p>
					)}
				</div>

				<div>
					{/* Add Task Button */}
					<button
						onClick={() => setIsModalOpen(true)}
						className="bg-violet-400 text-white px-5 py-2 rounded-lg hover:bg-violet-600 duration-300 ease-in-out mt-6"
					>
						Add Task
					</button>

					{/* Overlay Modal */}
					{isModalOpen && (
						<div className="fixed inset-0 flex items-center justify-center z-10 bg-black/50 backdrop-blur-sm transition-opacity duration-600">
							<div className="bg-white p-6 rounded-lg shadow-lg w-[70vw] lg:max-w-1/2 relative">
								{/* Close Button */}
								<button
									onClick={() => setIsModalOpen(false)}
									className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
								>
									✖
								</button>

								{/* Task Input Form */}
								<h2 className="text-xl font-bold mb-4">Add a New Task</h2>
								<div className="flex flex-col space-y-6">
									<input
										value={input}
										onChange={(e) => setInput(e.target.value)}
										type="text"
										placeholder="Add a new task"
										className="flex-grow px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
									/>
									{/* Importance Dropdown */}
									<div className="relative w-1/2">
										<button
											onClick={() => setIsDropdownOpen(!isDropdownOpen)}
											className="border rounded-md px-3 py-2 flex items-center space-x-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
										>
											<span className={`w-4 h-4 rounded-full ${getImportanceColor(importance)}`}></span>
											<span>{importance}</span>
										</button>

										{isDropdownOpen && (
											<div className="absolute left-0 mt-1 w-full bg-white border rounded-md shadow-lg">
												<button onClick={() => { setImportance("Low"); setIsDropdownOpen(false); }} className="flex items-center p-2 w-full hover:bg-gray-200">
													<span className="w-4 h-4 rounded-full bg-green-500 mr-2"></span> Low
												</button>
												<button onClick={() => { setImportance("Normal"); setIsDropdownOpen(false); }} className="flex items-center p-2 w-full hover:bg-gray-200">
													<span className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></span> Normal
												</button>
												<button onClick={() => { setImportance("High"); setIsDropdownOpen(false); }} className="flex items-center p-2 w-full hover:bg-gray-200">
													<span className="w-4 h-4 rounded-full bg-red-500 mr-2"></span> High
												</button>
											</div>
										)}
									</div>
									<input
										type="date"
										value={date.toISOString().split("T")[0]}
										onChange={(e) => setDate(new Date(e.target.value))}
										className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 lg:w-[30%] w-[80%]"
									/>


									<button onClick={addTask} className="bg-violet-400 text-white px-5 py-2 rounded-md hover:bg-violet-600 duration-300 ease-in-out">Add</button>
								</div>
							</div>
						</div>
					)}
				</div>


				<ul className="mt-6 space-y-4 list-none">
					{
						tasks.length > 0 ? (
							tasks.map((task) => (
								<Task
									key={task.id}
									task={task}
									tasks={tasks}
									setTasks={setTasks}
									toggleComplete={() => toggleComplete(task)}
									deleteTask={() => deleteTask(task)}
									date={date}
								/>
							))
						) : (
							<p>No tasks available</p>
						)
					}
				</ul>
			</div>

		</>
	);
}

export default Tasks