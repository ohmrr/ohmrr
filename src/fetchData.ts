import axios from 'axios';

const fetchData = async (url: string) => {
  const result: Record<string, unknown> = (await axios.get(
    url
  )).data;

  return result;
};

export default fetchData;