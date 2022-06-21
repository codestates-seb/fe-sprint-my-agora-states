// let agoraStatesDiscussions;
// async function getPromise () {
//   return fetch('http://localhost:3001/discussions').then(res=>res.json());
// }
// const promise = getPromise();
// const getData = async () => {
//   await promise.then((appData) => {
//     agoraStatesDiscussions = appData;
//     console.log(agoraStatesDiscussions)
//   });
// };

// getData()


// .map(discussion => {
//   if (discussion.answer) {
//     return {
//       ...discussion,
//       bodyHTML: DOMPurify.sanitize(discussion.bodyHTML),
//       answer: {
//         ...discussion.answer,
//         bodyHTML: DOMPurify.sanitize(discussion.answer.bodyHTML)
//       }
//     }
//   }

//   return {
//     ...discussion,
//     bodyHTML: DOMPurify.sanitize(discussion.bodyHTML)
//   }
// })
