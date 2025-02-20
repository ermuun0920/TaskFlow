import DeleteButton from './DeleteButton';
import CheckBox from './CheckBox';

const Task = ({ task, toggleComplete, deleteTask }) => {
	return (
		<li key={task.id}>
			<div className="bg-white border border-gray-300 rounded-md shadow-sm flex justify-between">
				<div className="flex gap-2 m-4 items-center">
					<CheckBox task={task} toggleComplete={toggleComplete} />
					<h3 className={`text-lg font-bold font-['Lexend Deca'] ${task.completed ? "line-through text-gray-500" : "text-black"}`}>{task.text}</h3>
				</div>
				<DeleteButton task={task} deleteTask={deleteTask} />
			</div>
		</li>
	);
};

export default Task