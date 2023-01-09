function isAnswered(obj) {
  return typeof obj === "object" && obj?.constructor === Object;
}

function getDiscussionComponent({
  avatarUrl,
  createdAt,
  title,
  url,
  author,
  answer,
}) {
  return `
  <li class="discussion__container">
    <div class="discussion__avatar--wrapper">
      <img class="discussion__avatar--image"
        src="${avatarUrl} "
        alt="${author}">
    </div>
    <div class="discussion__content">
      <h2 class="discussion__title"><a href="${url}">${title}</a></h2>
      <div class="discussion__information">
        <p class="dis_info_name">${author}</p>
        <p class="dis_info_date">${createdAt}</p>
      </div>
    </div>
    <div class="discussion__answered"><p>${
      isAnswered(answer) ? "circle" : "ex"
    }</p></div>
  </li>
`;
}

export default getDiscussionComponent;
