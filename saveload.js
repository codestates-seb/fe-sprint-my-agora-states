/** 닉네임 기반키로 프로필랜덤으로 출력 */
function getRandomprofile(name) {
  const _profileimageList = ['https://cdn.discordapp.com/attachments/1017286837376655413/1020110014825898034/cat.jpg',
    'https://cdn.discordapp.com/attachments/1017286837376655413/1020110015123705907/eaf6bf97-6c5f-4b56-bc21-75ee37980968.png',
    'https://cdn.discordapp.com/attachments/1017286837376655413/1020086428291579945/wa3XJg-b_400x400.jpg'];
  let _sum = 0;
  for (let i = 0; i < name.length; i++ ) {
    _sum += name.charCodeAt(i);
  }
  return _profileimageList[_sum % 3];
}



/** localStorage 에 데이터를 저장함 */
function saveLocalstorageData (){
  const _name = document.querySelector("#name").value;
  const _title = document.querySelector("#title").value;
  const _story = document.querySelector("#story").value;
  const _date = new Date();

  const _object = {
    id: null,
    createdAt: _date,
    title: _title,
    url: null,
    author: _name,
    answer: null,
    bodyHTML:_story,
    avatarUrl: getRandomprofile(_name),
  }
  
  // 작성한 object 를 json 으로 변환
  const _objJSON = JSON.stringify(_object);

  // 랜덤키 생성 대신 현재시간을 키로 사용함
  window.localStorage.setItem(Date.parse(_date), _objJSON);
}

/** localStorage 에서 데이터를 불러옴 */
function loadLocalstoragedata() {
  const _objarr = {};
  for ( let i = 0; i < window.localStorage.length; i ++ ) {
    
    // localStorage 에서 데이터를 가져옴
    const _key    = window.localStorage.key(i);
    const _value  = window.localStorage.getItem(_key);

    // 가져온 JSON 을 다시 Object 로 변환한뒤 키값 그대로 임시객체에 저장
    const _object = JSON.parse(_value);
    _objarr[_key] = _object;
  }

  // 임시객체를 키 값기준으로 정렬한뒤 새로운 객체로 반환
  const _newObject = Object.keys(_objarr).sort().reduce(
    (newObj, key) => {
      newObj[key] = _objarr[key];
      return newObj;
    },
    {}
  );

    // 정렬된 객체의 키값을 배열로 받은 다음, 디스커션 객체에 차례대로 unshift
  const _newObjectKeys = Object.keys(_newObject);

  for ( let i = 0; i < _newObjectKeys.length; i ++ ) {
    agoraStatesDiscussions.unshift(_newObject[_newObjectKeys[i]]);
  }
}