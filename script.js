class DiscussionList {
  data;
  numberOfPage;

  constructor(discussions) {
    this.data = discussions ?? [];
    this.#updateNumberOfPage();
  }

  addDiscussion(discussion) {
    this.data.unshift(discussion);
    this.#updateNumberOfPage();
  }

  #updateNumberOfPage() {
    this.numberOfPage =
      this.data.length % 10 == 0 ? this.data.length / 10 : this.data.length / 10 + 1;
  }
}

class DiscussionForm {
  name;
  title;
  story;

  constructor(name, title, story) {
    this.name = name ?? "";
    this.title = title ?? "";
    this.story = story ?? "";
  }

  init() {
    this.name = "";
    this.title = "";
    this.story = "";
  }

  onChange(e) {
    if (["name", "title", "story"].includes(e.target.name)) {
      this[e.target.name] = e.target.value;
    }
  }

  convertToDiscussion() {
    return {
      id: "",
      createdAt: `${new Date()}`,
      title: this.title,
      url: "",
      author: this.name,
      answer: null,
      bodyHTML: this.story,
    };
  }
}

class DiscussionComponent {
  constructor(discussions, name, title, story) {
    this.discussionForm = new DiscussionForm(name, title, story);
    this.discussionList = new DiscussionList(discussions);
  }

  #init(e) {
    this.discussionForm.init();
    if (e.target.tagName == "FORM") {
      const $form = e.target;
      $form.querySelector("input[name=name]").value = "";
      $form.querySelector("input[name=title]").value = "";
      $form.querySelector("textarea[name=story]").value = "";
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.discussionList.addDiscussion(this.discussionForm.convertToDiscussion());
    this.#init(e);
    this.render(1);
  }

  render(page) {
    const $ul = document.querySelector("ul.discussions__container");
    $ul.innerHTML = this.discussionList.data
      .slice(10 * (page - 1), 10 * page)
      .map((discussion) => {
        return `
          <li class="discussion__container">
            <div class="discussion__avatar--wrapper">
              <img
                class="discussion__avatar—image"
                src="https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4"
                alt="avatar of kimploo"
              />
            </div>
            <div class="discussion__content">
              <h2 class="discussion__title">
                <a
                  href="#"
                  >${discussion.title}</a
                >
              </h2>
              <div class="discussion__information">
                ${discussion.author} / ${discussion.createdAt}
              </div>
            </div>
            <div class="discussion__answered"><p>☑</p></div>
          </li>
        `;
      })
      .join();

    const $page = document.querySelector("div.pagenation__container");
    $page.innerHTML = "";
    for (let i = 1; i <= this.discussionList.numberOfPage; i++) {
      $page.innerHTML += `<button onclick="discussionPage.render(${i})">${i}</button>`;
    }
  }
}

const discussionPage = new DiscussionComponent(agoraStatesDiscussions);
discussionPage.render(1);
