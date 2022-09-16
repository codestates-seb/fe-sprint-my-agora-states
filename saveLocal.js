const question__KEY = "question";

// lacalstorage에 저장하기 ---> 저장할 때 string으로 저장해야하기 때문에 객체를 문자열로 바꾸는 과정 필요
const saveQuestion = () => {
    localStorage.setItem(question__KEY, JSON.stringify(agoraStatesDiscussions));
}

// lacalstorage에 저장된 내용을 불러오기
const savedQuestion = localStorage.getItem(question__KEY);

// lacalstorage에서 불러온 문자열을 다시 객체로 바꾸기
// lacalstorage에 저장된 내용이 비어있다면, null을 반환하기 때문에 if문을 사용
if(savedQuestion){
    const parsedQuestion = JSON.parse(savedQuestion);
    agoraStatesDiscussions = parsedQuestion;
    parsedQuestion.forEach(element => {
        DisplayList(parsedQuestion, ul, rows, current_page);
    });
}



// localstorage에서 저장된 내용을 가져오기 ---> localStorage.getItem()
// array, object를 string으로 바꾸기 --> JSON.stringify()
// string을 array로 바꾸기 ---> JSON.parse()
// forEach는 array의 각 item에 대해 function을 실행하게 해준다.

