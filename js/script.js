// @ts-check

/**
 * "Discussion" 타입 가져오기
 *
 * @typedef { import("../@types/discussion").Discussion } Discussion
 */

// dummy data
import { agoraStatesDiscussions } from "./data.js";

// create element
import { createDiscussion } from "./createElement.js";

// function ( 기능 )
import { init, pagination, render } from "./function.js";

// util
import {
  resizeTextarea,
  resetInputAndTextarea,
  validateSubmit,
} from "./utils.js";

// 즉시 실행 함수
(() => {
  /**
   * 모든 질문들이 담길 컨테이너
   * @type { HTMLUListElement | null }
   */
  const $discussionsWrapper = document.querySelector("ul.discussions__wrapper");
  /** @type { HTMLInputElement | null } */
  const $name = document.querySelector(".form__input--name input");
  /** @type { HTMLInputElement | null } */
  const $title = document.querySelector(".form__input--title input");
  /** @type { HTMLTextAreaElement | null } */
  const $discussion = document.querySelector(".form__textbox textarea");
  /** @type { HTMLButtonElement | null } */
  const $submit = document.querySelector(".form__submit button[type='submit']");
  /** @type { HTMLUListElement | null } */
  const $paginationButtonWrapper = document.querySelector(
    ".pagination_button_wrapper"
  );

  /** @type { { current: number; limit: number; total: number; } } */
  const pageData = {
    current: 1,
    limit: 10,
    total: 1,
  };

  if (!$discussionsWrapper)
    return alert(`"ul.discussions__wrapper"가 없습니다.`);
  if (!$name) return alert(`".form__input--name input"가 없습니다.`);
  if (!$title) return alert(`".form__input--title input"가 없습니다.`);
  if (!$discussion) return alert(`".form__textbox textarea"가 없습니다.`);
  if (!$submit)
    return alert(`".form__submit button[type='submit']"가 없습니다.`);
  if (!$paginationButtonWrapper)
    return alert(`".pagination_wrapper"가 없습니다.`);

  // textarea 자동 높이 조절 이벤트 등록
  $discussion.addEventListener("keydown", resizeTextarea);
  $discussion.addEventListener("keyup", resizeTextarea);

  // submit 버튼 활성화 여부 이벤트 등록
  [$name, $title, $discussion].forEach((v, i, arr) =>
    v.addEventListener("keyup", () => validateSubmit(arr, $submit))
  );

  // discussion 생성 이벤트 등록
  $submit.addEventListener("click", (e) => {
    e.preventDefault();

    const name = $name.value.trim();
    const title = $title.value.trim();
    const discussion = $discussion.value.trim();

    // 유효성 검사 ( 입력 여부만 검사 ( 공백 제외 ) )
    if (!name) {
      alert("이름을 입력해주세요!");
      $name.focus();
      $name.select();

      return;
    }
    if (!title) {
      alert("제목을 입력해주세요!");
      $title.focus();
      $title.select();

      return;
    }
    if (!discussion) {
      alert("질문 내용을 입력해주세요!");
      $discussion.focus();
      $discussion.select();

      return;
    }

    /** @type { Discussion } */
    const createdDiscussion = {
      id: Date.now() + "",
      createdAt: new Date() + "",
      title,
      url: "",
      author: name,
      answer: null,
      bodyHTML: `<p>${discussion}</p>`,
      avatarUrl: "https://avatars.githubusercontent.com/u/63289318?v=4",
    };

    // 데이터상으로 추가
    agoraStatesDiscussions.unshift(createdDiscussion);

    // 화면에 렌더링
    $discussionsWrapper.prepend(createDiscussion(createdDiscussion, false));

    // input/textarea/button 초기화
    resetInputAndTextarea([$name, $title, $discussion]);
    $submit.disabled = true;

    // lcoalStorage에 저장 ( 기존 데이터 + 현재 데이터 )
    const temp = localStorage.getItem("discussions");
    let savedDiscussions = [];
    if (temp) {
      savedDiscussions.push(...JSON.parse(temp));
    }
    localStorage.setItem(
      "discussions",
      JSON.stringify([createdDiscussion, ...savedDiscussions])
    );

    alert(`"${title}"이 등록되었습니다.`);
  });

  // 페이지네이션 이벤트 등록 ( 이벤트 버블링 )
  $paginationButtonWrapper.addEventListener("click", (e) => {
    if (!(e.target instanceof HTMLButtonElement)) return;

    const { value } = e.target.dataset;

    if (value === "prev") {
      --pageData.current;
      if (pageData.current < 1) pageData.current = 1;
    } else if (value === "next") {
      ++pageData.current;
      if (pageData.current > pageData.total) pageData.current = pageData.total;
    } else {
      if (typeof value === "string") {
        pageData.current = +value;
      }
    }

    const $prevButton = $paginationButtonWrapper.childNodes[0];
    const $nextButton =
      $paginationButtonWrapper.childNodes[
        $paginationButtonWrapper.childNodes.length - 1
      ];

    if (pageData.current === 1) {
      if ($prevButton instanceof HTMLButtonElement) {
        $prevButton.disabled = true;
      }
    } else {
      if ($prevButton instanceof HTMLButtonElement) {
        $prevButton.disabled = false;
      }
    }
    if (pageData.current === pageData.total) {
      if ($nextButton instanceof HTMLButtonElement) {
        $nextButton.disabled = true;
      }
    } else {
      if ($nextButton instanceof HTMLButtonElement) {
        $nextButton.disabled = false;
      }
    }

    // 페이지네이션 ( 현재 페이지 엘리먼트만 렌더링, 페이지 버튼 조작 )
    pagination($discussionsWrapper, $paginationButtonWrapper, pageData);
  });

  // pagination을 위한 하단 버튼들 추가
  pageData.total = init(
    $paginationButtonWrapper,
    agoraStatesDiscussions.length,
    pageData.limit
  );
  // discussion들 추가
  render(agoraStatesDiscussions, $discussionsWrapper);
  // 페이지네이션 ( 현재 페이지 엘리먼트만 렌더링, 페이지 버튼 조작 )
  pagination($discussionsWrapper, $paginationButtonWrapper, pageData);
})();
