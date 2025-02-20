import { useEffect, useState } from 'react';
import Task from '../components/Task'
import {db} from '../firebase'
import { collection, query, onSnapshot, updateDoc, doc, addDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'

const Tasks = () => {
	const [tasks, setTasks] = useState([]);
	const [input, setInput] = useState('');

	// Create
	const addTask = async (e) => {
		e.preventDefault(e)
		if(input === '') {
			alert('Please enter a task')
			return
		}
		await addDoc(collection(db, 'Tasks'), {
			text: input,
			completed: false,
			createdAt: serverTimestamp(),
		})
		setInput('')
	}

	// Read
	useEffect(() => {
		const q = query(collection(db, 'Tasks'))
		const unsub = onSnapshot(q, (querySnapshot) => {
			let tasksArr = []
			querySnapshot.forEach((doc) => {
				tasksArr.push({...doc.data(), id: doc.id})
			});
			setTasks(tasksArr)
		})
		return() => unsub()
	},[])

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

				<div className="flex mt-6 w-1/2">
					<input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder='Add a new task' className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-400" />
					<button onClick={addTask} className="bg-violet-400 text-white px-5 py-2 rounded-r-lg hover:bg-violet-600">
						Add
					</button>
				</div>

				<ul className="mt-6 space-y-4 list-none">
					{
						tasks.map((task) => (
							<Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} toggleComplete={toggleComplete} deleteTask={deleteTask} />
						))
					}
				</ul>
			</div>

		</>
	);
}

export default Tasks