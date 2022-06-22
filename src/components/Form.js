export const Form = ({ addDiscussion }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(event.target[0]);
    const author = event.target[0].value;
    const title = event.target[1].value;
    const bodyText = event.target[2].value;
    addDiscussion({ author, title, bodyText });
    event.target[0].value = "";
    event.target[1].value = "";
    event.target[2].value = "";
  };
  return (
    <section className="form__container">
      <form action="" method="get" className="form" onSubmit={handleSubmit}>
        <div className="form__input--wrapper">
          <div className="form__input--name">
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="아이디를 입력하세요."
            />
          </div>
          <div className="form__input--title">
            <input
              type="text"
              name="title"
              id="title"
              required
              placeholder="제목을 입력하세요."
            />
          </div>
          <div className="form__textbox">
            <label htmlFor="story"> </label>
            <textarea
              id="story"
              name="story"
              placeholder="질문을 작성하세요"
              required
            ></textarea>
          </div>
        </div>
        <div className="form__submit">
          <input type="submit" value="등록" />
        </div>
      </form>
    </section>
  );
};
