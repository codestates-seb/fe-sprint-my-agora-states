function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
} //날짜 형식으로 출력해주려고 만듦

function ListItem({ item, onDelete }) {
  const handleDeleteClick = () => {
    onDelete(item.id);
  };

  return (
    <div className="ListItem">
      <img src={item.avatarUrl} alt={"avatar of " + item.author} />
      <div>
        <h1>{item.title}</h1>
        <a href={item.url}></a>
        <p>{item.author}</p>
        <p>{formatDate(item.createdAt)}</p>
        <p>{item.answer}</p>
        <button onClick={handleDeleteClick}>삭제</button>
      </div>
    </div>
  );
}

function List({ items, onDelete }) {
  console.log(items);
  return (
    <ul>
      {items &&
        items.map((item) => {
          return (
            <li key={item.id}>
              <ListItem item={item} onDelete={onDelete} />
            </li>
          );
        })}
    </ul>
  );
}

export default List;
