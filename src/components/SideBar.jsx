import { NavLink } from "react-router-dom";


const SideBar = () => {
  return (
    <div className="w-full lg:w-72 bg-violet-400/50 rounded-tr-2xl rounded-br-2xl shadow-md p-6">
      <h1 className="text-black text-3xl font-bold font-['Lexend Deca'] text-center">TaskFlow</h1>

      {/* <div className="absolute top-6 right-6 md:hidden md:rounded-br-2xl md:rounded-bl-2xl" data-menu-button>
        <div class="w-6 h-6 relative">
          <div class="w-6 h-6 left-0 top-0 absolute"></div>
          <div data-svg-wrapper class="left-[3px] top-[6px] absolute">
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 12V10H18V12H0ZM0 7V5H18V7H0ZM0 2V0H18V2H0Z" fill="#1C1B1F" />
            </svg>
          </div>
        </div>
      </div> */}
      
      <nav className="mt-8 space-y-4 flex flex-col">

        <div className="flex items-center gap-x-2">
          <div className="w-6 h-6 relative">
            <div className="w-6 h-6 left-0 top-0 absolute"></div>
            <div data-svg-wrapper className="left-[4px] top-[3px] absolute">
              <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 16H5V10H11V16H14V7L8 2.5L2 7V16ZM0 18V6L8 0L16 6V18H9V12H7V18H0Z" fill="#1C1B1F" />
              </svg>
            </div>
          </div>

          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-black text-lg font-bold font-['Lexend Deca'] block ${isActive ? 'underline' : ''} hover:text-gray-600`
            }
          >
            Home
          </NavLink>
        </div>

        <div className="flex items-center gap-x-2">
          <div className="w-6 h-6 relative ">
            <div className="w-6 h-6 left-0 top-0 absolute "></div>
            <div data-svg-wrapper className="left-[6px] top-[3px] absolute">
              <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 9L12 11V13H7V19L6 20L5 19V13H0V11L2 9V2H1V0H11V2H10V9ZM2.85 11H9.15L8 9.85V2H4V9.85L2.85 11Z"
                  fill="#1C1B1F" />
              </svg>
            </div>
          </div>

          <NavLink
            to="Tasks"
            className={({ isActive }) =>
              `text-black text-lg font-bold font-['Lexend Deca'] block ${isActive ? 'underline' : ''} hover:text-gray-600`
            }
          >
            Tasks
          </NavLink>
        </div>

        <div className="flex items-center gap-x-2">
          <div className="w-6 h-6 relative">
            <div className="w-6 h-6 left-0 top-0 absolute "></div>
            <div data-svg-wrapper className="left-[3px] top-[2px] absolute">
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V4C0 3.45 0.195833 2.97917 0.5875 2.5875C0.979167 2.19583 1.45 2 2 2H3V0H5V2H13V0H15V2H16C16.55 2 17.0208 2.19583 17.4125 2.5875C17.8042 2.97917 18 3.45 18 4V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H2ZM2 18H16V8H2V18ZM2 6H16V4H2V6ZM9 12C8.71667 12 8.47917 11.9042 8.2875 11.7125C8.09583 11.5208 8 11.2833 8 11C8 10.7167 8.09583 10.4792 8.2875 10.2875C8.47917 10.0958 8.71667 10 9 10C9.28333 10 9.52083 10.0958 9.7125 10.2875C9.90417 10.4792 10 10.7167 10 11C10 11.2833 9.90417 11.5208 9.7125 11.7125C9.52083 11.9042 9.28333 12 9 12ZM5 12C4.71667 12 4.47917 11.9042 4.2875 11.7125C4.09583 11.5208 4 11.2833 4 11C4 10.7167 4.09583 10.4792 4.2875 10.2875C4.47917 10.0958 4.71667 10 5 10C5.28333 10 5.52083 10.0958 5.7125 10.2875C5.90417 10.4792 6 10.7167 6 11C6 11.2833 5.90417 11.5208 5.7125 11.7125C5.52083 11.9042 5.28333 12 5 12ZM13 12C12.7167 12 12.4792 11.9042 12.2875 11.7125C12.0958 11.5208 12 11.2833 12 11C12 10.7167 12.0958 10.4792 12.2875 10.2875C12.4792 10.0958 12.7167 10 13 10C13.2833 10 13.5208 10.0958 13.7125 10.2875C13.9042 10.4792 14 10.7167 14 11C14 11.2833 13.9042 11.5208 13.7125 11.7125C13.5208 11.9042 13.2833 12 13 12ZM9 16C8.71667 16 8.47917 15.9042 8.2875 15.7125C8.09583 15.5208 8 15.2833 8 15C8 14.7167 8.09583 14.4792 8.2875 14.2875C8.47917 14.0958 8.71667 14 9 14C9.28333 14 9.52083 14.0958 9.7125 14.2875C9.90417 14.4792 10 14.7167 10 15C10 15.2833 9.90417 15.5208 9.7125 15.7125C9.52083 15.9042 9.28333 16 9 16ZM5 16C4.71667 16 4.47917 15.9042 4.2875 15.7125C4.09583 15.5208 4 15.2833 4 15C4 14.7167 4.09583 14.4792 4.2875 14.2875C4.47917 14.0958 4.71667 14 5 14C5.28333 14 5.52083 14.0958 5.7125 14.2875C5.90417 14.4792 6 14.7167 6 15C6 15.2833 5.90417 15.5208 5.7125 15.7125C5.52083 15.9042 5.28333 16 5 16ZM13 16C12.7167 16 12.4792 15.9042 12.2875 15.7125C12.0958 15.5208 12 15.2833 12 15C12 14.7167 12.0958 14.4792 12.2875 14.2875C12.4792 14.0958 12.7167 14 13 14C13.2833 14 13.5208 14.0958 13.7125 14.2875C13.9042 14.4792 14 14.7167 14 15C14 15.2833 13.9042 15.5208 13.7125 15.7125C13.5208 15.9042 13.2833 16 13 16Z"
                  fill="#1C1B1F" />
              </svg>
            </div>
          </div>

          <a href="#" className="text-black text-lg font-bold font-['Lexend Deca'] block">Calendar</a>
        </div>

        <div className="flex items-center gap-x-2">
          <div className="w-6 h-6 relative">
            <div className="w-6 h-6 left-0 top-0 absolute "></div>
            <div data-svg-wrapper className="left-[1.95px] top-[2px] absolute">
              <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.25 20L7.85 16.8C7.63333 16.7167 7.42917 16.6167 7.2375 16.5C7.04583 16.3833 6.85833 16.2583 6.675 16.125L3.7 17.375L0.950001 12.625L3.525 10.675C3.50833 10.5583 3.5 10.4458 3.5 10.3375V9.6625C3.5 9.55417 3.50833 9.44167 3.525 9.325L0.950001 7.375L3.7 2.625L6.675 3.875C6.85833 3.74167 7.05 3.61667 7.25 3.5C7.45 3.38333 7.65 3.28333 7.85 3.2L8.25 0H13.75L14.15 3.2C14.3667 3.28333 14.5708 3.38333 14.7625 3.5C14.9542 3.61667 15.1417 3.74167 15.325 3.875L18.3 2.625L21.05 7.375L18.475 9.325C18.4917 9.44167 18.5 9.55417 18.5 9.6625V10.3375C18.5 10.4458 18.4833 10.5583 18.45 10.675L21.025 12.625L18.275 17.375L15.325 16.125C15.1417 16.2583 14.95 16.3833 14.75 16.5C14.55 16.6167 14.35 16.7167 14.15 16.8L13.75 20H8.25ZM10 18H11.975L12.325 15.35C12.8417 15.2167 13.3208 15.0208 13.7625 14.7625C14.2042 14.5042 14.6083 14.1917 14.975 13.825L17.45 14.85L18.425 13.15L16.275 11.525C16.3583 11.2917 16.4167 11.0458 16.45 10.7875C16.4833 10.5292 16.5 10.2667 16.5 10C16.5 9.73333 16.4833 9.47083 16.45 9.2125C16.4167 8.95417 16.3583 8.70833 16.275 8.475L18.425 6.85L17.45 5.15L14.975 6.2C14.6083 5.81667 14.2042 5.49583 13.7625 5.2375C13.3208 4.97917 12.8417 4.78333 12.325 4.65L12 2H10.025L9.675 4.65C9.15833 4.78333 8.67917 4.97917 8.2375 5.2375C7.79583 5.49583 7.39167 5.80833 7.025 6.175L4.55 5.15L3.575 6.85L5.725 8.45C5.64167 8.7 5.58333 8.95 5.55 9.2C5.51667 9.45 5.5 9.71667 5.5 10C5.5 10.2667 5.51667 10.525 5.55 10.775C5.58333 11.025 5.64167 11.275 5.725 11.525L3.575 13.15L4.55 14.85L7.025 13.8C7.39167 14.1833 7.79583 14.5042 8.2375 14.7625C8.67917 15.0208 9.15833 15.2167 9.675 15.35L10 18ZM11.05 13.5C12.0167 13.5 12.8417 13.1583 13.525 12.475C14.2083 11.7917 14.55 10.9667 14.55 10C14.55 9.03333 14.2083 8.20833 13.525 7.525C12.8417 6.84167 12.0167 6.5 11.05 6.5C10.0667 6.5 9.2375 6.84167 8.5625 7.525C7.8875 8.20833 7.55 9.03333 7.55 10C7.55 10.9667 7.8875 11.7917 8.5625 12.475C9.2375 13.1583 10.0667 13.5 11.05 13.5Z"
                  fill="#1C1B1F" />
              </svg>
            </div>
          </div>

          <a href="#" className="text-black text-lg font-bold font-['Lexend Deca'] block">Settings</a>
        </div>

      </nav>
    </div>
  );
};

export default SideBar;