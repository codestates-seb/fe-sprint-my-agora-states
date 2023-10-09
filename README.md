## My Agora States!

## 배포 시연 화면

https://user-images.githubusercontent.com/113190920/224256471-3282e8c2-6d1e-46fe-9dd5-61cf682b61e3.mp4

## 배포 링크

https://suemeeeee.github.io/fe-sprint-my-agora-states/

## Bare Minimum Requirement Self Checklist

- [✅] 디스커션 나열 기능
    - [✅] `script.js`를 수정하여 `agoraStatesDiscussions` 배열의 데이터를 나열할 수 있게 구현합니다.
- [✅] CSS
    - [✅] 아고라 스테이츠 질문 리스트가 중앙으로 와야 합니다.
    - [✅] `style.css`를 수정하여 멋지고 아름답게 나만의 아고라 스테이츠를 꾸밉니다.
    - [✅] [colorhunt](https://colorhunt.co/palettes/popular), [dribbble](https://dribbble.com/)에서 적절한 색 조합, 디자인을 참고합니다.
- [✅] 디스커션 추가 기능
    - [✅] `script.js`를 수정하여 디스커션 추가 기능을 구현합니다.
    - [✅] `section.form__container` 요소에 새로운 아고라 스테이츠 질문을 추가할 수 있는 입력 폼을 제작합니다. 형식은 자유입니다.
    - [✅] 아이디, 본문을 입력하고 버튼을 누르면 실제 화면에 디스커션이 추가되어야 합니다.
    - [✅] `agoraStatesDiscussions` 배열에 추가한 데이터가 실제 쌓여야 합니다.
- [✅] Github Page 배포
  - [✅] Github Page 배포 기능을 이용하여 누구나 볼 수 있게 배포합니다.
- [✅] [코드스테이츠 fe-sprint-my-agora-states 리포지토리](https://github.com/codestates-seb/fe-sprint-my-agora-states)로 Pull Request
  - [✅] 나만의 아고라 스테이츠를 코드스테이츠 깃허브에 Pull request합니다.
  - [✅] 주어진 Pull request 형식에 따라주세요.

## Advanced Challenge Self Checklist

- [✅] 현지 시간 적용
    - [✅] 샘플 시간을 잘 변형하여, 현지 시간에 맞게 표현합니다. (ex. 오전 10:02:17)
- [ ] 페이지네이션 기능
    - [ ] 페이지네이션에 대해서 스스로 학습합니다.
    - [ ] 한 페이지에 10개씩 디스커션이 보여야 합니다.
    - [ ] 다음 페이지로 넘어갈 수 있어야 합니다.
    - [ ] 이전 페이지로 돌아올 수 있어야 합니다.
    - [ ] 다음 페이지가 없거나, 이전 페이지가 없는 경우 페이지를 유지해야 합니다.
- [ ] 디스커션 유지 기능
    - [ ] LocalStorage에 대해서 스스로 학습하고, 새롭게 추가하는 Discussion이 페이지를 새로고침해도 유지되도록 제작합니다.

### My Own Self Checklist

자신이 추가로 더 구현한 기능이 있으면 아래 적어주세요.

- [✅] 모달 창 구현   
- [✅] 답변 완료 버튼 클릭 시, 답변 페이지로 이동 

### 가장 자랑하고 싶은 기능

🍀 CSS로 글라스모피즘 디자인을 구현했습니다! 글라스의 질감이 잘 느껴지도록 뒷 배경도 그라데이션 이미지로 설정했어요.
🍀 휴대전화 화면에서도 레이아웃의 이상한 부분 없이, 깔끔하게 반응하도록 flex 속성에 공을 들였습니다. (반응형 웹)
🍀 타이틀이 2줄을 넘어가면 생략되도록 설정하여, 레이아웃의 통일감을 주었습니다. 
🍀 새로운 질문 작성 시, 모달 창이 뜨도록 하고, 모달 창 바깥 영역을 클릭 시 모달 창이 사라지도록 구현했습니다. 
🍀 새 질문 생성 버튼을 position: fixed로 top버튼 같이 구현 했습니다. 

### 구현하고 싶었는데 하지 못한 아쉬운 기능

🌱 디자인에 신경을 너무 쓰느라 advanced에 소홀했던 것 같습니다😂 
🌱 현지 시간을 적용하라는 걸, 새로 질문 작성 시 현재 시간을 찍으라는 의미로 잘못 이해했어요... 
      이후 주말에 제대로 현지 시간으로 수정해 볼 생각입니다!
🌱 이후 시간이 된다면 페이지네이션에 좀 더 도전해 보고 싶습니다!  

### 도움을 받고 싶은 부분

🌱  타이틀이 2줄 이상일 시 생략하도록 하니, `text-overflow: ellipsis;`이 적용되지 않아 '...' 생략 표현을 못 했습니다. 
       서치하니, display가 flex면 안된다고 설명되어 있는데 그럼 다른 방법으로는 어떻게 레이아웃을 지키면서 생략시킬지 고 
       민 됩니다. 그 부분 요소를 전부 `display: block`으로 할 수 밖에  없는걸까요...?  
🌱 페이지네이션 관련 조언 

