# Description

Section1에서 배운 내용을 총 동원하여 나만의 멋진 아고라 스테이츠를 만듭니다.

- [코드스테이츠 fe-sprint-my-agora-states 리포지토리](https://github.com/codestates-seb/fe-sprint-my-agora-states)에서 자신의 리포지토리로 fork후 과제 진행합니다.

## 배포 링크

Github Page 배포 링크를 아래 작성합니다.

https://jeongjwon.github.io/fe-sprint-my-agora-states/

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
    - [x] 다음 페이지로 넘어갈 수 있어야 합니다.
    - [x] 이전 페이지로 돌아올 수 있어야 합니다.
    - [x] 다음 페이지가 없거나, 이전 페이지가 없는 경우 페이지를 유지해야 합니다.
- [x] 디스커션 유지 기능
    - [x] LocalStorage에 대해서 스스로 학습하고, 새롭게 추가하는 Discussion이 페이지를 새로고침해도 유지되도록 제작합니다.

### My Own Self Checklist

자신이 추가로 더 구현한 기능이 있으면 아래 적어주세요.

- [x] notice 의견과 non-notice 의견 구분하여 배치하였다.
- [x] notice 의견을 토글로 하여 펼쳤다가 접을 수 있다.
- [x] scroll 시 top 버튼을 나타나게 하여 클릭시 화면 상단으로 이동할 수 있다.
- [x] 의견 등록 시간(초, 분, 시간, 일)을 구분하여 다르게 표시하였다.

### 배포 시연 화면

아래 예시를 지우고, 자신의 과제 시연 화면을 추가합니다.

![나만의 아고라 스테이츠 ](https://user-images.githubusercontent.com/76391160/224248534-accf0757-ce2f-4559-86f4-67bd90ab0a12.gif)
 
### 가장 자랑하고 싶은 기능

> notice 의견을 나누어 토글로 펼쳤다 접었다.

### 구현하고 싶었는데 하지 못한 아쉬운 기능

> 검색창을 만들긴 했는데 기능적으로 구현하는 데 있어서 한계가 있었다. 

### 도움을 받고 싶은 부분

> 검색하기 위해서 페이지네이션 때문에 각 페이지에 해당 검색 조건에 해당되는 의견들만 표시되면 어떻게 하죠?
    예를 들자면 현재 한 페이지당 10개의 의견이 보이고 있고, 조건에 해당하는 것이 3개의 의견이라면 뒷페이지에 조건이 해당되는 의견들이 앞으로 와야하는데, 
    이를 새로운 배열로 구현을 하자니 머릿속이 복잡해집니다.
