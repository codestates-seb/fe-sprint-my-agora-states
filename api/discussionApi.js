const SERVER_URL = 'http://localhost:4000';

const getDiscussions = async () => {
  let data = await fetch(`${SERVER_URL}/discussions`).then((res) => res.json());
  return data;
};
