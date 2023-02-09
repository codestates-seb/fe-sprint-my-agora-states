function getDiscussions() {
  const url = "http://localhost:4000/discussions";
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

function getFilteredDiscussions(id) {
  const url = `http://localhost:4000/discussions/${id}`;
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

function createDiscussions(obj) {
  const url = `http://localhost:4000/discussions/`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  }).then((res) => res.json());
}

function updateDiscussions(id, obj) {
  const url = `http://localhost:4000/discussions/${id}`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  }).then((res) => res.json());
}

function deleteDiscussions(id) {
  const url = `http://localhost:4000/discussions/${id}`;
  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}
