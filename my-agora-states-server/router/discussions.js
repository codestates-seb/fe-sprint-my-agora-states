// TODO: discussions 라우터를 완성합니다.
const { discussionsController } = require('../controller');
const { findAll, findById, createOne, updateById, deleteById } = discussionsController;
const express = require('express');
const router = express.Router();

router.get('/', findAll); // 모든 discussions 목록을 조회하는 라우터

router.get('/:id', findById); // :id에 맞는 discussion을 조회하는 라우터

module.exports = router;