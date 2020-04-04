export const REQUEST_RESET = 'REQUEST_RESET';

const requestReset = (requestStatus) => {
  return {
    type: REQUEST_RESET,
    requestStatus
  }
}

export default requestReset;