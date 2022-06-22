export const Discussion = ({ discussion, deleteDiscussion }) => {
  const { id, url, author, avatarUrl, title, createdAt, answer } = discussion;
  return (
    <li className="discussion__container">
      <div className="discussion__avatar--wrapper">
        <img
          className="discussion__avatar--image"
          src={avatarUrl}
          alt={`avatar of ${author}`}
        />
      </div>
      <div className="discussion__content">
        <h2 className="discussion__title">
          <a href={url}>{title}</a>
        </h2>
        <div className="discussion__information">{`${author} | ${new Date(
          createdAt
        ).toLocaleTimeString()}`}</div>
      </div>
      <div className="discussion__answered">
        <p onClick={() => deleteDiscussion(id)}>{answer ? "✅" : "❎"}</p>
      </div>
    </li>
  );
};
