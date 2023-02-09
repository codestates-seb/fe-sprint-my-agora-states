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

async function createDiscussions(obj) {
  const url = `http://localhost:4000/discussions/`;
  const data = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  }).then((res) => res.json());
  console.log(data);

  return data;
}

async function updateDiscussions(id, obj) {
  const url = `http://localhost:4000/discussions/${id}`;
  const data = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  }).then((res) => res.json());
  console.log(data);

  return data;
}

async function deleteDiscussions(id) {
  const url = `http://localhost:4000/discussions/${id}`;
  const data = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  console.log(data);

  return data;
}
