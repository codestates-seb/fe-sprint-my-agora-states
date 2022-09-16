console.log('hi')

//event targets
const submitButton = document.querySelector('.submit__button');


//event functions
submitButton.onclick = function (event) { 

  event.preventDefault(); // prevents refreshing;

  const name = document.querySelector('.nameBox');
  const title = document.querySelector('.titleBox');
  const question = document.querySelector('.questionBox');

  if(name.value !== "" && title.value !== "" && question.value.length !== 0){
      console.log('submit 버튼을 클릭하셨습니다.') // check if the function works once the event triggers 

      const name =document.querySelector('.nameBox');
      const title =document.querySelector('.titleBox');
      
      let newData = {'createdAt': new Date(),'title': title.value, 'url': "",'author': name.value, 'answer': null, 'avatarUrl': randomAvatar()};
  
      ul.prepend(convertToDiscussion(newData));
  
      agoraStatesDiscussions.unshift(newData);

  }

  


  name.value = "";
  title.value = "";
  question.value = "";
}


//choose cute avatar randomly
let counter = 0;
  function randomAvatar () { 

    let avatarList = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ43LsWRQEgMs7mg1cFlu6lAXk4tqVyOksjrSRTw3Yy&s",
        "https://i.ytimg.com/vi/MPV2METPeJU/maxresdefault.jpg",
        "https://woodgreen.org.uk/wp-content/uploads/2021/11/hamster_advice_article.jpeg",
        "https://i.pinimg.com/originals/f1/84/bb/f184bb0f1e7833c09ffdbfa9cb767784.jpg",
        "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-476744133-scaled.jpg",
        "https://media.istockphoto.com/photos/young-alpaca-picture-id1280781170?k=20&m=1280781170&s=612x612&w=0&h=flcmxCI-MeoRSAa_a1r3MA5qDhJhslPLu2wp_q-andc=",
        "https://pbs.twimg.com/media/BwTBZ8xCcAEtiSl.jpg",
        "https://www.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-10.jpg"
    ]
    // return avatarList[Math.floor(Math.random() * avatarList.length)] 
    if(counter > avatarList.length - 1){
      counter = 0;
    }
    counter++;
    return avatarList[counter-1];
  }

//pagination
const page1 = document.querySelector('.page1');
const page2 = document.querySelector('.page2');
const page3 = document.querySelector('.page3');
const page4 = document.querySelector('.page4');
const page5 = document.querySelector('.page5');
const page6 = document.querySelector('.page6');
const page7 = document.querySelector('.page7');
const page8 = document.querySelector('.page8');




page1.onclick = function (event) {
  console.log("page1")
  window.location.reload();
}


page2.onclick = function (event) {
  console.log("page2")
  return render2(ul);
}


page3.onclick = function (event) {
  console.log("page3")
  return render3(ul);
}


page4.onclick = function (event) {
  console.log("page4")
  return render4(ul);
}


page5.onclick = function (event) {
  console.log("page5")
  return render5(ul);
}








// const render = (element) => {
//   for (let i = 0; i < 10; i ++) {
//     element.append(convertToDiscussion(agoraStatesDiscussions[i]));
//   }
//   return;
// };




