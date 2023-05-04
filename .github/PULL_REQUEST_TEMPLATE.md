# Description

Section1에서 배운 내용을 총 동원하여 나만의 멋진 아고라 스테이츠를 만듭니다.

- [코드스테이츠 fe-sprint-my-agora-states 리포지토리](https://github.com/codestates-seb/fe-sprint-my-agora-states)에서 자신의 리포지토리로 fork후 과제 진행합니다.

## 🔹 배포 링크

Github Page 배포 링크를 아래 작성합니다.

## 🔹 Bare Minimum Requirement Self Checklist

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

## 🔹 Advanced Challenge Self Checklist

- [x] 현지 시간 적용
  - [x] 샘플 시간을 잘 변형하여, 현지 시간에 맞게 표현합니다. (ex. 오전 10:02:17)
- [x] 페이지네이션 기능
  - [x] 페이지네이션에 대해서 스스로 학습합니다.
  - [x] 한 페이지에 10개씩 디스커션이 보여야 합니다.
  - [x] 다음 페이지로 넘어갈 수 있어야 합니다.
  - [x] 이전 페이지로 돌아올 수 있어야 합니다.
  - [x] 다음 페이지가 없거나, 이전 페이지가 없는 경우 페이지를 유지해야 합니다.
- [x] 디스커션 유지 기능
  - [x] LocalStorage에 대해서 스스로 학습하고, 새롭게 추가하는 Discussion이 페이지를 새로고침해도 유지되도록 제작합니다.

### 🔹 My Own Self Checklist

- [x] 관심사의 분리
  - [x] MVP 패턴에서 착안하여 목적에 따라 js 파일을 모듈화합니다.
    - [x] app.js에는 이벤트 등록처럼 controller로서 호출할 메서드를 정의합니다.
    - [x] render.js에는 view로서 화면 렌더링에 관련된 메서드를 정의합니다.
    - [x] state.js에는 model로서 사용자의 상호작용에 따라 상태를 조작하는 메서드를 정의합니다.
- [x] 성공 메시지 출력 기능
  - [x] submit 이벤트 발생 시 페이지 상단에 고정되어 4초간 나타났다가 사라지는 성공 메시지를 렌더링합니다.
  - [x] 성공 메시지가 사라질 때 단순히 CSS로만 사라지는 것이 아니라 DOM Tree 상에서도 제거되어야 합니다.
- [x] Dark mode 전환 기능
  - [x] toggle 버튼을 클릭할 때마다 Light mode 또는 Dark mode로 전환합니다.
  - [x] 새로고침을 하더라도 이전의 mode 값을 기억하여 유지합니다.
- [x] Go to top 버튼 구현
  - [x] scroll 이벤트를 캐치하여 scroll 좌표의 Y 값이 일정 이상인 경우 Go to top 버튼을 나타나게 합니다.
  - [x] lodash 라이브러리의 throttle을 이용하여 너무 많이 발생하는 스크롤 이벤트를 제한합니다.
  - [x] Go to top 버튼을 클릭하면 페이지 최상단으로 부드럽게 이동하도록 구현합니다.

### 🔹 배포 시연 화면

📌 질문 등록
![image](https://s3.ap-northeast-2.amazonaws.com/urclass-images/NB0JkuHQnLg8X1woSRS84-1652915757557.gif)

📌 페이지네이션

📌 모드 전환

📌 상단 이동 버튼

### 🔹 가장 자랑하고 싶은 기능

> localStorage를 사용하는 김에 모드 전환 기능을 추가적으로 구현해 보았습니다. toggle 버튼 UI도 마음에 들고 기능도 잘 구현된 것 같아서 만족스럽습니다 😊
