async function getDiscussions() {
  const url = "http://localhost:4000/discussions";
  const data = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  console.log(data);

  return data;
}

async function getFilteredDiscussions(id) {
  const url = `http://localhost:4000/discussions/${id}`;
  const data = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  console.log(data);

  return data;
}
