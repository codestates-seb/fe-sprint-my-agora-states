// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
    const li = document.createElement("li"); // li 요소 생성
    li.className = "discussion__container"; // 클래스 이름 지정
  
    const avatarWrapper = document.createElement("div");
    avatarWrapper.className = "discussion__avatar--wrapper";
    const discussionContent = document.createElement("div");
    discussionContent.className = "discussion__content";
    const discussionAnswered = document.createElement("div");
    discussionAnswered.className = "discussion__answered";
  
    // 이미지 추가
    const avatarImg = document.createElement('img');
    avatarImg.className = "discussion__avatar--image"
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = 'avatar of ' + obj.author;
    avatarWrapper.append(avatarImg);
  
    //제목, 링크, 작성자, 작성일시 추가
    const discussionTit = document.createElement("h2");
    discussionTit.className = "discussion__title"
    const discussionTitLink = document.createElement("a");
    discussionTitLink.href = obj.url;
    discussionTitLink.textContent = obj.title;
    discussionTit.append(discussionTitLink);
  
    const discussionInfortmaion = document.createElement("div");
    discussionInfortmaion.className = "discussion__information"
    const localCreatedAt = new Date(obj.createdAt).toLocaleString()
    discussionInfortmaion.textContent = obj.author + ' / ' + localCreatedAt;
  
    discussionContent.append(discussionTit,discussionInfortmaion)
  
    //답변 여부 체크박스 추가
    const discussionAnsweredCheckbox = document.createElement('p')
    discussionAnsweredCheckbox.className = "discussion__answered"
    obj.answer === null ? discussionAnsweredCheckbox.textContent = '☒' : discussionAnsweredCheckbox.textContent = '☑'
    discussionAnswered.append(discussionAnsweredCheckbox)
  
    let answerLi = undefined;
  
    if(obj.answer !== null){
      answerLi = document.createElement('div')
      answerLi.className = "answer__container"
  
      const avatarWrapper = document.createElement("div");
      avatarWrapper.className = "answer__avatar--wrapper";
      const answerContent = document.createElement("div");
      answerContent.className = "answer__content";
  
      //답변 아이콘 추가
      const answerIcon = document.createElement('div');
      answerIcon.innerHTML =`<ion-icon name="return-down-forward-outline"></ion-icon>`
      answerIcon.className = "answer__icon"
      
      // 답변 이미지 추가
      const avatarImg = document.createElement('img');
      avatarImg.className = "answer__avatar--image"
      avatarImg.src = obj.answer.avatarUrl;
      avatarImg.alt = 'avatar of ' + obj.answer.author;
      avatarWrapper.append(avatarImg);
  
      //제목, 링크, 작성자, 작성일시 추가
      const answerTit = document.createElement("h2");
      answerTit.className = "answer__title"
      const answerTitLink = document.createElement("a");
      answerTitLink.href = obj.answer.url;
      answerTitLink.textContent = obj.author + "님 질문에 대한 답변";
      answerTit.append(answerTitLink);
      
      const answerInfortmaion = document.createElement("div");
      answerInfortmaion.className = "answer__information"
      const localCreatedAt = new Date(obj.answer.createdAt).toLocaleString()
      answerInfortmaion.textContent = obj.answer.author + ' / ' + localCreatedAt;
      
      answerContent.append(answerTit,answerInfortmaion)
  
      answerLi.append(answerIcon,avatarWrapper, answerContent)
    } 
  
    li.append(avatarWrapper, discussionContent, discussionAnswered);
    if(answerLi){li.append(answerLi)}
    return li;
  }

export {convertToDiscussion};