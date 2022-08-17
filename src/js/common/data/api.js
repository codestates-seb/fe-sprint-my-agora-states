export const fetchDiscussions = async () => {
  const URL = `http://localhost:4000/discussions`;
  // const URL = `http://ec2-13-124-90-231.ap-northeast-2.compute.amazonaws.com:81/flight`;

  try {
    const response = await fetch(URL)
      .then((res) => res.json())
      .then((data) => data);

    return response;
  } catch (err) {
    const errorMessage = 'fail to fetch api';

    console.error(errorMessage);
  }
};
