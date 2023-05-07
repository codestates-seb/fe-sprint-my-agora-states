const resetLocalDiscussions = () => {
  // 최초 1회 로컬 스토리지 초기화
  window.localStorage.getItem('discussions') === null &&
    window.localStorage.setItem(
      'discussions',
      JSON.stringify(agoraStatesDiscussions)
    );
};

const getLocalDiscussions = () => {
  const localDiscussions = window.localStorage.getItem('discussions');
  return JSON.parse(localDiscussions);
};

const addLocalDiscussion = (discussion) => {
  const localDiscussions = getLocalDiscussions();
  localDiscussions.unshift(discussion);
  window.localStorage.setItem('discussions', JSON.stringify(localDiscussions));
};
const deleteLocalDiscussion = (id) => {
  const localDiscussions = getLocalDiscussions();
  const newDiscussions = localDiscussions.filter(
    (discussion) => discussion.id !== id
  );
  window.localStorage.setItem('discussions', JSON.stringify(newDiscussions));
};

export {
  resetLocalDiscussions,
  getLocalDiscussions,
  addLocalDiscussion,
  deleteLocalDiscussion,
};
