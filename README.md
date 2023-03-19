# fe-sprint-my-agora-states

## **Agora States Project**

자바스크립트의 기초 문법과 DOM조작법을 학습하고 이를 이용하여 질문 게시판 만들기 프로젝트를 진행했다.


<br>

---

## **프로젝트 개요**

  
이름과 제목, 내용을 입력하여 질문을 등록할 수 있다. localStorage를 사용하여 새로고침을 하여도 데이터가 저장되어 있다. localStorage를 이용하여 '좋아요'로 저장한 게시물을 따로 모아서 볼 수 있다. 더미 데이터에 있는 질문들의 내용은 외부링크로 접속하여 읽을 수 있다. 외부링크를 접속해야 하는 경우 질문을 클릭할 수 있게 하였고, 그렇지 않은 경우 클릭할 수 없다.  
페이지네이션을 구현하였다. 페이지 개수에 맞게 페이지 리스트가 렌더되게 하였고, 전체 게시물과 '좋아요'한 게시물 모두 페이지네이션이 적용되도록 하였다.  
사용 언어: JavaScript, HTML, CSS


배포 주소: [https://hahagarden.github.io/fe-sprint-my-agora-states/](https://hahagarden.github.io/fe-sprint-my-agora-states/)


<br>

---

## **핵심 기능**

### 1. JavaScript **createElement(), append()**

![image](https://user-images.githubusercontent.com/88613455/226166771-15f1e367-c350-4221-8e24-5aef9923b5d8.png)

위의 사진은 HTML문서의 결과이다. HTML은 input까지만 구현하였고 JavaScript로 DOM조작을 하며 HTML요소를 생성했다. createElement()로 생성하고자 하는 태그를 지정하고, 그 태그에 설정해주고 싶은 속성들을 할당해준다. 

```
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
```

div요소를 만들고 속성 className을 추가해주었다. 이제 이 태그는 다음과 같은 HTML태그가 될 것이다.

```
  <div class="discussion__avatar--wrapper"></div>
```

그러나 그 이전에, createElement()는 DOM 노드를 말그대로 '생성'해준 것이다. 아직 DOM tree에는 생성되지 않았다. DOM노드에 연결을 해주어야 DOM tree에 붙어 렌더된다.

```
const body = document.querySelector("body");
body.append(avatarWrapper);
```

내가 생성한 태그를 추가하고 싶은 부모 요소에 append()를 통해 추가한다.


<br>


### 2. JavaScript **LocalStorage**

질문을 등록하였는데, 새로고침하면 사라져있다. 데이터가 저장이 되지 않는다. 이를 저장하기 위해 로컬스토리지를 사용했다. 로컬스토리지는 데이터를 key와 value형태로 저장한다.

```
localStorage.setItem('key', JSON.stringify(value));
JSON.parse(localStorage.getItem('key'));
```

로컬스토리지는 위의 코드와 같이 사용한다. JSON형식으로 저장하기 위해 JSON객체의 내장메서드를 사용한다.  
나는 아래와 같은 방법으로 localStorage를 적용하였다.

-   **discussions 데이터**  
    1\. 로컬스토리지에 키 <discussions>이 없으면 더미데이터를 로컬스토리지 <discussions>의 값으로 저장한다.  
    2\. 로컬스토리지에 있는 <discussions>를 이용하기 위해 이것을 저장할 배열 변수 let discussions = \[\];를 만든다.  
    3\. 파일을 실행할 때마다 discussions = JSON.parse(localStorage.getItem('discussions')); 로 저장되어 있는 <discussions>를 할당한다.  
    4\. \[배열 discussions\]의 요소들은 각각 객체이며 이들은 질문의 작성자, 제목, 내용, 생성시간 등을 가지고 있다. 이들을 순회하며 화면에 렌더링한다.  
    5\. 새로운 질문을 작성하면 \[배열 discussions\]에 질문객체를 추가한 후 이것을 setItem을 통해 로컬스토리지의 <discussions>에 저장한다.  
    6\. 로컬스토리지를 세팅한다고 하여 브라우저가 새로고침이 되는 것은 아니므로 렌더링은 수동으로 해주었다. 새로운 질문에 대해 '임시로' createElement()를 통해 렌더링해주고, 페이지를 새로고침할 때에는 업데이트된 <discussions>이 모두 렌더링되어 새로운 질문이 추가되어있다.

-    **likes 데이터**  
    질문에 좋아요(담기) 기능을 추가하여 사용자가 나중에 모아서 볼 수 있도록 하였다. 좋아요 기능도 로컬스토리지를 사용하였다.  
      
    1\. 체크박스 요소 like를 체크하면 \[배열 discussions\]의 해당 요소객체의 like프로퍼티를 true로, 체크 해제하면 false로 재할당 한 뒤 \[배열 discussions\]를 로컬스토리지의 <discussions>에 업데이트한다.  
    2\. 새로고침을 안했을 때 화면을 나타내기 위해서 체크박스가 체크된 것은 CSS의 checked선택자를 이용해서 스타일링한다.  
    3\. 새로고침을 하면 처음에 \[배열 discussions\]에서 like프로퍼티가 true인 요소객체들을 따로 filter()를 사용하여 \[배열 likes\]에 할당한다. 그리고 like프로퍼티가 true인 요소객체들은 체크박스요소의 속성 checked를 true로, 반대의 경우 반대로 할당하여 체크박스 요소 like를 append한다. 속성이 checked인 요소들은 CSS의 checked선택자 스타일링이 적용된다.  
      
    4\. 좋아요 체크된 요소객체들만 모아서 보기 위해서 새로 이들만 렌더링을 한다. 렌더링을 하면 새로고침을 하는 것이 되므로 파일이 재실행되어 '내가 좋아요만 보겠다'는 명령이 사라진다. 명령을 저장하기 위해 로컬스토리지에 <filter-likes>를 불리언으로 저장한다.   
    5\. 좋아요만 모은 페이지를 보고싶다는 버튼을 클릭하면 filter-likes를 true/false로 재할당하는 클릭이벤트가 발생하고, 로컬스토리지의 <filter-likes>의 값이 true이면 \[배열 likes를\], false이면 \[배열 discussions\]을 순회하며 렌더링한다.
    
    
<br>


### 3. CSS **checkbox**

좋아요를 저장하기 위해 input\[type='checkbox'\]를 이용하였다. 체크가 되면 checked가 true가 되므로 css에서 checked선택자로 스타일링을 지정해주었다. 페이지를 렌더링 할 때에는 데이터의 like프로퍼티가 true이면 이 input요소의 checked속성을 수동으로 true를 지정해줌으로써 checked 스타일링이 적용되도록 하였다.

<br>

---

## **실패한 경험**

### 1. **매직넘버의 사용**

페이지네이션을 구현할 때, 페이지 리스트를 1~5, 6~10처럼 다섯페이지씩 띄우고 싶어서 pageCount=5로 설정했다. 그런데 한 페이지에 띄울 discussions 수도 5로 설정해서 둘을 혼동하여 코드를 작성하고 있었다. 결국 꼬였고 상수를 저장한 변수 discussionsPerPage를 따로 설정해줌으로써 해결했다. 리팩토링을 할 때 매직넘버를 사용하면 안된다고 했는데 그 이유를 잘 알 수 있었다. 작성하는 사람도 읽는 사람도 그 숫자가 무슨 일을 하는지 알 수 있도록 상수를 의미를 부여한 변수에 저장하고 그 변수를 사용해야 한다.

<br>


### 2. **느슨한 타입의 자바스크립트**

페이지네이션을 구현할 때, 현재페이지 값을 저장하는 currentPage에 페이지 버튼을 클릭하면 이벤트가 발생하여 textContent의 값을 할당하도록 했다. 그리고 1~5, 6~10 등 페이지 버튼들의 첫번째 값 firstNumber와 마지막값 lastNumber은 이 currentPage값을 가지고 계산한다. 곱셈 나눗셈은 문자열로 저장되어 있는 currentPage를 암묵적으로 형변환하여 숫자타입으로 잘 계산을 했다.

하지만 현재 페이지의 페이지 버튼에는 별도의 스타일링을 주기 위해서 pages\_\_container를 렌더할 때 현재 몇 페이지 버튼을 생성할 것인지 순회하기 위한 for루프 변수 number와 currentPage를 동치비교를 하는데 number는 숫자타입이고 currentPage는 문자열타입이라서 결과가 false가 되어 현재 페이지 스타일링이 적용이 안되었다.

**페이지 버튼을 li엘리먼트로 생성할 때 textContent에 숫자형으로 변환하여 할당함**으로써 해결하였다.  
숫자형으로 변환하지 않고도 가능하다. 위에서 언급한 for루프 변수 number와 currentPage를 비교하는 것이 아니라 textContent와 currentPage를 비교하면 추가 작업 필요없이 문자열끼리 비교하여 원하는 결과를 얻을 수는 있지만, 문자열로 저장을 해도 되는 이유는 페이지 변수들을 연산할 때 currentPage가 암묵적으로 숫자로 형변환되어 가능한 것이기 때문에 숫자로 저장하는 것이 더 타당하다고 생각하여 형변환을 해주었다.

<br>

---

## **개선사항**

1.  ~페이지네이션 기능을 추가하고 싶다. 도전 중이다.~ 페이지네이션 기능을 추가하였다. ✅

<br>


2\. ~모바일로 접속을 했더니 '좋아요' 버튼이 스타일링이 적용이 안되는 이모지로 되어있었다. 노트북과 데스크탑에서는 색깔이 변했는데 모바일에서는 모두 ❤️이모티콘으로 떴다.~ 특수문자인 하트로 수정하고 색깔을 변경하는 스타일링을 적용함으로써 해결했다. ✅


![1](https://user-images.githubusercontent.com/88613455/226166956-0a469733-5143-4abd-b480-2a6a84539784.gif)
![2](https://user-images.githubusercontent.com/88613455/226166983-3bb677ff-171c-40d5-ad4d-a334e1d999d9.gif)


<br>

3\. 페이지네이션 기능을 추가하였는데 1페이지가 아닌 다른 페이지에 있는 상태에서 '좋아요' 목록을 렌더링하려고 하면 아무 것도 렌더링되지 않는다. 오류가 뜨진 않아서 코드에서 빠진 부분이 있는 것 같다. 다음과 같다.


![3](https://user-images.githubusercontent.com/88613455/226167017-a212a586-1a1b-42f6-a647-4e3c02659e87.gif)

<br>

4\. 새 질문을 등록하면 한 페이지에 6개의 데이터만 뜨도록 했는데 적용이 안된다. li가 계속 늘어난다. 임시로 li 엘리먼트를 생성할 때 ul에 prepend하는 방식이라서 개수 설정이 작용을 안하는 것 같다. 다음과 같다.

![4](https://user-images.githubusercontent.com/88613455/226167030-dc79d322-ebd7-4d64-b8e1-78f009276413.gif)

<br>

---

## **느낀점**

DOM조작을 연습할 수 있었고, 스타일링을 하며 flex, float, position 등 CSS연습도 많이 되었다. 질문 게시판 하나도 수많은 클래스와 아이디가 있고 그것들을 셀렉터로 지정하고 옵션을 주는 경우의 수도 상당했다. 거대한 프로젝트는 이런 게시판이 여러 개이고 더욱 요소도 많을텐데, 그래서 가독성과 네이밍컨벤션이 매우 중요한 것 같다.

그리고 로컬스토리지를 사용하여 데이터를 저장하면서 웹페이지다운 웹페이지를 만드는 것 같아서 재미있었다. 상태가 바뀌면 자동으로 리렌더링되는 상태관리 라이브러리의 편리함과 필요성을 느꼈다.

또한 와이어프레임을 디자인을 구상하는 정도로만 구축하고 나중에 구현하면서 조금씩 기능을 추가했는데, 중간에 특히 페이지네이션을 도전하면서 좋아요기능과 discussion데이터를 렌더링하는 것까지 고려해야 하여 복잡해졌다. 설계는 중요하다... 그러나 아직 배우는 단계이고 로컬스토리지도 써보는 의미의 프로젝트였기 때문에 처음부터 설계를 해도 중간에 분명히 계속 수정이 필요했을 것이다. 깨달음을 토대로 한 달정도 후에는 와이어프레임을 잘 작성하고 설계도대로 프로젝트를 완성하는 연습을 할 것이다.

또한 크롬 캐쉬데이터때문인지 배포 페이지에 업데이트 버전이 반영이 안되는 문제가 있었다. 아래의 포스팅에 해결 방법을 기록하였다.

 [Github Pages 배포 성공했는데 내용 업데이트가 안됨(시크릿 창에서는 됨) 해결(feat. Chrome)](https://hahagarden.tistory.com/108)

<br>

---

## **전체 코드**

 [GitHub - hahagarden/fe-sprint-my-agora-states: 나만의 아고라 스테이츠 만들기](https://github.com/hahagarden/fe-sprint-my-agora-states)
