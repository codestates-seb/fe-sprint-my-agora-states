import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export const Discussion = ({ discussion, deleteDiscussion }) => {
  const { id, url, avatarUrl, title, author, createdAt, answer } = discussion;
  return (
    <li className="discussion__container">
      <div className="discussion__avatar--wrapper">
        <img
          className="discussion__avatar--image"
          src={avatarUrl}
          alt="avatar"
        />
      </div>
      <div className="discussion__content">
        <h2 className="discussion__title">
          <a href={url}>
            {title.length > 53 ? `${title.slice(0, 53)}...` : title}
          </a>
        </h2>
        <div
          className="discussion__information"
          dangerouslySetInnerHTML={{
            __html: `${author} / ${new Date(createdAt).toLocaleTimeString()}`,
          }}
        ></div>
      </div>

      <div className="discussion__answered">
        <p>{answer ? "✅" : "❌"}</p>
      </div>
      <button
        className="discussion__deleteButton"
        onClick={() => deleteDiscussion(id)}
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </li>
  );
};
