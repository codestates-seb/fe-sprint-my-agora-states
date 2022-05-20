## 개요

---

게시판 만들기

## 새롭게 알게된 것

1. list-style-type:none; 을 해서 리스트 앞의 점을 없앰.
2. centering
   display:flex;
   justify-content:center;
   align-items: center;
   flex = 0 0 0;
   padding = 1rem;
3. HTML 에서 form action을 통해 데이터를 js파일로 받아서 사용할 수 있다.
4. DOM 요소를 조작하여 list를 갱신할 수 있음.
5. 'submit'버튼을 누르면 바로 새로고침이 일어나서 정보를 저장할 수 없는데 preventDefault()를 통해 방금 벌어진 일들의 정보를 얻을 수 있다.

## 어려움을 겪은 부분

1. ~~html 중첩구조일때 querySelector로 내가 원하는 데이터를 어떻게 뽑는지~~ 이 부분은 그냥 querySelector를 쓰지 않아도 되는 부분이였다.
2. ~~submit 버튼을 누를 때 왜 addEventListner로 등록한 게 잘 적용이 안되는지? 'click'으로 하면 잘만 적용된다..preventDefault()를 써도 잘 안됨.~~ submitBtn.~~addEventListner 함수를 만들 때 post라는 객체에 추가할 내용을 addEventLister 밖에(맨처음부분) 선언해주니까 해결됨~~
   나중에 다시 생겨서 다시 click으로 바꿈. 아직 원인불명
3. ~~unshift로 새로 생성한 게시물 post를 push로 밀어넣고 agorastatesdiscussions[0]엔 해당 post가 생성되었지만 그 후에 변화가 없음.~~

## 추후 구현해볼만 한 것

1. localstorage 를 이용해서 새로고침을 하더라도 데이터가 날아가지 않도록.
