// @ts-check

import { createDiscussion } from "./createElement.js";

/**
 * @typedef { import("../@types/discussion").Discussion } Discussion
 */

/**
 * 2023/01/07 - 초기화 - by 1-blue
 * 1. 페이지네이션 버튼들 생성
 *
 * @param { HTMLUListElement } $paginationButtonWrapper
 * @param { number } discussionCount
 * @param { number } limit
 * @returns { number } total page count
 */
export const init = ($paginationButtonWrapper, discussionCount, limit) => {
  // 전체 페이지 수
  const totalPageCount = Math.ceil(discussionCount / limit);

  const $fragment = document.createDocumentFragment();

  const $prevButton = document.createElement("button");
  $prevButton.type = "button";
  $prevButton.dataset.value = "prev";
  $prevButton.innerText = "◀";
  $prevButton.disabled = true;
  const $nextButton = document.createElement("button");
  $nextButton.type = "button";
  $nextButton.dataset.value = "next";
  $nextButton.innerText = "▶";

  Array(totalPageCount)
    .fill(null)
    .forEach((v, i) => {
      const $pageButton = document.createElement("button");

      $pageButton.type = "button";
      $pageButton.dataset.value = i + 1 + "";
      $pageButton.innerText = i + 1 + "";

      $fragment.appendChild($pageButton);
    });

  $fragment.prepend($prevButton);
  $fragment.appendChild($nextButton);

  $paginationButtonWrapper.appendChild($fragment);

  return totalPageCount;
};

/**
 * 2023/01/06 - 모든 질문들 생성 및 추가 넣기 - by 1-blue
 * @param { Discussion[] } discussions
 * @param { HTMLUListElement } $discussionsWrapper 모든 "discussion"들이 들어갈 컨테이너
 */
export const render = (discussions, $discussionsWrapper) => {
  // lcoalStorage 데이터 가져오기
  const temp = localStorage.getItem("discussions");
  let savedDiscussions = [];
  if (temp) {
    savedDiscussions.push(...JSON.parse(temp));
  }
  discussions.unshift(...savedDiscussions);

  discussions.forEach((discussion) =>
    $discussionsWrapper.appendChild(createDiscussion(discussion))
  );
};

/**
 * 2023/01/07 - 페이지네이션 - by 1-blue
 * @param { HTMLUListElement } $discussionsWrapper
 * @param { HTMLUListElement } $paginationButtonWrapper
 * @param { { current: number; limit: number; total: number; } } pageData
 */
export const pagination = (
  $discussionsWrapper,
  $paginationButtonWrapper,
  pageData
) => {
  // 보여질 범위 ( 1 ~ 10, 11 ~ 20, 21 ~ 30 )
  const range = {
    start: pageData.current * pageData.limit - 9,
    end: pageData.current * pageData.limit,
  };

  // 현재 페이지에 해당하는 discussion들만 보여주기
  $discussionsWrapper.childNodes.forEach((v, i) => {
    if (!(v instanceof HTMLElement)) return;

    if (i >= range.start && i <= range.end) {
      v.classList.remove("hide");
    } else {
      v.classList.add("hide");
    }
  });

  // active
  $paginationButtonWrapper.childNodes.forEach((node, i) => {
    if (!(node instanceof HTMLElement)) return;

    if (i === pageData.current) {
      node.classList.add("active-page");
    } else {
      node.classList.remove("active-page");
    }
  });
};
