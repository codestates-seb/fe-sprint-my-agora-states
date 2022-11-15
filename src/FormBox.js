export function FormBox ({$main, onSubmit}) {
  const $formBox = document.createElement('section');
  $formBox.classList.add('form__container');
  $main.append($formBox);

  $formBox.innerHTML = 
  `
  <form action="" method="get" class="form">
    <h3>질문을 입력하세요</h3>
    <div class="form__input--wrapper">
      <div class="form__input--name">
        <label for="author">Enter your name: </label>
        <input type="text" name="author" id="author" required>
      </div>
      <div class="form__input--title">
        <label for="title">Enter your title: </label>
        <input type="text" name="title" id="title" required>
      </div>
      <div class="form__textbox">
        <label for="story">Your question: </label>
        <textarea id="story" name="story" placeholder="질문을 작성하세요" required></textarea>
      </div>
    </div>
    <div class="form__submit">
      <input type="submit" class="submit" value="submit">
    </div>
  </form>
  `;

  $formBox.addEventListener('click',(e)=>{
    e.preventDefault();
    // const hide = e.target.closest('.form');
    const button = e.target.closest('.submit');
    // if($formBox.classList.contains('hide')){
    //   if(!hide){
    //     $formBox.classList.add('hide');
    //   }
    // }
    
    if(button){
      onSubmit({avatarUrl: 'https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4', author : document.querySelector('#author').value , url : 'https://github.com/codestates-seb/agora-states-fe/discussions/45', createdAt: new Date() , title: document.querySelector('#title').value , answer : null})
      document.querySelector('#author').value = '';
      document.querySelector('#title').value = '';
      document.querySelector('#story').value = '';
      
      // $formBox.classList.add('hide');
    }
  })
}









/*
    <section class="form__container hide">
      <form action="" method="get" class="form">
        <h3>질문을 입력하세요</h3>
        <div class="form__input--wrapper">
          <div class="form__input--name">
            <label for="author">Enter your name: </label>
            <input type="text" name="author" id="author" required>
          </div>
          <div class="form__input--title">
            <label for="title">Enter your title: </label>
            <input type="text" name="title" id="title" required>
          </div>
          <div class="form__textbox">
            <label for="story">Your question: </label>
            <textarea id="story" name="story" placeholder="질문을 작성하세요" required></textarea>
          </div>
        </div>
        <div class="form__submit">
          <input type="submit" value="submit">
        </div>
      </form>
    </section>
*/