const stateArr = [null, true, false];

export default function FilterBox({$discussionWrapper, initialState, onClick}){
    this.state = {
        isTrue : initialState,
        index : 0,
    };
    
    const $discussionFilter = document.createElement('section');
    $discussionFilter.classList.add('discussion__filter');
    $discussionWrapper.append($discussionFilter);

    this.render = () => {
        $discussionFilter.innerHTML = '';
        const $filterWrapper = document.createElement('div');
        const innerText = this.state.isTrue === null ? 'none' : String(this.state.isTrue);
        $filterWrapper.innerHTML = `<div>필터: <span class="filter">answerd: ${innerText}</span><div>
        <select>
            <option value="5">5개</option>
            <option value='15'>15개</option>
        </select>
        `
        $discussionFilter.append($filterWrapper);
    }

    $discussionFilter.addEventListener('click',(e)=>{
        const $target = e.target.closest('.filter');
        if(!$target){
            return;
        }
        ++this.state.index;
        onClick(stateArr[this.state.index % 3]);
    })

    this.setState = (nextState) =>{
        this.state = {...this.state, ...nextState};
        this.render();
    }

    this.render();

}









/*

<section class="discussion__filter">
        <spa>필터: <span> answerd : true</span><span> answerd : false</span><span> answerd : none</span></spa>
      </section>

      */