export const createArrayPrototypeDivide = () => {
    Array.prototype.divide = function (n) {
        const array = this;
        const result = [];
        for (let i = 0; i < this.length; i += n) {
            const item = array.slice(i, i + n);
            result.push(item);
        }
        return result;
    }
}