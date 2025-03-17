import { useEffect, useState } from 'react';
import Task from '../components/Task'
import { db, auth } from '../firebase'
import { collection, query, onSnapshot, updateDoc, doc, addDoc, getDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'

const Tasks = () => {
	const [date, setDate] = useState(new Date());
	const [tasks, setTasks] = useState([]);
	const [input, setInput] = useState('');
	const [userDetails, setUserDetails] = useState(null);
	const user = auth.currentUser;

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
				date: selectedDate 
			});

			// Reset input field
			setInput('');
		} catch (error) {
			console.error("Error adding task:", error);
		}
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

				<div className="flex mt-6 w-1/2">
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						type="text"
						placeholder='Add a new task'
						className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-400"
					/>
					<input
						type="date"
						value={date.toISOString().split("T")[0]}
						onChange={(e) => setDate(new Date(e.target.value))}
						className="border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
					/>
					<button onClick={addTask} className="bg-violet-400 text-white px-5 py-2 rounded-r-lg hover:bg-violet-600">
						Add
					</button>
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