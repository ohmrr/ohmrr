import axios from 'axios';

const fetchUserData = async () => {
  const result = await axios.get('https://api.github.com/users/Ohmrrr');

  return result;
}

export default fetchUserData;