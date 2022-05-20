// bare 호기롭게 도전했다가 패배...

// 의사코드
// 배열을 새로 만든다
// 배열을 기존 배열에 추가한다
// 배열의 값은 우리가 직접 입력한 값
// 언제 추가되냐? 버튼을 눌렀을 때

// 새로운 요소 만들기
const new_li = document.createElement('li'); // li 생성
new_li.classList.add('discussion__container'); // li 클래스 추가 >> 스타일 적용
const new_ul = document.querySelector('ul'); // ul 가져오기
// new_ul.prepend(new_li) // 생성한 li 를 ul 맨 앞에 추가

const new_avatar = document.createElement('div');
new_avatar.classList.add('discussion__avatar--wrapper');
new_li.append(new_avatar);

const new_img = document.createElement('img');
new_img.classList.add('discussion__avatar--image');
new_img.src="image.jpeg";
new_avatar.append(new_img);

const new_title = document.createElement("h2");
new_title.classList.add('discussion__title');
new_li.append(new_title);
const new_titleLink = document.createElement('a');
new_titleLink.href = "https://github.com/codestates-seb/agora-states-fe/discussions/6";
new_titleLink.textContent = "안녕하세요";
new_titleLink.target = '_balnk';
new_title.append(new_titleLink);

const new_information = document.createElement('div');
new_information.classList.add('discussion__information');
new_information.innerText = `지혜 / 16:30`;
new_information.style.cssText=`width: 10rem;
margin-top: 2rem;`
new_li.append(new_information);

const new_answered = document.createElement('div');
new_answered.classList.add('discussion__answered');
new_answered.innerText = `😀`;
new_answered.style.cssText=`font-size: 2rem;
padding: 0.3rem;
margin-top: -0.5rem;`
new_li.append(new_answered);

// // input 버튼 눌렀을 때 값.. 불러오기
const btn = document.querySelector('#input-btn'); // input 가져오기
const name1 = document.querySelector('#name');
const title1 = document.querySelector('#title');
const q1 = document.querySelector('#story');

btn.onclick = btn1;

function btn1(){
    function length(value1){
        return value1.length >=1;
    }

    if(length(name1.value)){
        new_ul.prepend(new_li);
    }
}

btn1();

// 고민했던 흔적들
// 디스커션 추가 의사코드
// input 에 입력한 글자수가 1글자 이상일 때 >>> name.length >=1 // onkeyup? onclick?
// submit 버튼을 눌렀을 때 >>> onclick / onsubmit?
// 기존 프로필은 그대로이고 제목, 이름, 질문이 내가 입력한 값으로 바뀐다  >>> title.value
// 그리고 맨 앞에 추가된다 >>> 배열 unshift() DOM prepend()
// li.prepend();
// agoraStatesDiscussions.unshift('discussion_container.value'); <<< 안된다 추가하는게 문자열이어서 그럼 배열..? [{그 안에 객체...?}]



