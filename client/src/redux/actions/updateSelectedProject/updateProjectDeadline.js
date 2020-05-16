export const UPDATE_PROJECT_DEADLINE  = 'UPDATE_PROJECT_DEADLINE';

const updateProjectDeadline = (deadline) => {
  return {
    type: UPDATE_PROJECT_DEADLINE,
    deadline
  }
}

export default updateProjectDeadline;