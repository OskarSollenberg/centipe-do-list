export async function getTasks(setTasks) {
  const url = "https://centipe-do-list-server.vercel.app/tasks";
  //   const url = "http://localhost:3000/tasks";

  http: try {
    const res = await fetch(url, {
      method: "GET",
      withCredentials: true,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }
    const tasks = await res.json();
    setTasks(tasks);
  } catch (error) {
    console.error(error);
    // Handle the error in your UI here
  }
}

export async function deleteTask(task_id, fetchTasks) {
  const url = "https://centipe-do-list-server.vercel.app/task";
  //   const url = "http://localhost:3000/task";

  const task_id_json = { task_id: task_id };
  try {
    const res = await fetch(url, {
      method: "DELETE",
      withCredentials: true,
      body: JSON.stringify(task_id_json),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }
    fetchTasks();
  } catch (error) {
    console.error(error);
    // Handle the error in your UI here
  }
}

export async function editTask(task_id, fetchTasks, task) {
  const url = "https://centipe-do-list-server.vercel.app/task";
  //   const url = "http://localhost:3000/task";

  try {
    const res = await fetch(url, {
      method: "PUT",
      withCredentials: true,
      credentials: "include",
      body: JSON.stringify({ task_id: task_id, task: task }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }
    fetchTasks();
  } catch (error) {
    console.error(error);
    // Handle the error in your UI here
  }
}

export async function addTask(task, fetchTasks) {
  const url = "https://centipe-do-list-server.vercel.app/task";
  //   const url = "http://localhost:3000/task";

  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ task: task }),
      withCredentials: true,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }
    fetchTasks();
    console.log("added task");
  } catch (error) {
    console.error(error);
    // Handle the error in your UI here
  }
}
