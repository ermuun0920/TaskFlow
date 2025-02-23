import { useEffect, useState } from 'react';
import Task from '../components/Task'
import { db, auth } from '../firebase'
import { collection, query, onSnapshot, orderBy, limit, getDocs, getDoc, updateDoc, doc, deleteDoc, } from "firebase/firestore";

const Home = () => {
	const [tasks, setTasks] = useState([]);
	const [userDetails, setUserDetails] = useState(null);
	const user = auth.currentUser;

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
	}

	useEffect(() => {
		fetchUserDetails();
	}, []);

	// Read
	useEffect(() => {
		const fetchRecentDocs = async () => {
			if (!user || !user.uid) return;

			try {
				const q = query(collection(db, "Tasks", user.uid, "UserTasks"), orderBy("createdAt", "desc"), limit(3));
				const unsub = onSnapshot(q, (querySnapshot) => {
					let tasksArr = []
					querySnapshot.forEach((doc) => {
						tasksArr.push({ ...doc.data(), id: doc.id })
					});
					setTasks(tasksArr)
				})
				const querySnapshot = await getDocs(q);

				const docsArray = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));

				setTasks(docsArray);
				return () => unsub()

			} catch (error) {
				console.error("Error fetching documents:", error);
			}
		};

		fetchRecentDocs();
	}, [user?.uid]);


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

				<div className="mt-6 space-y-4">
					<ul className="mt-6 space-y-4 list-none">
						{
							tasks.map((task) => (
								<Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} toggleComplete={toggleComplete} deleteTask={deleteTask} />
							))
						}
					</ul>
				</div>

				<h2 className="mt-8 text-black text-2xl font-bold font-['Lexend Deca']">Calendar</h2>
			</div>
		</>
	);
}

export default Home