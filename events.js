console.log('hi')

//event targets
const submitButton = document.querySelector('.submit__button');


//event functions
submitButton.onclick = function (event) { 
    const name = document.querySelector('.nameBox');
    const title = document.querySelector('.titleBox');

    if(name.value !== "" && title.value !== ""){
        console.log('submit 버튼을 클릭하셨습니다.') // check if the function works once the event triggers 

        const name =document.querySelector('.nameBox');
        const title =document.querySelector('.titleBox');
        
        
      
      
        let newData = {'createdAt': printClock(),'title': title.value, 'url': "",'author': name.value, 'answer': null, 'avatarUrl': randomAvatar()};
    
        ul.prepend(convertToDiscussion(newData));
    
        agoraStatesDiscussions.push(newData);

    }

    
    event.preventDefault(); // prevents refreshing;
  }


//choose cute avatar randomly
  function randomAvatar () { 
    let avatarList = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ43LsWRQEgMs7mg1cFlu6lAXk4tqVyOksjrSRTw3Yy&s",
        "https://i.ytimg.com/vi/MPV2METPeJU/maxresdefault.jpg",
        "https://woodgreen.org.uk/wp-content/uploads/2021/11/hamster_advice_article.jpeg",
        "https://i.pinimg.com/originals/f1/84/bb/f184bb0f1e7833c09ffdbfa9cb767784.jpg",
        "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-476744133-scaled.jpg"
    ]
    return avatarList[Math.floor(Math.random() * avatarList.length)] 
  }



