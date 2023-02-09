const agoraStatesDiscussions = 
fetch(`http://localhost:4000/discussions`)
.then(res => res.json())
.then(json => {
  json.map(discussion => {
    if (discussion.answer) {
      return {
        ...discussion,
        bodyHTML: DOMPurify.sanitize(discussion.bodyHTML),
        answer: {
          ...discussion.answer,
          bodyHTML: DOMPurify.sanitize(discussion.answer.bodyHTML)
        }
      }
    }
  
    return {
      ...discussion,
      bodyHTML: DOMPurify.sanitize(discussion.bodyHTML)
    }
  })
  // 함수 입력하고 json을 넣어줘야함..
})

//여기까진 했는데.. 이걸 어떻게 꺼내쥬...


// let agoraStatesDiscussions = 
//   // 더미데이터가 있었음

// 왜 배열에 map을 돌려쓰까? 이 map은 -> 배열 안 객체를 순회함. q&a의 답이 있는 경우엔 answer를 추가해줬음.....
//   .map(discussion => {
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
