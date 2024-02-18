import { Discussion } from "./Discussion";

export const Discussions = ({ discussions, deleteDiscussion }) => {
  return (
    <section className="discussion__wrapper">
      <ul className="discussions__container">
        {discussions.map((discussion) => {
          return (
            <Discussion
              key={discussion.id}
              discussion={discussion}
              deleteDiscussion={deleteDiscussion}
            />
          );
        })}
      </ul>
    </section>
  );
};
