## 배포 링크

### 배포 시연 화면

## Bare Minimum Requirement Self Checklist

- [v] 디스커션 나열 기능
  - [v] `script.js`를 수정하여 `(agoraStatesDiscussions(discussions))` 배열의 데이터를 나열할 수 있게 구현합니다.
- [v] CSS
  - [v] 아고라 스테이츠 질문 리스트가 중앙으로 와야 합니다.
  - [v] `style.css`를 수정하여 멋지고 아름답게 나만의 아고라 스테이츠를 꾸밉니다.
  - [v] [colorhunt](https://colorhunt.co/palettes/popular), [dribbble](https://dribbble.com/)에서 적절한 색 조합, 디자인을 참고합니다.
- [v] 디스커션 추가 기능
  - [v] `script.js`를 수정하여 디스커션 추가 기능을 구현합니다.
  - [v] `section.form__container` 요소에 새로운 아고라 스테이츠 질문을 추가할 수 있는 입력 폼을 제작합니다. 형식은 자유입니다.
  - [v] 아이디, 본문을 입력하고 버튼을 누르면 실제 화면에 디스커션이 추가되어야 합니다.
  - [v] `agoraStatesDiscussions(discussions)` 배열에 추가한 데이터가 실제 쌓여야 합니다.
- [ ] Github Page 배포
  - [ ] Github Page 배포 기능을 이용하여 누구나 볼 수 있게 배포합니다.

## Advanced Challenge Self Checklist

- [v] 현지 시간 적용
  - [v] 샘플 시간을 잘 변형하여, 현지 시간에 맞게 표현합니다. (ex. 오전 10:02:17)
- [ ] 페이지네이션 기능
  - [ ] 페이지네이션에 대해서 스스로 학습합니다.
  - [ ] 한 페이지에 10개씩 디스커션이 보여야 합니다.
  - [ ] 다음 페이지로 넘어갈 수 있어야 합니다.
  - [ ] 이전 페이지로 돌아올 수 있어야 합니다.
  - [ ] 다음 페이지가 없거나, 이전 페이지가 없는 경우 페이지를 유지해야 합니다.
- [ ] 디스커션 유지 기능
  - [ ] LocalStorage에 대해서 스스로 학습하고, 새롭게 추가하는 Discussion이 페이지를 새로고침해도 유지되도록 제작합니다.

### My Own Self Checklist

- [v] 새로운 디스커션 추가할 때 모달창을 띄워서 입력
- [v] 모달창에 있는 input 값들의 유효성이 통과 되었을 때 submit 할 수 있도록 처리
- [v] createAt의 데이터 형식을 변환하는 함수를 만들어서 적용

