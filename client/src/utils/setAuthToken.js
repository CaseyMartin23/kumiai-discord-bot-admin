import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    // set auth token on outgoing requests
    axios.defaults.headers.authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.authorization;
  }
};

export default setAuthToken;
