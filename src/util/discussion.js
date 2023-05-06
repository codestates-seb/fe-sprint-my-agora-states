const getLocalDiscussions = () => {
  const localDiscussions = window.localStorage.getItem('discussions');
  return JSON.parse(localDiscussions);
};

const addDiscussion = (discussion) => {
  const localDiscussions = getLocalDiscussions();
  localDiscussions.unshift(discussion);
  window.localStorage.setItem('discussions', JSON.stringify(localDiscussions));
};
const deleteDiscussion = (id) => {
  const localDiscussions = getLocalDiscussions();
  const newDiscussions = localDiscussions.filter(
    (discussion) => discussion.id !== id
  );
  window.localStorage.setItem('discussions', JSON.stringify(newDiscussions));
};

export { getLocalDiscussions, addDiscussion, deleteDiscussion };
