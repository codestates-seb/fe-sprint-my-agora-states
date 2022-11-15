export default function SearchBox({$discussionWrapper, onClick}){
    const $discussionSearch = document.createElement('section');
    $discussionSearch.classList.add('discussion__search');
    const $searchOption = document.createElement('select');
    $searchOption.setAttribute('name','search_option');
    $searchOption.setAttribute('id','search_option');
    $searchOption.innerHTML = `
        <option value="제목">제목</option>
        <option value="작성자">작성자</option>
    `;
    const $searchInput = document.createElement('input');
    $searchInput.classList.add('search_input');
    const $searchButton = document.createElement('button');
    $searchButton.textContent = '검색';
    $searchButton.classList.add('search_button');

    $searchButton.addEventListener('click',()=>{
        const searchClassification = $searchOption.options[$searchOption.selectedIndex].value;
        const searchContext = $searchInput.value;
        $searchInput.value = '';
        onClick({searchClassification, searchContext})
    })

    $discussionSearch.append($searchOption, $searchInput, $searchButton);
    $discussionWrapper.append($discussionSearch);
}







/*
    <section class="discussion__search">
        <select name="search_option" id="search_option">
          <option value="제목">제목</option>
          <option value="작성자">작성자</option>
        </select>
        <input class="search_input" type="text" />
        <button class="search_button">검색</button>
      </section>

*/