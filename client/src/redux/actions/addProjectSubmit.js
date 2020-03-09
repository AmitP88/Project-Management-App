export const ADD_PROJECT_SUBMIT = "ADD_PROJECT_SUBMIT";

const addProjectSubmit = (name, deadline) => {
  return {
    type: ADD_PROJECT_SUBMIT,
    name,
    deadline
  }
};

export default addProjectSubmit;