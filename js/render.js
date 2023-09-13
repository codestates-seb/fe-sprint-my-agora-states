const $discussionsContainer = document.querySelector('.discussion__wrapper');
const $ul = document.querySelector('ul.discussions__container');
const $pageBtnsContainer = document.createElement('ul');
$pageBtnsContainer.className = 'discussion__pageButtons--wrapper';

const convertToDiscussion = ({
  id,
  createdAt,
  title,
  author,
  answer,
  avatarUrl,
}) => {
  const CHECKED_ICON_URL = './img/checked.png';
  const UNCHECKED_ICON_URL = './img/unchecked.png';

  const dicussionHtml = `
    <li class="discussion__container dark" data-id="${id}">
      <div class="discussion__container--wrapper">
        <img src="${avatarUrl}" alt="avatar of ${author}" class="discussion__avatar--image" />
      </div>
      <div class="discussion__content">
        <h2 class="discussion__title">
          <a href="#" class="discussion__Link">${title}</a>
        </h2>
        <div class="discussion__information">
          ${author} / ${createdAt}
        </div>
      </div>
      <div class="discussion__answered">
        <img src="${answer ? CHECKED_ICON_URL : UNCHECKED_ICON_URL}" alt="${
    answer ? '답변 완료' : '답변 미완료'
  }" />
      </div>
    </li>
  `;

  return dicussionHtml;
};

const createPageBtns = (currentPage, totalPage) => {
  if (totalPage <= 1) return;

  const PAGE_COUNT = 5;
  const pageGroup = Math.ceil(currentPage / PAGE_COUNT);

  let lastPage = pageGroup * PAGE_COUNT;
  if (lastPage > totalPage) lastPage = totalPage;
  let firstPage =
    lastPage - (PAGE_COUNT - 1) < 1 ? 1 : lastPage - (PAGE_COUNT - 1);
  if (totalPage < pageGroup * PAGE_COUNT)
    firstPage = pageGroup * PAGE_COUNT - (PAGE_COUNT - 1);

  let pageBtnsHtml = '';

  for (let i = firstPage; i <= lastPage; i++) {
    pageBtnsHtml += `
      <li>
        <a href="#" class="pageButton" data-move="toPage">${i}</a>
      </li>`;
  }

  if (firstPage - 1 > 0) {
    pageBtnsHtml =
      `
      <li>
        <a href="#" class="pageButton__first" data-move="toFirst">&lt;&lt;</a>
      </li>
      <li>
        <a href="#" class="pageButton__prev" data-move="toPrev">&lt;</a>
      </li>` + pageBtnsHtml;
  }

  if (totalPage > lastPage) {
    pageBtnsHtml += `
      <li>
        <a href="#" class="pageButton__next" data-move="toNext">&gt;</a>
      </li>
      <li>
        <a href="#" class="pageButton__last" data-move="toLast">&gt;&gt;</a>
      </li>`;
  }

  return pageBtnsHtml;
};

const render = ({ discussions, currentPage, currentFilter }) => {
  $discussionsContainer.append($pageBtnsContainer);

  let discussionsHtml = '';

  const filteredDiscussions =
    currentFilter === 'unchecked'
      ? discussions.filter(({ answer }) => !answer)
      : currentFilter === 'checked'
      ? discussions.filter(({ answer }) => answer)
      : discussions;

  filteredDiscussions
    .slice((currentPage - 1) * 10, currentPage * 10)
    .forEach(
      (discussion) => (discussionsHtml += convertToDiscussion(discussion))
    );

  $ul.innerHTML = discussionsHtml;

  const filteredTotalPage = Math.ceil(filteredDiscussions.length / 10);

  $pageBtnsContainer.innerHTML = createPageBtns(
    +currentPage,
    filteredTotalPage
  );
};

const showSuccessMsg = (isSuccess) => {
  if (isSuccess) {
    const $successMsg = document.createElement('p');
    $successMsg.className = 'successMessage';
    $successMsg.innerHTML =
      '🎉&nbsp;&nbsp;질문 등록이 완료되었습니다&nbsp;&nbsp;🎉';

    document.body.append($successMsg);

    setTimeout(() => {
      document.body.removeChild($successMsg);
    }, 4000);
  }
};

const renderMode = (currentMode) =>
  document.body.classList.toggle('dark', currentMode === 'dark');

export { render, showSuccessMsg, renderMode };
