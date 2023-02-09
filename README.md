# fe-sprint-my-agora-states

#### 클라이언트 - 서버 연결 데모



<br>

## 1차 기능 구현 (섹션1)

### 1. Discussion 나열

- [x] index.html 요청 시 input창, 필터버튼, Discussion 리스트가 렌더링
- [x] Discussion 리스트는 리스트 배열 순으로 정렬(최신순)
- [x] Discussion Item은 작성자, 제목, 내용, 작성날짜, 답변 여부, 프로필 이미지를 포함

<br>

### 2. Discussion 추가

- [x] name, title, question 3가지 모두 입력하면 submit 버튼 활성화
- [x] submit 버튼 클릭 시 새로운 Discussion이 리스트 최상단에 추가되어 렌더링
- [x] submit 버튼 클릭 시 추가되고, Form 초기화

![add](https://user-images.githubusercontent.com/41741221/211489651-b05eeeae-35c7-4e29-b3cc-6036580c6e66.gif)

<br>

### 3. Discussion 유지 (로컬스토리지)

- [x] 로컬스토리지로 Discussions 기억하기

<br>

### 4. 페이지네이션

- [x] 한 페이지 당 10개씩 렌더링
- [x] 이전, 다음 버튼 **23.02.01 구현**
- [x] 페이지 번호 클릭 시 해당 페이지로 이동

![paging2](https://user-images.githubusercontent.com/41741221/215812821-82765965-3671-4c49-8554-a4ef4f633dc6.gif)

<br>

### 5. 필터 기능 (All, Answered, UnAnswered)

- [x] 필터 버튼 클릭시 리스트 소팅

![filtering](https://user-images.githubusercontent.com/41741221/211489670-5c223222-f3f0-453b-a172-38eb0048efcd.gif)

<br>

## 2차 기능 구현 (섹션2)

### 로딩 인디케이터 추가

- [x] 패치 요청 시 목록을 받아와서 렌더링하기전에 로딩 인디케이터 표시

![loader](https://user-images.githubusercontent.com/41741221/217748997-e40682a1-cd29-4e64-8f27-24d16446d740.gif)

<br>

### get, post 요청 시 에러 대응

- [x] get 요청(디스커션 목록 조회) 실패 시 목록에 새로고침 링크 표시

![getError](https://user-images.githubusercontent.com/41741221/217749043-1151e05d-97c6-4dce-9975-0c3c30b0a04b.gif)

<br>

- [x] post 요청(디스커션 추가) 실패 시 alert로 실패 안내 표시
  - [x] post 요청 실패 시 Form Input들이 초기화 되지 않음
  
![postError](https://user-images.githubusercontent.com/41741221/217749774-d700e864-4654-4ce8-9e43-516f46fbde77.gif)

