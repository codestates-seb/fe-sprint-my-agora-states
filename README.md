# Description

Section1에서 배운 내용을 총 동원하여 나만의 멋진 아고라 스테이츠를 만듭니다.

- [코드스테이츠 fe-sprint-my-agora-states 리포지토리](https://github.com/codestates-seb/fe-sprint-my-agora-states)에서 자신의 리포지토리로 fork후 과제 진행합니다.

## 배포 링크

Github Page 배포 링크를 아래 작성합니다.
https://aroma-oh.github.io/fe-sprint-my-agora-states/

## Bare Minimum Requirement Self Checklist

스스로 구현 완료한 부분까지 체크하여 제출합니다.

- [x] 디스커션 나열 기능
    - [x] `script.js`를 수정하여 `agoraStatesDiscussions` 배열의 데이터를 나열할 수 있게 구현합니다.
- [x] CSS
    - [x] 아고라 스테이츠 질문 리스트가 중앙으로 와야 합니다.
    - [x] `style.css`를 수정하여 멋지고 아름답게 나만의 아고라 스테이츠를 꾸밉니다.
    - [x] [colorhunt](https://colorhunt.co/palettes/popular), [dribbble](https://dribbble.com/)에서 적절한 색 조합, 디자인을 참고합니다.
- [x] 디스커션 추가 기능
    - [x] `script.js`를 수정하여 디스커션 추가 기능을 구현합니다.
    - [x] `section.form__container` 요소에 새로운 아고라 스테이츠 질문을 추가할 수 있는 입력 폼을 제작합니다. 형식은 자유입니다.
    - [x] 아이디, 본문을 입력하고 버튼을 누르면 실제 화면에 디스커션이 추가되어야 합니다.
    - [x] `agoraStatesDiscussions` 배열에 추가한 데이터가 실제 쌓여야 합니다.
- [x] Github Page 배포
  - [x] Github Page 배포 기능을 이용하여 누구나 볼 수 있게 배포합니다.
- [x] [코드스테이츠 fe-sprint-my-agora-states 리포지토리](https://github.com/codestates-seb/fe-sprint-my-agora-states)로 Pull Request
  - [x] 나만의 아고라 스테이츠를 코드스테이츠 깃허브에 Pull request합니다.
  - [x] 주어진 Pull request 형식에 따라주세요.

## Advanced Challenge Self Checklist

스스로 구현 완료한 부분까지 체크하여 제출합니다.

- [x] 현지 시간 적용
    - [x] 샘플 시간을 잘 변형하여, 현지 시간에 맞게 표현합니다. (ex. 오전 10:02:17)
- [x] 페이지네이션 기능
    - [x] 페이지네이션에 대해서 스스로 학습합니다.
    - [x] 한 페이지에 10개씩 디스커션이 보여야 합니다.
    - [ ] 다음 페이지로 넘어갈 수 있어야 합니다.
    - [ ] 이전 페이지로 돌아올 수 있어야 합니다.
    - [ ] 다음 페이지가 없거나, 이전 페이지가 없는 경우 페이지를 유지해야 합니다.
- [ ] 디스커션 유지 기능
    - [ ] LocalStorage에 대해서 스스로 학습하고, 새롭게 추가하는 Discussion이 페이지를 새로고침해도 유지되도록 제작합니다.

### My Own Self Checklist

자신이 추가로 더 구현한 기능이 있으면 아래 적어주세요.

- [x] title 줄바꿈이 box의 width에의해 강제 개행되어, 문자열의 공백 기준으로 변경함
```
word-break: keep-all; 
```
- 변경 전 
![](https://velog.velcdn.com/images/on002way/post/5e16bd56-7866-44ff-8a7e-b6e813727968/image.png)
- 변경 후
![](https://velog.velcdn.com/images/on002way/post/d8dffd35-f7e8-4d83-87bd-6abd481b8d75/image.png)

### 배포 시연 화면
* 페이지네이션
![paging](https://user-images.githubusercontent.com/115550622/211486703-76e1fbb5-91bd-4049-b4d4-75dc0ae2e4b8.GIF)
* 디스커션 추가
![newDate](https://user-images.githubusercontent.com/115550622/211486742-8c7885a8-f31e-4491-a818-2e28b6a4fa42.GIF)
* 디스커션 유지는 구현하지 못함
![stayDate](https://user-images.githubusercontent.com/115550622/211486778-dc11aafb-6858-41cb-b806-530a585cc48e.GIF)

### 가장 자랑하고 싶은 기능

> 답변 여부를 채워진 원과 비어있는 원으로 구분하였는데, 디자인이 마음에듭니다! 
<img width="566" alt="image" src="https://user-images.githubusercontent.com/115550622/211485124-30e819bd-07fd-4a85-97dc-0a22e9361acd.png">

### 구현하고 싶었는데 하지 못한 아쉬운 기능

> 1. 페이지네이션의 이전, 다음 버튼을 추가하지 못했습니다.
> 2. notice content는 따로 보여주고 싶습니다.
> 3. discussions와 form을 화면에 2분할하는 레이아웃으로 변경하고 싶습니다. 
> 4. 3번 페이지를 누르면 컨텐츠 차이로 인해 약간의 화면 이동이 발생합니다. 
> 5. 마지막 페이지를 조회하면 컨텐츠가 적어 화면 맨 밑 그라데이션이 깨집니다. 

### 도움을 받고 싶은 부분

> 새로고침 후에도, 새로 생성한 디스커션(=>newDate) 노출이 계속되도록 하고싶습니다. (Advanced 디스커션 유지기능)

* 시도한 방법
: 로컬스토리지에 데이터를 저장한 후에 새로고침 이벤트가 발생하면 해당 데이터를 ul에 prepend한다.
* 문제상황
: 새로고침 이벤트가 감지되지 않아 prepend가 되고있지 않음

> submit 이벤트에 아래의 함수를 넣어 로컬스토리지에 newDate가 저장되며, 호출됨을 확인했습니다. 
```
function saveLocal(name, newData){
  const add = localStorage.setItem(name, JSON.stringify(newData));
}
const keysLocal = [];
function outLocal(name){
  const added = JSON.parse(localStorage.getItem(name));
  agoraStatesDiscussions.unshift(added);
  keysLocal.unshift(added);
}
```
> 새로 고침 후 재랜더링된 디스커션 배열에, 로컬스토리지에 저장한 newDate를 append하였지만 작동하지 않습니다. 
(console.log로 확인결과 아래의 함수는 호출되고 있지 않습니다.) 
```
window.onbeforeunload = function() {
  for(i = 0; i < keysLocal.length; i++){
    ul.prepend(convertToDiscussion(keysLocal[i]));
  }
};
```
