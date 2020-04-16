export const GET_SELECTED_PROJECT = "GET_SELECTED_PROJECT";

const getSelectedProject = (_id, name, deadline, tasks_completed, total_tasks) => {
  return {
    type: GET_SELECTED_PROJECT,
    _id,
    name,
    deadline,
    tasks_completed,
    total_tasks
  }
}

export default getSelectedProject;