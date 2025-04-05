const DeleteButton = ({ task, deleteTask }) => {
	return (
		<button
			onClick={() => deleteTask(task.id)}
		>
			<div className="h-full w-[60px] md:w-[60px] lg:w-[80px] bg-red-400 rounded-tr-[5px] rounded-br-[5px] flex justify-center items-center
			 hover:bg-red-300 duration-300 ease-in-out">
				<div data-svg-wrapper>
					<svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3H0V1H5V0H11V1H16V3H15V16C15 
						16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z" fill="#1C1B1F" />
					</svg>
				</div>
			</div>
		</button>
	);
};

export default DeleteButton