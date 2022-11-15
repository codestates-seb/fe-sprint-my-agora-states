const rowPerPage = 5;
const rows = document.querySelectorAll('.discussions__container > li');
const rowCount = rows.length;;
const pageCount = Math.ceil(rowCount/rowPerPage);
console.log(pageCount);
const numbers = document.querySelector("#numbers");


// ol 안에 페이지 1,2,3..이 나오게 하려면 
// ol.append(li)
// createElement('li') => <li></li>
// .textContent => <li>1</li>



for(let i =1; i<=pageCount;i++){
    const li = document.createElement("li");
    li.className = "pageLi"
    const a = document.createElement("a");
    a.setAttribute('href','');
    li.append(a);
    numbers.append(li);   
    a.textContent =  a.textContent+`${i}` ;

}

const numBtn = numbers.querySelectorAll('a');

numBtn.forEach((item,idx) =>{
    item.addEventListener('click',(event)=>{
        event.preventDefault();
      

        displayRow(idx);//인데스 번호
    })
})

function displayRow(idx){
    //순수 배열로 바꿔주기 = [...]
    let start= idx*rowPerPage;
    let end = start + rowPerPage;
    let rowsArray = [...rows];
    
    for(i of rowsArray){
        i.style.display = 'none';
    }

    let newRows = rowsArray.slice(start,end)
   
    for(i of newRows){
        i.style.display = ''
    }
    for(i of numBtn){
        i.classList.remove('active');
    }
    numBtn[idx].classList.add('active')
}
displayRow(0);





