// 로컬 스토리지 스크립트

// 배열을 순회하면서 로컬 스토리지에 저장하는 함수
const setLocalStorageWithData = (arr) => {
    for ( let key in arr) {
      const arrString = JSON.stringify(arr[key])
      window.localStorage.setItem(`${key}`, arrString)
    }
  }
  