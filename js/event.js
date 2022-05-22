const onClickAddContent = () => {
    const formContainer = document.querySelector('.form__container');
    const addBtn = document.querySelector('.add-btn');
    return addBtn.addEventListener('click', () => {
        formContainer.classList.remove('hide');
        formContainer.classList.add('fadeIn');
    });
};

const onClickCloseModal = () => {
    const closeBtn = document.querySelector('.close-modal');
    const formContainer = document.querySelector('.form__container');
    const formFormat = document.querySelector('form');
    closeBtn.addEventListener('click', () => closeModalAction(formContainer, formFormat));
};

const resetModalAction = (modal) => {
    for(let i = 0; i < modal.length - 1; i++) {
        modal[i].value = '';
    }
};

const closeModalAction = (container, form) => {
    container.classList.remove('fadeIn');
    container.classList.add('hide');
    resetModalAction(form);
};

const onClickSubmit = (dataList) => {
    
    const imgArr = ['https://avatars.githubusercontent.com/u/79903256?s=64&v=4',
  'https://avatars.githubusercontent.com/u/90553688?s=64&u=3c4e4dc2053d4977ac12b9cfc2667582f986d3d8&v=4',
  'https://avatars.githubusercontent.com/u/77476348?s=64&u=64243db62117de5c254c9a76184753b76d7303ff&v=4',
  'https://avatars.githubusercontent.com/u/61141988?s=64&u=92c71910d9f6409d38d40d7d5a0a094d8ec647ed&v=4',
  'https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4',
  'https://avatars.githubusercontent.com/u/86960007?s=64&u=4863a873d78f406d658e8a50d9b91f3045006920&v=4',
  'https://avatars.githubusercontent.com/u/22221941?s=64&u=7332dde3a563f98d2912e107f455ce2265ccca45&v=4',
  'https://avatars.githubusercontent.com/u/103437860?s=64&v=4',
  'https://avatars.githubusercontent.com/u/86960007?s=64&u=4863a873d78f406d658e8a50d9b91f3045006920&v=4'];
    const avatarImgIndex = Math.floor(Math.random() * (((imgArr.length - 1) - 0) + 1));
    const submitBtn = document.querySelector('.form');
    const formContainer = document.querySelector('.form__container');

    submitBtn.addEventListener('submit', (e) => {
        e.preventDefault();
        const dataObj = {
            id: "D_kwDOHOApLM4APfpf",
            createdAt: new Date().toLocaleTimeString(),
            title: e.target[1].value,
            url: "https://github.com/codestates-seb/agora-states-fe/discussions/37",
            author: e.target[0].value,
            bodyHTML: e.target[2].value,
            answer: {},
            avatarUrl: imgArr[avatarImgIndex],
        }
        dataList.unshift(dataObj);
        onClickPageBtn(dataList)
        setLocalData(dataList);
        closeModalAction(formContainer, submitBtn);
        render(dataList, 0);
    });
};

const getFocus = () => {
    let focus = 0;
    return () => {
        
    };
};

const getLocalData = () => {
    return localStorage.getItem('data') 
        ? JSON.parse(localStorage.getItem('data'))
        : agoraStatesDiscussions;
};

const setLocalData = (list) => {
    return localStorage.setItem('data', JSON.stringify(list));
};


const onClickPageBtn = (list) => {
    const pageBtn = document.getElementsByClassName('pagenation__btn');
    addPagenationBtn(list);
    Array.prototype.forEach.call(pageBtn, (v, i) => {
        v.addEventListener('click', (e) => {
            pageNationToggleAction.changeFocus(pageBtn, i);
            // console.log(e.target.textContent);
            render(list, Number(e.target.textContent - 1));
        });
    });
};



const pageNationToggleAction = (() => {
    let focusNum = 0;
    return {
        changeFocus: (element, index) => {
            element[focusNum].classList.remove('pagenation__btn--focus');
            element[index].classList.add('pagenation__btn--focus');
            focusNum = index;
        } 
    };
})();



const mount = (data) => {
    onClickAddContent();
    onClickCloseModal();
    onClickSubmit(data);
    onClickPageBtn(data);
};