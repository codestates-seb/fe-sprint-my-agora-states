const { agoraStatesDiscussions } = require("../repository/discussions");
const discussionsData = agoraStatesDiscussions;

const handleRequestBody = (req, res) => {
  if (!req.body) return res.status(400).send("no request body");
  const { title, author, bodyHTML } = req.body;
  if (!title && !author && !bodyHTML)
    return res.status(400).send("bad request");
  return true;
};

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

  createOne: (req, res) => {
    const { title, author, bodyHTML } = req.body;

    if (handleRequestBody(req, res) !== true) return;
    const id = parseInt(Math.random() * 10000);
    const avartarId = parseInt(Math.random() * 100);
    const url =
      "https://github.com/codestates-seb/agora-states-fe/discussions/" + id;
    const newDiscussion = {
      id,
      createdAt: new Date().toISOString(),
      title,
      url,
      author,
      answer: null,
      bodyHTML,
      avatarUrl: `https://randomuser.me/api/portraits/men/${avartarId}.jpg`,
    };
    discussionsData.unshift(newDiscussion);
    return res.status(201).send("resource created successfully: ID " + id);
  },

  updateById: (req, res) => {
    if (handleRequestBody(req, res) !== true) return;
    const idx = discussionsData.findIndex(
      (d) => d.id === Number(req.params.id)
    );
    const updated = {
      ...discussionsData[idx],
      ...req.body,
      updatedAt: new Date().toISOString(),
    };

    if (idx !== -1) {
      discussionsData.splice(idx, 1, updated);
      return res.status(200).send("resource updated successfully");
    } else {
      return res.status(404).send("Not found");
    }
  },

  deleteById: (req, res) => {
    const idx = discussionsData.findIndex(
      (d) => d.id === Number(req.params.id)
    );
    if (idx !== -1) {
      discussionsData.splice(idx, 1);
      return res.status(202).send("resource deleted successfully");
    } else {
      return res.status(404).send("Not found");
    }
  },
};

module.exports = {
  discussionsController,
};
