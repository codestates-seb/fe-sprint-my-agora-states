import agoraStatesDiscussions from "./src/data.js";
import Discussbox from "./src/DiscussBox.js";
import FilterBox from "./src/FilterBox.js";
import { FormBox } from "./src/FormBox.js";
import Pagenationbox from "./src/PagenationBox.js";
import SearchBox from "./src/SearchBox.js";

const $discussionWrapper = document.querySelector('.discussion__wrapper');
const $main = document.querySelector('main');




// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);


function app(){
    this.state ={
      pageNum : 1,
      dropNum : 5,
      isTrue : null,
      searchClassification : '제목',
      searchContext : '',
      agoraStatesDiscussions,
      filteredArr : [],
    }


    const searchSection = new SearchBox({$discussionWrapper, onClick:(value)=>{
      this.setState({searchClassification : value.searchClassification, searchContext : value.searchContext, pageNum: 1});
    }});

    const filterBox = new FilterBox({$discussionWrapper,
       initialState : this.state.isTrue,
       onClick : (value)=>{
        this.setState({isTrue : value, pageNum : 1});
       }
      });
    
    const discussBox = new Discussbox({$discussionWrapper, initialState : this.state});
    
    const pagenation = new Pagenationbox({$discussionWrapper, initialState : this.state,
      onClick : (value, pagenationEndNum)=>{
          console.log("value", value);
          if(value === '<<'){
            this.setState({pageNum : 1});
            return;
          }

          if(value === '>>'){
            this.setState({pageNum : pagenationEndNum});
            return;
          }
          this.setState({pageNum : Number(value)});
      }
    })

    const formBox = new FormBox({$main, onSubmit:(obj)=>{
      console.log(obj);
      agoraStatesDiscussions.unshift(obj);
      this.setState();
    }});

    this.setState = (nextState) =>{
      this.state = {...this.state,...nextState};
      this.state = {...this.state, filteredArr : getFilterArr()};
      filterBox.setState({isTrue : this.state.isTrue})
      discussBox.setState(this.state);
      pagenation.setState(this.state);
      console.log(this.state);
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

  

  const getFilterArr = () =>{
    const filteredArr = this.state.agoraStatesDiscussions.filter((object)=>{
      return answered(object) && search(object);
  })
  return filteredArr;
  }

  const init = () =>{
    this.setState();
  }
  init();
    

}

new app();






































// // convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
// const convertToDiscussion = (obj) => {
//   const li = document.createElement("li"); // li 요소 생성
//   li.className = "discussion__container"; // 클래스 이름 지정

//   const avatarWrapper = document.createElement("div");
//   avatarWrapper.className = "discussion__avatar--wrapper";
//   const discussionContent = document.createElement("div");
//   discussionContent.className = "discussion__content";
//   const discussionAnswered = document.createElement("div");
//   discussionAnswered.className = "discussion__answered";

//   // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.



//   li.append(avatarWrapper, discussionContent, discussionAnswered);
//   return li;
// };

// // agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// const render = (element) => {
//   for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
//     element.append(convertToDiscussion(agoraStatesDiscussions[i]));
//   }
//   return;
// };

// // ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
// const ul = document.querySelector("ul.discussions__container");
// render(ul);


