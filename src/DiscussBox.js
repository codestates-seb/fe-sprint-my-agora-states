export default function Discussbox({$discussionWrapper, initialState}){
    this.state = initialState;
    
    const $discussContainer = document.createElement('article');
    $discussContainer.classList.add('discussions__container');
    const $discussTable = document.createElement('table');
    $discussTable.innerHTML = 
    `
        <thead>
            <tr>
                <th>avatar</th>
                <th>title</th>
                <th>user</th>
                <th>time</th>
                <th>answerd</th>
            </tr>
        </thead>  
    `
    $discussContainer.append($discussTable);
    $discussionWrapper.append($discussContainer);

    this.render = () =>{
        if(document.querySelector('tbody')) document.querySelector('tbody').remove();
        const newArr = this.state.filteredArr;
        
        const $tbody = document.createElement('tbody');
        const startNum = this.state.dropNum * (this.state.pageNum - 1) 
        const endNum = startNum + this.state.dropNum ;
        let innerTemplate = '';
        
        for(let i = startNum; i < endNum; i++){
            
            if(!newArr[i]) break;
            const answerIcon = newArr[i].answer === null ? '☒' : '☑'; 
            innerTemplate += `
                <tr>
                    <td>
                        <span>
                            <img class="discussion__avatar--image"
                                src="${newArr[i].avatarUrl}"
                                alt="avatar of ${newArr[i].author}">
                        </span>
                    </td>
                    <td><h2 class="discussion__title"><a href="${newArr[i].url}">${newArr[i].title}</a></h2></td>
                    <td><span class="discussion__user">${newArr[i].author}</span></td>
                    <td><span class="discussion__time">${new Intl.DateTimeFormat('kr').format(new Date(newArr[i].createdAt))}</span></td>
                    <td>${answerIcon}</td>
                </tr>
            `
        }
        $tbody.innerHTML = innerTemplate;
        $discussTable.append($tbody);
    }

    const answered = (object) => {
        switch(this.state.isTrue){
            case null :
                return true;
                break;
            case true :
                if(object.answer) return true
                else return false;
                break;
            case false :
                if(!object.answer) return true
                else return false;
                break;
        }
    }

    const search = (object) => {
        if(this.state.searchContext === null){
            return true;
        }
        switch(this.state.searchClassification){
            case '제목' :
                return object.title.includes(this.state.searchContext);
                break;
            case '작성자' :
                return object.author.includes(this.state.searchContext);
                break;
            }
    }

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    

    this.render();


}






/*
<article class="discussions__container">
        <table >
          <thead>
            <tr>
              <th>avatar</th>
              <th>title</th>
              <th>user</th>
              <th>time</th>
              <th>answerd</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span>
                  <img class="discussion__avatar--image"
                src="https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4"
                alt="avatar of kimploo">
              </span></td>
              <td><h2 class="discussion__title"><a href="https://github.com/codestates-seb/agora-states-fe/discussions/6">[notice] 좋은 질문하는 법</a></h2></td>
              <td><span class="discussion__user">kimploo</span></td>
              <td><span class="discussion__time">2022-04-22T14:08:33Z</span></td>
              <td>☑</td>
            </tr>
          </tbody>
        </table>
      </article>

*/