const { agoraStatesDiscussions } = require("../repository/discussions");
const discussionsData = agoraStatesDiscussions;

const discussionsController = {
  findAll: (req, res) => {
    // TODO: 모든 discussions 목록을 응답합니다.
    const { author } = req.query;
    if (author) {
      res.json(discussionsData.filter((item) => item.author === author));
    } else {
      res.json(discussionsData);
    }
  },

  findById: (req, res) => {
    // TODO: 요청으로 들어온 id와 일치하는 discussion을 응답합니다.
    const { id } = req.params;

    if (id) {
      const discussion = discussionsData.find((item) => item.id === Number(id));
      if (discussion) {
        res.json(discussion);
      } else {
        res.status(404).json({ error: "Discussion not found." });
      }
    }
  },
};

module.exports = {
  discussionsController,
};
