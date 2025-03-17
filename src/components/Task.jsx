import DeleteButton from './DeleteButton';
import CheckBox from './CheckBox';

const Task = ({ task, toggleComplete, deleteTask, date }) => {

	return (
		<li key={task.id}>
			<div className="bg-white border border-gray-300 rounded-md shadow-sm flex justify-between min-w-4">
				<div className="flex gap-2 m-4 items-center flex-1 min-w-0">
					<CheckBox task={task} toggleComplete={toggleComplete} />
					<h3 className={`text-lg font-bold font-['Lexend Deca'] break-all flex-grow ${task.completed ? "line-through text-gray-500" : "text-black"}`}>
						{task.text}
					</h3>
					<p className="text-xs text-gray-500">{task.date}</p>
				</div>
				<DeleteButton task={task} deleteTask={deleteTask} />
			</div>
		</li>
	);
};

export default Task