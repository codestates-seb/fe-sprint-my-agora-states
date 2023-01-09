const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const request = require('supertest');
const { agoraStatesDiscussions } = require('../repository/discussions');

describe('Bare Minimum Requirements - Server', () => {
  let server;

  describe('GET / 요청: Health check', () => {
    beforeAll(() => {
      server = require('../app').server;
    });

    afterAll(() => {
      server.close();
    });

    test('상태 코드 200과 함께 응답을 보냅니다.', () => {
      return request(server)
        .get('/')
        .then((res) => {
          const { status } = res;
          expect(status).toEqual(200);
          return;
        });
    });
  });

  describe('GET /discussions 요청', () => {
    beforeAll(() => {
      server = require('../app').server;
    });

    afterAll(() => {
      server.close();
    });

    test('상태 코드 200과 함께 응답을 보냅니다.', () => {
      return request(server)
        .get('/discussions')
        .then((res) => {
          const { status } = res;
          expect(status).toEqual(200);
          return;
        });
    });

    test('모든 discussions 목록을 응답으로 보냅니다.', () => {
      return request(server)
        .get('/discussions')
        .then((res) => {
          const { body } = res;
          expect(Array.isArray(body)).toEqual(true);
          agoraStatesDiscussions.forEach((discussion, index) => {
            expect(body[index].title).toEqual(discussion.title)
          })
          return;
        });
    });
  });

  describe('GET /discussions/:id 요청', () => {
    beforeAll(() => {
      server = require('../app').server;
    });

    afterAll(() => {
      server.close();
    });

    test('discussionsData에 해당 id와 일치하는 데이터가 존재하는 경우, 상태 코드 200과 함께 응답을 보냅니다.', () => {
      return request(server)
        .get('/discussions/2')
        .then((res) => {
          const { status } = res;
          expect(status).toEqual(200);
          return;
        });
    });

    test('discussionsData에 해당 id와 일치하는 데이터가 존재하지 않는 경우, 상태 코드 404와 함께 응답을 보냅니다.', () => {
      return request(server)
        .get('/discussions/1239018')
        .then((res) => {
          const { status } = res;
          expect(status).toEqual(404);
          return;
        });
    });

    test('응답의 body 속성으로 id, title, url, author, bodyHTML, avatarUrl이 있어야 합니다.', () => {
      return request(server)
        .get('/discussions/2')
        .then((res) => {
          const { body } = res;
          expect(body.id).toEqual(2);
          expect(body.title).toEqual('[notice] 질문 템플릿');
          expect(body.url).toBeTruthy();
          expect(body.author).toBeTruthy();
          expect(body.bodyHTML).toBeTruthy();
          expect(body.avatarUrl).toBeTruthy();
          return;
        });
    });

    test('discussionsData 중 해당 id와 일치하는 discussion을 응답으로 보냅니다.', () => {
      return request(server)
        .get('/discussions/2')
        .then((res) => {
          const { body } = res;
          expect(body).toEqual(agoraStatesDiscussions.find((d) => d.id === 2));
          return;
        });
    });
  });
});

