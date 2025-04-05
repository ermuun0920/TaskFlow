import DeleteButton from './DeleteButton';
import CheckBox from './CheckBox';

const Task = ({ task, toggleComplete, deleteTask, date }) => {

	const getImportanceColor = (level) => {
		switch (level) {
			case "Low":
				return "bg-green-500"; // Green
			case "Normal":
				return "bg-yellow-500"; // Yellow
			case "High":
				return "bg-red-500"; // Red
			default:
				return "bg-gray-500"; // Default gray
		}
	};

	return (
		<li key={task.id}>
			<div className="bg-white border border-gray-300 rounded-md shadow-sm flex justify-between min-w-4">
				<div className="flex gap-2 m-4 items-center flex-1 min-w-0">
					<CheckBox task={task} toggleComplete={toggleComplete} />
					<h3 className={`text-lg font-bold font-['Lexend Deca'] break-all flex-grow ${task.completed ? "line-through text-gray-500" : "text-black"} 
					duration-300 ease-in-out`}>
						{task.text}
					</h3>
					<p className="text-xs text-gray-500">{task.date}</p>
					<div className="flex items-center gap-1">
						<span className={`w-4 h-4 rounded-full ${getImportanceColor(task.importance)}`}></span>
						<span className="text-sm text-gray-700">{task.importance}</span>
					</div>
				</div>
				<DeleteButton task={task} deleteTask={deleteTask} />
			</div>
		</li>
	);
};

export default Task