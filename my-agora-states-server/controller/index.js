const { agoraStatesDiscussions } = require("../repository/discussions");
const discussionsData = agoraStatesDiscussions;

const discussionsController = {
  findAll: (req, res) => {
    return res.status(200).json(discussionsData); // 모든 discussions 목록을 응답
  },

  findById: (req, res) => {
    const { id } = req.params;
    // find() 주어진 판별 함수를 만족하는 첫 번째로 찾은 요소의 값을 반환한다.
    // 왜 안될까 고민하다보니 req.params가 문자열로 들어온다는 사실을 발견했다..!
    const data = discussionsData.find(el => el.id === Number(id));
    return data ? res.status(200).json(data) : res.status(404).send("Not found."); 
    // 요청으로 들어온 id와 일치하는 discussion을 응답
  },
};

module.exports = {
  discussionsController,
};