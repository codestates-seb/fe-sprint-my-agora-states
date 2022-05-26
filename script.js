/* /////////////////////////header-2 : search bar////////////////////// */
const searchBar = document.querySelector('.search_bar');
const searchIcon = document.querySelector('.search_icon');
const searchInput = document.querySelector('.search_input');
const searchClear = document.querySelector('.fi-rr-cross-small');
const searchContent = document.querySelector('.search_content');

searchIcon.onclick = () => {
    searchBar.classList.toggle('active'), searchIcon.classList.toggle('active'), searchInput.classList.toggle('active')

    if (!(searchBar.classList.contains('active')) && searchContent.value.length!==0){searchClear.classList.remove('active')};
    if (searchBar.classList.contains('active') && searchContent.value.length!==0 ){searchClear.classList.add('active')}};

searchContent.onkeyup = () => {
    if (searchContent.value.length!==0){searchClear.classList.add('active')}
    if (searchContent.value.length===0){searchClear.classList.remove('active')};}

searchClear.onclick = () => {document.querySelector('.search_content').value=''; searchClear.classList.remove('active')};

/* /////////////////////////body-2 - old discussions////////////////// */


const objectToValue = (obj) => {
    
    const li = document.createElement('li');
    li.className = 'discussion_format';

    const faceWrapper = document.createElement('div');
    faceWrapper.className = "face_wrapper";

    const faceImg = document.createElement('img');
    faceImg.className = "face_img";

    const discussionWrapper = document.createElement('div');
    discussionWrapper.className = "discussion_wrapper";

    const discussionTitle = document.createElement('div');
    discussionTitle.className = "discussion_title";

    const discussionWriterDate = document.createElement('div');
    discussionWriterDate.className = "discussion_writer_date";

    const discussionAnswered = document.createElement('div');
    discussionAnswered.className = "discussion_answered";

    const checked = document.createElement('span');
    checked.className = "checked";

    const link = document.createElement('a');
    link.className = "discussion_link";

    
    

    faceImg.src = obj.avatarUrl;
    faceImg.alt = `profile picture of ${obj.author}`;
    discussionWriterDate.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
    link.href = `${obj.url}`;
    link.textContent =`${obj.title}`;
    checked.textContent = obj.answer ? `✓` : ``;

    faceWrapper.append(faceImg);
    discussionWrapper.append(discussionTitle,discussionWriterDate);
    discussionTitle.append(link);
    discussionAnswered.append(checked);
    li.append(faceWrapper,discussionWrapper,discussionAnswered);

    const discussionContainer = document.createElement('div');
    discussionContainer.className = "discussion_container";
   
    return li;

}





const render = (element) => {
    for (i=0; i<agoraStatesDiscussions.length; i++) {
        element.append(objectToValue(agoraStatesDiscussions[i]))}
    return;}




const ul= document.querySelector('ul.discussion_format')
render (ul);


/* /////////////////////////body-3 - new discussions////////////////// */

const formSubmit = document.querySelector('.question_form');

const formNameInput = document.querySelector('.form_nameInput');
const formTitleInput = document.querySelector('.form_titleInput');
const formQuestionInput = document.querySelector('.form_textarea');


formSubmit.onsubmit = function(){
    
    const newName = this.name.value;
    const newTitle = this.title.value;
  
    const newDate = new Date().toLocaleString();
    const newObj = {author: newName, title: newTitle, createdAt: newDate, avatarUrl:'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F3JMgT%2FbtrCY6PaJZ3%2Fn5wBHk17RKFDfwSFjWSyJK%2Fimg.jpg' };
  
    agoraStatesDiscussions.unshift(newObj);
    ul.prepend(objectToValue(newObj));

    this.name.value = "";
    this.title.value = "";
    this.question.value = "";

    return false;
}




























/* ////////////////////body container--right//////////////// */
const noticeBtn = document.getElementById('notice_guide');
const noticeBtnClick = e => {
    const { x, y, width, height } = noticeBtn.getBoundingClientRect();
    const radius = Math.sqrt ( width * width + height * height );
    noticeBtn.style.setProperty('--diameter', radius * 2 + 'px');
    const { clientX, clientY } = e;
    const left = (clientX - x - radius) / width * 100 + '%';
    const top = (clientY - y - radius) / height * 100 + '%';

    noticeBtn.style.setProperty('--left', left);
    noticeBtn.style.setProperty('--top', top);
    noticeBtn.style.setProperty('--a', '');
    setTimeout(() => {
        noticeBtn.style.setProperty('--a','ripple-effect 500ms linear')});}
noticeBtn.addEventListener('click',noticeBtnClick);