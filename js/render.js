const $discussionsContainer = document.querySelector('.discussion__wrapper');
const $ul = document.querySelector('ul.discussions__container');
const $pageBtnsContainer = document.createElement('ul');
$pageBtnsContainer.className = 'discussion__pageButtons--wrapper';

const convertToDiscussion = ({
  createdAt,
  title,
  url,
  author,
  answer,
  avatarUrl,
}) => {
  // wrapper 컴포넌트
  const $li = document.createElement('li');
  $li.className = 'discussion__container dark';

  // avatar 컴포넌트
  const $avatarWrapper = document.createElement('div');
  $avatarWrapper.className = 'discussion__avatar--wrapper';
  const $avatarImg = document.createElement('img');
  $avatarImg.className = 'discussion__avatar--image';
  $avatarImg.setAttribute('src', avatarUrl);
  $avatarImg.setAttribute('alt', `avatar of ${author}`);

  $avatarWrapper.append($avatarImg);

  // content 컴포넌트
  const $discussionContent = document.createElement('div');
  $discussionContent.className = 'discussion__content';
  const $discussionTitle = document.createElement('h2');
  $discussionTitle.className = 'discussion__title';
  const $discussionLink = document.createElement('a');
  const $discussionInfo = document.createElement('div');
  $discussionInfo.className = 'discussion__information';
  $discussionLink.className = 'discussion__Link';
  $discussionLink.setAttribute('href', url);
  $discussionLink.setAttribute('target', '_blank');
  $discussionLink.setAttribute('rel', 'noopener noreferrer');

  $discussionLink.append(title);
  $discussionTitle.append($discussionLink);
  $discussionInfo.append(`${author} / ${createdAt}`);
  $discussionContent.append($discussionTitle, $discussionInfo);

  // answer 컴포넌트
  const CHECKED_ICON_URL = './img/checked.png';
  const UNCHECKED_ICON_URL = './img/unchecked.png';

  const $discussionAnswered = document.createElement('div');
  $discussionAnswered.className = 'discussion__answered';
  const $discussionAnsweredIcon = document.createElement('img');
  $discussionAnsweredIcon.setAttribute(
    'src',
    answer ? CHECKED_ICON_URL : UNCHECKED_ICON_URL
  );
  $discussionAnsweredIcon.setAttribute(
    'alt',
    answer ? '답변 완료' : '답변 미완료'
  );

  $discussionAnswered.append($discussionAnsweredIcon);

  $li.append($avatarWrapper, $discussionContent, $discussionAnswered);

  return $li;
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
      <li><a href="#" class="pageButton" data-move="toPage">${i}</a></li>`;
  }

  if (firstPage - 1 > 0) {
    pageBtnsHtml =
      `
      <li><a href="#" class="pageButton__first" data-move="toFirst">&lt;&lt;</a></li>
      <li><a href="#" class="pageButton__prev" data-move="toPrev">&lt;</a></li>` +
      pageBtnsHtml;
  }

  if (totalPage > lastPage) {
    pageBtnsHtml += `
    <li><a href="#" class="pageButton__next" data-move="toNext">&gt;</a></li>
    <li><a href="#" class="pageButton__last" data-move="toLast">&gt;&gt;</a></li>`;
  }

  return pageBtnsHtml;
};

const render = ({ discussions, currentPage, currentFilter }) => {
  $discussionsContainer.append($pageBtnsContainer);

  $ul.innerHTML = '';
  $pageBtnsContainer.innerHTML = '';

  const filteredDiscussions =
    currentFilter === 'unchecked'
      ? discussions.filter(({ answer }) => !answer)
      : currentFilter === 'checked'
      ? discussions.filter(({ answer }) => answer)
      : discussions;

  filteredDiscussions
    .slice((currentPage - 1) * 10, currentPage * 10)
    .forEach((discussion) => {
      $ul.append(convertToDiscussion(discussion));
    });

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
