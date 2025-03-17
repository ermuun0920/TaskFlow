import { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, query, onSnapshot, updateDoc, doc, addDoc, getDoc, deleteDoc, where } from 'firebase/firestore';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Task from '../components/Task'
import "react-calendar/dist/Calendar.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { twMerge } from "tailwind-merge";

const Calendar = () => {
	const [userDetails, setUserDetails] = useState(null);
	const [tasks, setTasks] = useState([]);
	const [date, setDate] = useState(new Date());
	const user = auth.currentUser;

	useEffect(() => {
		const fetchTasks = async () => {
			setUserDetails(userDetails);
			if (!user || !user.uid) return;

			try {
				// const selectedDate = date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
				const selectedDate = date ?
					`${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
					: new Date().toISOString().split("T")[0];
				const q = query(collection(db, "Tasks", user.uid, "UserTasks"), where("date", "==", selectedDate));

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
	}, [user?.uid, date]);

	const fetchUserDetails = async () => {
		auth.onAuthStateChanged(async (user) => {
			const docRef = doc(db, "Users", user.uid);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setUserDetails(docSnap.data());
				console.log(docSnap.data());
			} else {
				console.log("No such document!");
			}
		});
	};

	useEffect(() => {
		fetchUserDetails();
	}, []);

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

				<div className="mt-4 p-4 bg-white shadow-lg rounded-xl ">
					<ReactCalendar
						onChange={setDate}
						value={date}
						className="w-full border-none p-2 rounded-lg"
						prevLabel={<ChevronLeft className="w-6 h-6 text-gray-600 hover:text-gray-900 transition" />}
						nextLabel={<ChevronRight className="w-6 h-6 text-gray-600 hover:text-gray-900 transition" />}
						tileClassName={() =>
							twMerge(
								"py-2 text-center rounded-lg transition-all text-sm font-medium",
								"hover:bg-gray-200",
							)
						}
						calendarClassName="rounded-lg bg-gray-50 p-2 shadow-sm"
					/>
					<h2 className="text-lg font-semibold mt-4">Tasks for {date.toDateString()}</h2>
					<ul className="mt-2 space-y-2">
						{tasks.length > 0 ? (
							tasks.map((task) => (
								<Task
									key={task.id}
									task={task}
									tasks={tasks}
									setTasks={setTasks}
									toggleComplete={() => toggleComplete(task)}
									deleteTask={() => deleteTask(task)}
								/>
							))
						) : (
							<p className="text-gray-500">No tasks available</p>
						)}
					</ul>
				</div>
			</div>
		</>
	);
};

export default Calendar;
