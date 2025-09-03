import axios from 'axios';

const API_URL = 'http://localhost:8080/api/stats';

const getStats = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export default { getStats }; 