export const disctinctArray = (arr) => {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}

export const suffleArray = (arr) => {
    for(let i = arr.length - 1; i >= 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    }
}