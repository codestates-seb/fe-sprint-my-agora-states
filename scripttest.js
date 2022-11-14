let agoraStatesDiscussions = [];

const fetchAgoraStatesDiscussions = async () => {
  return await fetch("http://localhost:4000/discussions")
    .then((response) => response.json())
    .then(json => {
        agoraStatesDiscussions = json;
    });
}



console.log(agoraStatesDiscussions);

const list = document.querySelector('#list');