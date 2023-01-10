// long shadow 효과
const originBox = document.querySelectorAll('.discussion__container');
let shadow ='';
for(let i = 0; i < 50; i++) {
  shadow += (shadow? ',' : '') +  i + 0.1+'px ' + i + '0.1px 0.1px 0 #2A3990';
}


console.log(typeof(originBox[0].style.boxShadow));
console.log(typeof(originBox[1].style.boxShadow));
console.log(originBox[0].style.boxShadow);
console.log(originBox[1].style.boxShadow);
// console.log(originBox);
// console.log(originBox.style);
// console.log(originBox.style.boxShadow);

// console.log(shadow);
for(const index in originBox) {
    // console.log(originBox[index]);
    originBox[index].style['box-shadow'] = shadow;
}