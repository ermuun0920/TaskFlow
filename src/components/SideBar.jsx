import { NavLink } from "react-router-dom";
import { auth } from "../firebase";
import React, { useState } from 'react';


const SideBar = () => {

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <div className="lg:fixed lg:h-screen w-full lg:w-72 bg-violet-400/50 lg:rounded-r-2xl lg:rounded-bl-none shadow-lg p-6 rounded-b-2xl lg:block flex justify-between">
      <div></div>
      <div className="flex justify-center">
        <h1 className="text-black text-3xl font-bold font-['Lexend Deca'] text-center">TaskFlow</h1>
      </div>

      <nav className="mt-8 space-y-4 hidden lg:flex flex-col h-[90%] justify-between ">

        <div className="space-y-4 flex-1 overflow-auto">
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
              to="/Home"
              className={({ isActive }) =>
                `text-black text-lg font-bold font-['Lexend Deca'] block ${isActive ? 'underline' : ''} hover:text-gray-600 duration-300 ease-in-out`
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
              to="/Tasks"
              className={({ isActive }) =>
                `text-black text-lg font-bold font-['Lexend Deca'] block ${isActive ? 'underline' : ''} hover:text-gray-600 duration-300 ease-in-out`
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
            <NavLink
              to="/Calendar"
              className={({ isActive }) =>
                `text-black text-lg font-bold font-['Lexend Deca'] block ${isActive ? 'underline' : ''} hover:text-gray-600 duration-300 ease-in-out`
              }
            >
              Calendar
            </NavLink>
          </div>
        </div>
      </nav>

      <div className="lg:flex items-center gap-x-2 lg:mt-auto lg:justify-start hidden">
        <div className="w-6 h-6 relative">
          <div className="w-6 h-6 left-0 top-0 absolute"></div>
          <div data-svg-wrapper className="left-[3px] top-[3px] absolute">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 18C1.45 18 0.979167 17.8042 0.5875 17.4125C0.195833 17.0208 0 16.55 0 16V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H9V2H2V16H9V18H2ZM13 14L11.625 12.55L14.175 10H6V8H14.175L11.625 5.45L13 4L18 9L13 14Z" fill="#1C1B1F" />
            </svg>
          </div>
        </div>
        <button className="text-black text-lg font-bold font-['Lexend Deca'] lg:block  cursor-pointer hover:text-gray-600 hidden duration-300 ease-in-out" onClick={handleLogout}>
          Log Out
        </button>
      </div>

      <div className="flex items-center gap-x-2 lg:mt-auto lg:justify-start lg:hidden">
        <div className="w-6 h-6 relative">
          <div className="w-6 h-6 left-0 top-0 absolute"></div>
          <div data-svg-wrapper className="left-[3px] top-[3px] absolute">
            <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 18C1.45 18 0.979167 17.8042 0.5875 17.4125C0.195833 17.0208 0 16.55 0 16V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H9V2H2V16H9V18H2ZM13 14L11.625 12.55L14.175 10H6V8H14.175L11.625 5.45L13 4L18 9L13 14Z" fill="#1C1B1F" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 w-full bg-violet-400/50 flex justify-around items-center py-2 lg:hidden shadow-ld rounded-t-2xl">
        <NavLink to="/Home" className="p-2">
          <svg width="24" height="24" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 16H5V10H11V16H14V7L8 2.5L2 7V16ZM0 18V6L8 0L16 6V18H9V12H7V18H0Z" fill="#1C1B1F" />
          </svg>
        </NavLink>
        <NavLink to="/Tasks" className="p-2">
          <svg width="24" height="24" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 9L12 11V13H7V19L6 20L5 19V13H0V11L2 9V2H1V0H11V2H10V9ZM2.85 11H9.15L8 9.85V2H4V9.85L2.85 11Z" fill="#1C1B1F" />
          </svg>
        </NavLink>
        <NavLink to="/Calendar" className="p-2">
          <svg width="24" height="24" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V4C0 3.45 0.195833 2.97917 0.5875 2.5875C0.979167 2.19583 1.45 2 2 2H3V0H5V2H13V0H15V2H16C16.55 2 17.0208 2.19583 17.4125 2.5875C17.8042 2.97917 18 3.45 18 4V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H2ZM2 18H16V8H2V18ZM2 6H16V4H2V6ZM9 12C8.71667 12 8.47917 11.9042 8.2875 11.7125C8.09583 11.5208 8 11.2833 8 11C8 10.7167 8.09583 10.4792 8.2875 10.2875C8.47917 10.0958 8.71667 10 9 10C9.28333 10 9.52083 10.0958 9.7125 10.2875C9.90417 10.4792 10 10.7167 10 11C10 11.2833 9.90417 11.5208 9.7125 11.7125C9.52083 11.9042 9.28333 12 9 12ZM5 12C4.71667 12 4.47917 11.9042 4.2875 11.7125C4.09583 11.5208 4 11.2833 4 11C4 10.7167 4.09583 10.4792 4.2875 10.2875C4.47917 10.0958 4.71667 10 5 10C5.28333 10 5.52083 10.0958 5.7125 10.2875C5.90417 10.4792 6 10.7167 6 11C6 11.2833 5.90417 11.5208 5.7125 11.7125C5.52083 11.9042 5.28333 12 5 12ZM13 12C12.7167 12 12.4792 11.9042 12.2875 11.7125C12.0958 11.5208 12 11.2833 12 11C12 10.7167 12.0958 10.4792 12.2875 10.2875C12.4792 10.0958 12.7167 10 13 10C13.2833 10 13.5208 10.0958 13.7125 10.2875C13.9042 10.4792 14 10.7167 14 11C14 11.2833 13.9042 11.5208 13.7125 11.7125C13.5208 11.9042 13.2833 12 13 12ZM9 16C8.71667 16 8.47917 15.9042 8.2875 15.7125C8.09583 15.5208 8 15.2833 8 15C8 14.7167 8.09583 14.4792 8.2875 14.2875C8.47917 14.0958 8.71667 14 9 14C9.28333 14 9.52083 14.0958 9.7125 14.2875C9.90417 14.4792 10 14.7167 10 15C10 15.2833 9.90417 15.5208 9.7125 15.7125C9.52083 15.9042 9.28333 16 9 16ZM5 16C4.71667 16 4.47917 15.9042 4.2875 15.7125C4.09583 15.5208 4 15.2833 4 15C4 14.7167 4.09583 14.4792 4.2875 14.2875C4.47917 14.0958 4.71667 14 5 14C5.28333 14 5.52083 14.0958 5.7125 14.2875C5.90417 14.4792 6 14.7167 6 15C6 15.2833 5.90417 15.5208 5.7125 15.7125C5.52083 15.9042 5.28333 16 5 16ZM13 16C12.7167 16 12.4792 15.9042 12.2875 15.7125C12.0958 15.5208 12 15.2833 12 15C12 14.7167 12.0958 14.4792 12.2875 14.2875C12.4792 14.0958 12.7167 14 13 14C13.2833 14 13.5208 14.0958 13.7125 14.2875C13.9042 14.4792 14 14.7167 14 15C14 15.2833 13.9042 15.5208 13.7125 15.7125C13.5208 15.9042 13.2833 16 13 16Z"
              fill="#1C1B1F" />
          </svg>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;