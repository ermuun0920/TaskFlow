import { useEffect, useState } from 'react';
import Task from '../components/Task'
import { db } from '../firebase'
import { collection, query, onSnapshot, orderBy, limit, getDocs, updateDoc, doc, deleteDoc, } from "firebase/firestore";

const Home = () => {
	const [tasks, setTasks] = useState([]);
	
	// Read
	useEffect(() => {
    const fetchRecentDocs = async () => {
      try {
        const q = query(collection(db, "Tasks"), orderBy("createdAt", "desc"), limit(3));
				const unsub = onSnapshot(q, (querySnapshot) => {
					let tasksArr = []
					querySnapshot.forEach((doc) => {
						tasksArr.push({...doc.data(), id: doc.id})
					});
					setTasks(tasksArr)
				})
        const querySnapshot = await getDocs(q);

        const docsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTasks(docsArray);
				return() => unsub()

      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchRecentDocs();
  	}, []);

	// Update
		const toggleComplete = async (task) => {
			await updateDoc(doc(db, 'Tasks', task.id), {
				completed: !task.completed
			})
		}
	
		// Delete
		const deleteTask = async (task) => {
			await deleteDoc(doc(db, 'Tasks', task))
		}
	

	return (
		<>
			<div className="flex-1 p-6">

				<div className="flex justify-between items-center">
					<h2 className="text-black text-2xl font-bold font-['Lexend Deca']">My Tasks</h2>
					<span className="text-black text-2xl font-bold font-['Lexend Deca']">Ermuun</span>
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