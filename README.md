## 배포 시연 화면

![presentation_light](https://user-images.githubusercontent.com/65957855/224229430-b29939fc-14ba-4eee-8ebf-cab7d8346b62.gif)

## Bare Minimum Requirement Self Checklist

스스로 구현 완료한 부분까지 체크하여 제출합니다.

-   [x] 디스커션 나열 기능
    -   [x] `script.js`를 수정하여 `agoraStatesDiscussions` 배열의 데이터를 나열할 수 있게 구현합니다.
-   [x] CSS
    -   [ ] 아고라 스테이츠 질문 리스트가 중앙으로 와야 합니다.
    -   [x] `style.css`를 수정하여 멋지고 아름답게 나만의 아고라 스테이츠를 꾸밉니다.
    -   [ ] [colorhunt](https://colorhunt.co/palettes/popular), [dribbble](https://dribbble.com/)에서 적절한 색 조합, 디자인을 참고합니다.
-   [x] 디스커션 추가 기능
    -   [x] `script.js`를 수정하여 디스커션 추가 기능을 구현합니다.
    -   [x] `section.form__container` 요소에 새로운 아고라 스테이츠 질문을 추가할 수 있는 입력 폼을 제작합니다. 형식은 자유입니다.
    -   [x] 아이디, 본문을 입력하고 버튼을 누르면 실제 화면에 디스커션이 추가되어야 합니다.
    -   [ ] `agoraStatesDiscussions` 배열에 추가한 데이터가 실제 쌓여야 합니다.
-   [x] Github Page 배포
    -   [x] Github Page 배포 기능을 이용하여 누구나 볼 수 있게 배포합니다.
-   [x] [코드스테이츠 fe-sprint-my-agora-states 리포지토리](https://github.com/codestates-seb/fe-sprint-my-agora-states)로 Pull Request
    -   [x] 나만의 아고라 스테이츠를 코드스테이츠 깃허브에 Pull request합니다.
    -   [x] 주어진 Pull request 형식에 따라주세요.

## Advanced Challenge Self Checklist

스스로 구현 완료한 부분까지 체크하여 제출합니다.

-   [x] 현지 시간 적용
    -   [ ] 샘플 시간을 잘 변형하여, 현지 시간에 맞게 표현합니다. (ex. 오전 10:02:17)
-   [ ] 페이지네이션 기능
    -   [ ] 페이지네이션에 대해서 스스로 학습합니다.
    -   [ ] 한 페이지에 10개씩 디스커션이 보여야 합니다.
    -   [ ] 다음 페이지로 넘어갈 수 있어야 합니다.
    -   [ ] 이전 페이지로 돌아올 수 있어야 합니다.
    -   [x] 다음 페이지가 없거나, 이전 페이지가 없는 경우 페이지를 유지해야 합니다.
-   [ ] 디스커션 유지 기능
    -   [ ] LocalStorage에 대해서 스스로 학습하고, 새롭게 추가하는 Discussion이 페이지를 새로고침해도 유지되도록 제작합니다.

### My Own Self Checklist

자신이 추가로 더 구현한 기능이 있으면 아래 적어주세요.

-   [x] 답변 있음 / 답변 없음 구분
    -   [x] 답변 없는 질문 : 불투명도 100% (눈에 더 잘 띄게 하기 위해)
    -   [x] 답변 있는 질문 : 불투명도 50%
-   [x] 기존 디스커션의 제목을 클릭하면 원본 링크로 날아감
-   [x] 새 디스커션의 제목을 클릭하면 모랄창이 열림
    -   [x] 프사, 제목, 닉네임, 날짜/시간, 내용 모두 표시
-   [x] 스크롤을 내리면 배경이 어두워짐 (연안 → 심해)

### 구현하고 싶었는데 하지 못한 아쉬운 기능

> 전체적인 디자인 개선 필요: 특히 디스커션 입력창 부분이 상당히 촌스러움.
> 디스커션이 안 겹치도록 개선 필요
> 디스커션이 날아가는 부분에 대해 랜덤성 강화
> 세로 스크롤이 필요 없도록 개선
> 입력한 질문에 대한 답변을 달 수 있도록 개선
> 입력한 질문/답변이 DB에 저장되도록 개선
