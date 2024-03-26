import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  getTasks,
  addTask,
  editTask,
  deleteTask,
} from "../services/useTasksApi";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import anime from "animejs";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

export default function Main() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const param = useParams();
  const username = param.user;
  const [editingTask, setEditingTask] = useState(false);
  const [editTaskIndex, setEditTaskIndex] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const taskInput = useRef();

  useEffect(() => {
    fetchTasks();

    const intervalID = setInterval(legsMoving, 20000);
    return () => clearInterval(intervalID);
  }, []);

  async function fetchTasks() {
    getTasks(setTasks);
  }

  function handleAdd() {
    if (taskInput.current.value) {
      const newTask = taskInput.current.value.trim();
      addTask(newTask, fetchTasks);
      taskInput.current.value = "";
    }
  }

  function handleEditTask(index) {
    taskInput.current.value = tasks[index].task;
  }

  function handleDelete(index) {
    deleteTask(tasks[index].task_id, fetchTasks);
  }

  function handleEdit() {
    setEditingTask((prev) => !prev);
    const editedTask = taskInput.current.value;
    editTask(tasks[editTaskIndex].task_id, fetchTasks, editedTask);
    taskInput.current.value = "";
  }

  async function handleLogout() {
    const url = "http://localhost:3000/logout";

    try {
      const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        console.log("res STATUS: " + res.status);
        navigate("/");
      } else {
        alert("Failed to logout");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function legsMoving() {
    anime({
      targets: ".legs",
      marginLeft: [
        { value: ".5em", easing: "easeOutSine", duration: 200 },
        { value: "0", easing: "easeInOutQuad", duration: 200 },
        { value: ".5em", easing: "easeOutSine", duration: 200 },
        { value: "0", easing: "easeInOutQuad", duration: 200 },
      ],
      marginRight: [
        { value: ".5em", easing: "easeOutSine", duration: 200 },
        { value: "0", easing: "easeInOutQuad", duration: 200 },
        { value: ".5em", easing: "easeOutSine", duration: 200 },
        { value: "0", easing: "easeInOutQuad", duration: 200 },
      ],
      delay: anime.stagger(60, { grid: [20, 20], from: "center" }),
    });
  }

  return (
    <main className=" bg-main w-full h-screen  bg-bg overflow-hidden">
      <div className=" mx-auto ">
        <div className=" mx-auto max-w-[45em] pt-6  px-10 ">
          {/* antennas */}
          <div className="flex justify-between -mx-4 h-16 -mb-4">
            <div className=" w-[20%]  border-solid border-border border-r-borderThickness border-t-borderThickness border-bug rounded-tr-lg"></div>
            <div className=" w-[20%]  border-solid border-border border-l-borderThickness border-t-borderThickness rounded-tl-lg  border-bug"></div>
          </div>

          {/* head */}
          <div className=" bg-bug rounded-tl-[4em] rounded-tr-[4em] flex items-center  border-b-0 overflow-hidden text-text py-4">
            <div className=" w-[3em] bg-eyes h-[6em] rounded-tr-full rounded-br-full"></div>
            <div className=" mx-auto p-4 w-[80%] text-center">
              <h1 className="text-3xl sm:text-6xl font-extrabold uppercase font-todo tracking-wider">
                {username}
              </h1>
              <p className=" text-base sm:text-xl font-bold mb-4 uppercase">
                You have a {tasks.length}ipede
              </p>
              <div className="flex rounded-full overflow-hidden">
                <input
                  type="text"
                  placeholder="Add something todo for a longer-pede"
                  ref={taskInput}
                  className=" text-sm sm:text-base flex-1 px-4 py-2 bg-bugSecondary h-full "
                />
                {editingTask ? (
                  <button
                    onClick={handleEdit}
                    className=" bg-bugSecondary brightness-110 w-10 flex justify-center items-center"
                  >
                    <FaCheck />
                  </button>
                ) : (
                  <button
                    onClick={handleAdd}
                    className=" bg-bugSecondary brightness-110 w-10 flex justify-center items-center"
                  >
                    <IoMdAdd />
                  </button>
                )}
              </div>
            </div>
            <div className=" w-[3em] bg-eyes h-[6em] rounded-tl-full rounded-bl-full"></div>
          </div>
        </div>

        {/* body */}
        <div className=" mx-auto w-full overflow-scroll pb-16 h-[68vh] px-10 ">
          <ul className="text-left mx-auto">
            {tasks
              ? tasks.map((task, index) => (
                  <div className=" flex items-end relative max-w-[40em] mx-auto">
                    <div className=" legs absolute -left-8 h-8 w-12 border-solid border-border border-l-borderThickness2 border-t-borderThickness2 rounded-tl-md  border-bug l-4 t-0 "></div>
                    <div className=" legs absolute -right-8 h-8 w-12  border-solid border-border border-r-borderThickness2 border-t-borderThickness2 border-bug l-4 t-0 rounded-tr-md"></div>
                    <li
                      key={index}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      style={{
                        filter: isHovered
                          ? "brightness(110%)"
                          : "brightness(100%)",
                      }}
                      className=" flex justify-between items-center py-2 pl-6 border-solid border-t-2 border-y-bugSecondary  relative w-full bg-bug h-[3em] transition duration-200 overflow-hidden"
                    >
                      <span className=" w-[80%] text-text font-semibold ">
                        {task.task}
                      </span>
                      <div className=" pr-3 flex">
                        {isHovered ? (
                          <>
                            <button
                              onClick={() => {
                                handleEditTask(index);
                                setEditingTask((prev) => !prev);
                                setEditTaskIndex(index);
                              }}
                              className="bg-bg w-[2em] h-[2em] mr-2 rounded-full hover:bg-blue-400  transition duration-200 flex justify-center items-center "
                            >
                              <MdEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-bg  w-[2em] h-[2em] mr-2 rounded-full hover:bg-eyes hover:text-bg transition duration-200 flex justify-center items-center"
                            >
                              <MdDelete />
                            </button>
                          </>
                        ) : null}
                      </div>
                    </li>
                  </div>
                ))
              : ""}
          </ul>
          <div className=" mx-auto bg-bug p-4 rounded-bl-[4em] rounded-br-[4em] flex justify-center border-solid border-t-2 border-bugSecondary max-w-[40em]">
            <button
              onClick={handleLogout}
              className=" py-2 text-text font-semibold rounded-full bg-bugSecondary  hover:bg-eyes hover:text-bg transition duration-200 px-4"
            >
              LOG OUT
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
