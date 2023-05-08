// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
//console.log(agoraStatesDiscussions);

const storedDiscussions = JSON.parse(
  localStorage.getItem('agoraStatesDiscussions')
);
let nowArray = agoraStatesDiscussions;

if (!(storedDiscussions === null)) {
  nowArray = storedDiscussions;
}

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement('li'); // li 요소 생성
  li.className = 'discussion__container'; // 클래스 이름 지정

  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = 'discussion__avatar--wrapper';
  const discussionContent = document.createElement('div');
  discussionContent.className = 'discussion__content hide';

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요

  //아바타 이미지
  const img = document.createElement('img');
  img.className = 'discussion__avatar--image';
  img.src = obj.avatarUrl;
  avatarWrapper.appendChild(img);

  //제목 감싸기
  const titleWrapper = document.createElement('div');
  titleWrapper.className = 'discussion__title--wrapper';
  avatarWrapper.appendChild(titleWrapper);

  //제목
  const title = document.createElement('h2');
  const titleUrl = document.createElement('a');
  title.className = 'discussion__title';
  titleUrl.textContent = obj.title;
  titleUrl.href = obj.url;

  titleWrapper.appendChild(title);
  title.append(titleUrl);

  //작성자 & 날짜
  const info = document.createElement('div');
  info.className = 'discussion__information';
  const author = obj.author;

  //날짜 다듬기
  let date = new Date(obj.createdAt);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  date = `${year}-${month}-${day} ${hours}:${minutes}`;

  titleWrapper.appendChild(info);
  info.textContent = `${author} / ${date}`;

  //내용
  discussionContent.innerHTML = obj.bodyHTML;
  li.appendChild(discussionContent);

  //해결여부
  const discussionAnswered = document.createElement('div');
  discussionAnswered.className = 'discussion__answered';

  if (!(obj.answer === null)) {
    discussionAnswered.classList.add('answered');
    discussionAnswered.textContent = '답변 완료';
  } else {
    discussionAnswered.classList.add('wating');
    discussionAnswered.textContent = '답변 대기중';
  }
  avatarWrapper.appendChild(discussionAnswered);

  //li 클릭시 문의 내용 보이기
  avatarWrapper.onclick = (event) => {
    const content = event.currentTarget.nextElementSibling;

    if (!event.target.classList.contains('discussion__content')) {
      content.classList.toggle('hide');
      content.previousElementSibling.classList.toggle('active');
    }
  };

  li.append(avatarWrapper, discussionContent);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, limit) => {
  ul.textContent = '';

  for (let i = limit; i < limit + 10; i += 1) {
    //마지막페이지의 게시글이 10개 미만일때 오류 방지
    if (nowArray[i]) {
      element.append(convertToDiscussion(nowArray[i]));
    }
  }
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector('ul.discussions__container');
render(ul, 0);

//페이지네이션
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let discussionCount = 0;
const pageCount = 10;

// form데이터를 객체에 추가하고 DOM을 업데이트
const form = document.querySelector('.form');

form.onsubmit = (event) => {
  event.preventDefault();

  //질문 등록시 이미지 랜덤생성 배열
  const randomAvatarArray = [
    'https://i.namu.wiki/i/dzJvcR8W9YbjSL7G3CgdjFlJ2BsLFyxyOj2wBg0ZWBMX-3A-JS9El_uRYq1ScDAokV0qqdS46_9yJ105BDEf1Jh7XZ_O_mHZ_D5HlyAnBgEoOvNoKsabpUPVBty46Yfy6_1X07n-c_4-0cPa0c-U0A.png',
    'https://i.namu.wiki/i/E0wVQ-2ukQNaMeoEfcON3657LHLHUbW4cxIc_e5H1aQDSx9-DFBtZPn2e-MCRE8ueRA_wLmELo2_Vk_GAknn97CztUt0LnA4RqCYftmvpXN2X_LSRzia2Pv_8mWq8U_b0Ep6K4ga9C5QK0V_7tj1Fg.png',
    'https://i.namu.wiki/i/PVm54Ohkok9m-fpWUuU809leaQG_04Zy2KHQm2IDzpRwlPqhepOxIpWnSZgXK3vFIL3NUXCq2jElj6z3tSlAQEvEMR9FuovyHeQcXemihOd_77WV8wwFbwPGM_V3BT01975TjCYtAUjP3ZP58iDI4Q.png',
    'https://i.namu.wiki/i/U9lmQbQ2Aa07bVvsrokad8ejcy4rP_3_MJxhQT6_iPG7Plb9EhHEDavkvcOEoeQ_3x2UEey2VKPGsWFUF8GQw7MNGgcCv_13BrdDy2NLt2KeIGAAri2tZEGQZZDtOXVxMNPE6HDaaiYj7zO6hCngew.png',
  ];

  //질문 등록시 이미지 랜덤생성 함수
  const getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  //기존 데이터 배열에 추가될 객체
  const data = new FormData(form);

  const newObj = {
    createdAt: new Date(),
    title: data.get('title'),
    author: data.get('name'),
    bodyHTML: data.get('story'),
    answer: null,
    avatarUrl: randomAvatarArray[getRandomInt(0, randomAvatarArray.length - 1)],
  };

  //기존 배열에 추가 후
  nowArray.unshift(newObj);

  //로컬스토리지에 저장
  localStorage.setItem('agoraStatesDiscussions', JSON.stringify(nowArray));

  //다시 렌더링
  render(ul, discussionCount);

  //제출 후 form양식 초기화
  document.querySelector('input[name=name]').value = '';
  document.querySelector('input[name=title]').value = '';
  document.querySelector('textarea[name=story]').value = '';
};

//다음 페이지 이동
prev.onclick = () => {
  if (discussionCount === 0) {
    alert('첫페이지입니다.');
    return;
  }

  discussionCount -= pageCount;
  render(ul, discussionCount);

  prev.nextElementSibling.textContent = `page${
    discussionCount / pageCount + 1
  }`;
};

//이전 페이지 이동
next.onclick = () => {
  if (discussionCount + 10 > nowArray.length) {
    alert('마지막 페이지 입니다.');
    return;
  }

  discussionCount += pageCount;
  render(ul, discussionCount);
  next.previousElementSibling.textContent = `page${
    discussionCount / pageCount + 1
  }`;
};


//top 이동 버튼 
const topBtn = document.querySelector('.top__btn')

topBtn.onclick = () => {
  window.scrollTo({top: 0, behavior: 'smooth'});
}

window.onscroll = () => {
  if (document.documentElement.scrollTop > 20) {
    topBtn.classList.remove('hide')
  } else {
    topBtn.classList.add('hide')
  }
}
