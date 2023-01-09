let today = new Date();   

let year = today.getFullYear();
let month = today.getMonth() + 1;
let date = today.getDate();
let day = today.getDay(); 
let hour = today.getHours();
let minutes = today.getMinutes();

if(hour > 12){
    hour = `PM ${hour-12}시`;
}else {
    hour = `AM ${hour}시`
}

const clock = document.querySelector('.clock')

let time = `${year}년${month}월${date}일 `
let time2 = `${hour} ${minutes}분`

clock.append(time, time2);

// document.write(year + '/' + month + '/' + date)
// document.write('<br>')
