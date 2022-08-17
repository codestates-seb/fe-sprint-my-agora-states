function Discussion({discussion}) {
  const {id, avatarUrl, author, url, title, createdAt, answer} = discussion
  return (
    <li id={id} className="discussion__container">
      <div className="discussion__avatar--wrapper">
      <img className="discussion__avatar--image"
        src={avatarUrl}
        alt={`avatar of ${author}`} />
      </div>
      <div className="discussion__content">
        <h2 className="discussion__title"><a href={url}>{title}</a></h2>
        <div className="discussion__information">{author} | {createdAt}</div>
      </div>
      <div className="discussion__answered"><p>{answer}</p></div>
    </li>
  );
}

export default Discussion;
