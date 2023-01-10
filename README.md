# fe-sprint-my-agora-states

#### Github Page DEMO

https://sangbeomheo.github.io/fe-sprint-my-agora-states/

<br>

## 기능 구현 내용

### 1. Discussion 나열

- [x] index.html 요청 시 input창, 필터버튼, Discussion 리스트가 렌더링
- [x] Discussion 리스트는 리스트 배열 순으로 정렬(최신순)
- [x] Discussion Item은 작성자, 제목, 내용, 작성날짜, 답변 여부, 프로필 이미지를 포함

### 2. Discussion 추가

- [x] name, title, question 3가지 모두 입력하면 submit 버튼 활성화
- [x] submit 버튼 클릭 시 새로운 Discussion이 리스트 최상단에 추가되어 렌더링
- [x] submit 버튼 클릭 시 추가되고, Form 초기화

### 3. Discussion 유지 (로컬스토리지)

- [x] 로컬스토리지로 Discussions 기억하기

### 4. 페이지네이션

- [x] 한 페이지 당 10개씩 렌더링
- [ ] 이전, 다음 버튼
- [x] 페이지 번호 클릭 시 해당 페이지로 이동

### 5. Discussion 답변 토글

- [ ] Discussion Item을 클릭하면 답변 내용이 show or hide
- [ ] 답변이 없으면 클릭시 동작 x

### 6. 필터 기능 (All, Answered, UnAnswered)

- [x] 필터 버튼 클릭시 리스트 소팅

<br>

### 기능 별 데모 영상

#### Discussion 추가
![add](https://user-images.githubusercontent.com/41741221/211489651-b05eeeae-35c7-4e29-b3cc-6036580c6e66.gif)

#### 필터 기능 (All, Answered, UnAnswered)
![filtering](https://user-images.githubusercontent.com/41741221/211489670-5c223222-f3f0-453b-a172-38eb0048efcd.gif)

#### 페이지네이션
![paging](https://user-images.githubusercontent.com/41741221/211489661-10e52c97-ceeb-4dbd-857e-7cd538a4f681.gif)

