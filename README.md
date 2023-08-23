# fe-sprint-my-agora-states
# Description

Section1에서 배운 내용을 총 동원하여 나만의 멋진 아고라 스테이츠를 만듭니다.

- [코드스테이츠 fe-sprint-my-agora-states 리포지토리](https://github.com/codestates-seb/fe-sprint-my-agora-states)에서 자신의 리포지토리로 fork후 과제 진행합니다.

## 배포 링크

Github Page 배포 링크를 아래 작성합니다.
> https://jieun419.github.io/fe-sprint-my-agora-states/

## Bare Minimum Requirement Self Checklist

스스로 구현 완료한 부분까지 체크하여 제출합니다.

- [ o ] 디스커션 나열 기능
    - [ o ] `script.js`를 수정하여 `agoraStatesDiscussions` 배열의 데이터를 나열할 수 있게 구현합니다.
- [ o ] CSS
    - [ o ] 아고라 스테이츠 질문 리스트가 중앙으로 와야 합니다.
    - [ o ] `style.css`를 수정하여 멋지고 아름답게 나만의 아고라 스테이츠를 꾸밉니다.
    - [ o ] [colorhunt](https://colorhunt.co/palettes/popular), [dribbble](https://dribbble.com/)에서 적절한 색 조합, 디자인을 참고합니다.
- [ o ] 디스커션 추가 기능
    - [ o ] `script.js`를 수정하여 디스커션 추가 기능을 구현합니다.
    - [ o ] `section.form__container` 요소에 새로운 아고라 스테이츠 질문을 추가할 수 있는 입력 폼을 제작합니다. 형식은 자유입니다.
    - [ o ] 아이디, 본문을 입력하고 버튼을 누르면 실제 화면에 디스커션이 추가되어야 합니다.
    - [ o ] `agoraStatesDiscussions` 배열에 추가한 데이터가 실제 쌓여야 합니다.
- [ o ] Github Page 배포
  - [ o ] Github Page 배포 기능을 이용하여 누구나 볼 수 있게 배포합니다.
- [ o ] [코드스테이츠 fe-sprint-my-agora-states 리포지토리](https://github.com/codestates-seb/fe-sprint-my-agora-states)로 Pull Request
  - [ o ] 나만의 아고라 스테이츠를 코드스테이츠 깃허브에 Pull request합니다.
  - [ o ] 주어진 Pull request 형식에 따라주세요.

## Advanced Challenge Self Checklist

스스로 구현 완료한 부분까지 체크하여 제출합니다.

- [ o ] 현지 시간 적용
    - [ o ] 샘플 시간을 잘 변형하여, 현지 시간에 맞게 표현합니다. (ex. 오전 10:02:17)
- [ x ] 페이지네이션 기능
    - [ x ] 페이지네이션에 대해서 스스로 학습합니다.
    - [ x ] 한 페이지에 10개씩 디스커션이 보여야 합니다.
    - [ x ] 다음 페이지로 넘어갈 수 있어야 합니다.
    - [ x ] 이전 페이지로 돌아올 수 있어야 합니다.
    - [ x ] 다음 페이지가 없거나, 이전 페이지가 없는 경우 페이지를 유지해야 합니다.
- [ x ] 디스커션 유지 기능
    - [ x ] LocalStorage에 대해서 스스로 학습하고, 새롭게 추가하는 Discussion이 페이지를 새로고침해도 유지되도록 제작합니다.

### My Own Self Checklist

자신이 추가로 더 구현한 기능이 있으면 아래 적어주세요.

- [ o ] 반응형으로 구현
- [ o ] 질문하기 팝업창으로 띄우기
- []

### 배포 시연 화면

[첫 화면]
<img width="1439" alt="스크린샷 2023-03-10 오후 4 33 30" src="https://user-images.githubusercontent.com/109754988/224252387-d031c9ab-b97c-46d8-aeca-1437008fd45a.png">

[질문하기 버튼 클릭 시]
<img width="1439" alt="스크린샷 2023-03-10 오후 4 33 43" src="https://user-images.githubusercontent.com/109754988/224252394-fee95519-6a3e-454b-ad0e-5feb2d0d33a3.png">

[넓이 760px 이하일 경우의 화면 (반응형)]
<img width="499" alt="스크린샷 2023-03-10 오후 4 34 22" src="https://user-images.githubusercontent.com/109754988/224252404-44134177-af4c-41eb-a65f-c1bd9b03e6b2.png">

[넓이 760px 이하일 경우의 질문하기 화면 (반응형)]
<img width="499" alt="스크린샷 2023-03-10 오후 4 34 27" src="https://user-images.githubusercontent.com/109754988/224252410-1012e367-5dd2-4df4-bf0c-b6d09f5ee074.png">

아래 예시를 지우고, 자신의 과제 시연 화면을 추가합니다.

[진행 영상]
https://user-images.githubusercontent.com/109754988/224252106-c83cc7a4-4734-46c5-b4cd-c877aa05e0a8.mov



### 가장 자랑하고 싶은 기능

>  PC, Moblie을 나눠 작업해 스타일을 다르게 주었습니다.
> 작성란을 팝업창으로 띄우면서 아고라스테이츠 화면을 좀 더 심플하게 작업했습니다.

### 구현하고 싶었는데 하지 못한 아쉬운 기능

> localStorage에 정보를 저장 후 정보를 가져올 수 있었으나 새로고침해도 질문한 내용이 사라지는 문제가 있었습니다.
이부분에 시간 소요가 되어 다른 기능 추가를 못한게 아쉽습니다.
> 방금 등록한 질문 삭제 (localStorage와 연관된 부분은로 정보를 불러오는 부분을 해결하지 못해 구현하지 못했습니다.)
> 라이트/다크 기능도 추가하고 싶었으나... localStorage에 시간을 뺐겨 구현하지 못했습니다. (시간이 된다면 구현할 예정입니다.)

### 도움을 받고 싶은 부분

> localStorage를 불러와 새로고침해도 방금 작성된 질문란이 그대로 남아 있었으면 좋겠습니다.
