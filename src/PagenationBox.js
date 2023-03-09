export default function Pagenationbox({$discussionWrapper,initialState ,onClick}){
    this.state = initialState;

    const $pagenation = document.createElement('section');
    $pagenation.classList.add('pagenation');
    $discussionWrapper.append($pagenation);
    
    console.log(this.state.filteredArr);
    this.render = () => {
        let innerTemplate = '<button class="page" value="<<"><<</button>';
        const pagenationEndNum =  Math.ceil(this.state.filteredArr.length / this.state.dropNum);
        for(let i = 1; i <= pagenationEndNum ; i++){
            const checked = this.state.pageNum === i ? 'checked' : '';
            innerTemplate += `<button class= "page ${checked}" value='${i}'>${i}</button>`
        }
        innerTemplate += '<button class="page" value=">>">>></button>';
        $pagenation.innerHTML = innerTemplate;
    }

    $pagenation.addEventListener('click',(e)=>{
        const $target = e.target.closest('.page');
        if($target){
            onClick($target.value, Math.ceil(this.state.filteredArr.length / this.state.dropNum));
        }
    })

    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }

    this.render();
}




/*
<section class="pagenation">
        <button value="<<"><<</button>
        <button value= "class="checked">1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>>></button>
      </section>
*/