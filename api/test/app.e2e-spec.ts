import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { App } from 'supertest/types'
import { AppModule } from './../src/app.module'
import { DevSeeder } from '@/database/seeders/dev.seeder'
import { MikroORM } from '@mikro-orm/core'

describe('AppController (e2e)', () => {
  let app: INestApplication<App>
  let orm: MikroORM

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    orm = app.get(MikroORM)
    await orm.schema.refreshDatabase()
    await orm.seeder.seed(DevSeeder)
  })

  afterAll(async () => {
    await orm.close(true)
    await app.close()
  })

  let accessToken: string
  let refreshToken: string
  let customerAccessToken: string

  describe('AUTH ENDPOINTS', () => {
    it('/auth/login (POST)', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'user@test.com',
          password: 'acknee',
        })
        .expect(201)

      const expectedBody = {
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      }
      expect(response.body).toMatchObject(expectedBody)

      accessToken = response.body.accessToken
      refreshToken = response.body.refreshToken

      return response
    })

    it('/auth/login (POST) - customer', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'customer@test.com',
          password: 'acknee',
        })
        .expect(201)

      const expectedBody = {
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      }
      expect(response.body).toMatchObject(expectedBody)

      customerAccessToken = response.body.accessToken

      return response
    })

    it('/auth/login (POST) - invalid credentials', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'invalid@test.com',
          password: 'acknee',
        })
        .expect(401)

      const expectedBody = {
        message: 'Unauthorized',
        statusCode: 401,
      }
      expect(response.body).toMatchObject(expectedBody)

      return response
    })

    it('/auth/register (POST)', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'testuser@test.com',
          password: 'acknee',
        })
        .expect(201)

      return response
    })

    it('/auth/refresh (POST)', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/refresh')
        .send({ refreshToken })
        .expect(201)

      const expectedBody = {
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      }
      expect(response.body).toMatchObject(expectedBody)

      return response
    })
  })

  describe('BOX ENDPOINTS', () => {
    describe('/box/:boxId', () => {
      it('/box/234 (GET)', async () => {
        const response = await request(app.getHttpServer())
          .get('/box/234')
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(200)

        const expectedBody = {
          id: 234,
          identifier: 'B234',
          geom: {
            lon: 17.0313134,
            lat: 51.0926429,
          },
        }
        expect(response.body).toMatchObject(expectedBody)

        return response
      })

      it('/box/234 (GET) - no auth token', async () => {
        const response = await request(app.getHttpServer())
          .get('/box/234')
          .expect(401)

        const expectedBody = {
          error: 'Unauthorized',
          message: 'access token not valid',
          statusCode: 401,
        }
        expect(response.body).toMatchObject(expectedBody)

        return response
      })

      it('/box/2341234123412342 (GET) - non existing id', async () => {
        const response = await request(app.getHttpServer())
          .get('/box/2341234123412342')
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(404)

        const expectedBody = {
          error: 'Not Found',
          message: 'box with id 2341234123412342 not found',
          statusCode: 404,
        }
        expect(response.body).toMatchObject(expectedBody)

        return response
      })

      it('/box/234 (GET) - check that customer does not have access', async () => {
        const response = await request(app.getHttpServer())
          .get('/box/2341234123412342')
          .set('Authorization', `Bearer ${customerAccessToken}`)
          .expect(401)

        const expectedBody = {
          error: 'Unauthorized',
          message: 'user has to be a supplier to operate boxes',
          statusCode: 401,
        }
        expect(response.body).toMatchObject(expectedBody)

        return response
      })
    })
  })

  describe('/box/list', () => {
    const lat = 51.066875
    const lon = 13.746496

    it('/box/list (GET)', async () => {
      const response = await request(app.getHttpServer())
        .get(`/box/list?lat=${lat}&lon=${lon}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)

      const expectedBody = {
        currentPage: 1,
        totalPages: 1145,
        isPrev: false,
        isNext: true,
        total: 11444,
        nodes: [
          {
            id: 1,
            identifier: 'B1',
            geom: {
              lat: 51.0668767,
              lon: 13.7464958,
            },
            distance: 0.18964315,
          },
          {
            id: 61,
            identifier: 'B61',
            geom: {
              lat: 51.0657811,
              lon: 13.7411034,
            },
            distance: 397.11453062,
          },
          {
            id: 6931,
            identifier: 'B6931',
            geom: {
              lat: 51.0662349,
              lon: 13.7403241,
            },
            distance: 438.45436306,
          },
          {
            id: 6370,
            identifier: 'B6370',
            geom: {
              lat: 51.0720762,
              lon: 13.7397666,
            },
            distance: 746.52439459,
          },
          {
            id: 6900,
            identifier: 'B6900',
            geom: {
              lat: 51.065749,
              lon: 13.7349819,
            },
            distance: 816.77355977,
          },
          {
            id: 7631,
            identifier: 'B7631',
            geom: {
              lat: 51.0579375,
              lon: 13.7617644,
            },
            distance: 1460.92576081,
          },
          {
            id: 67,
            identifier: 'B67',
            geom: {
              lat: 51.0522951,
              lon: 13.7402506,
            },
            distance: 1680.06392514,
          },
          {
            id: 346,
            identifier: 'B346',
            geom: {
              lat: 51.0563816,
              lon: 13.7655042,
            },
            distance: 1771.58464825,
          },
          {
            id: 112,
            identifier: 'B112',
            geom: {
              lat: 51.0809936,
              lon: 13.758577,
            },
            distance: 1784.37215149,
          },
          {
            id: 263,
            identifier: 'B263',
            geom: {
              lat: 51.0808682,
              lon: 13.7307709,
            },
            distance: 1907.37701781,
          },
        ],
      }
      expect(response.body).toMatchObject(expectedBody)

      return response
    })

    it('/box/list (GET) - no lat & lon', async () => {
      const response = await request(app.getHttpServer())
        .get('/box/list')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(400)

      const expectedBody = {
        error: 'Bad Request',
        message: 'Longitude must be a number between -180 and 180',
        statusCode: 400,
      }
      expect(response.body).toMatchObject(expectedBody)

      return response
    })

    it('/box/list (GET) - page, search and limit', async () => {
      const response = await request(app.getHttpServer())
        .get(`/box/list?lat=${lat}&lon=${lon}&page=2&limit=2&search=b23`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)

      const expectedBody = {
        currentPage: 2,
        totalPages: 5722,
        isPrev: true,
        isNext: true,
        total: 11444,
        nodes: [
          {
            id: 23,
            identifier: 'B23',
            geom: {
              lat: 51.048519,
              lon: 12.2934394,
            },
            distance: 101893.45258559,
          },
          {
            id: 2321,
            identifier: 'B2321',
            geom: {
              lat: 50.5169118,
              lon: 14.9732012,
            },
            distance: 105944.22890198,
          },
        ],
      }
      expect(response.body).toMatchObject(expectedBody)

      return response
    })
  })

  describe('/box/:boxid/open', () => {
    it('/box/234/open (POST)', async () => {
      const response = await request(app.getHttpServer())
        .post('/box/234/open')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ packageCode: '1bo3j5b' })
        .expect(201)

      const expectedBody = {
        success: expect.any(Boolean),
      }
      expect(response.body).toMatchObject(expectedBody)

      return response
    })

    it('/box/234/open (POST) - invalid packageCode', async () => {
      const response = await request(app.getHttpServer())
        .post('/box/234/open')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ packageCode: 'xxx' })
        .expect(404)

      const expectedBody = {
        error: 'Not Found',
        message: 'package with code xxx not found',
        statusCode: 404,
      }
      expect(response.body).toMatchObject(expectedBody)

      return response
    })

    it('/box/123412341234123/open (POST) - invalid id', async () => {
      const response = await request(app.getHttpServer())
        .post('/box/123412341234123/open')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ packageCode: '1bo3j5b' })
        .expect(404)

      const expectedBody = {
        error: 'Not Found',
        message: 'box with id 123412341234123 not found',
        statusCode: 404,
      }
      expect(response.body).toMatchObject(expectedBody)

      return response
    })
  })

  describe('/box/:boxid/closed', () => {
    it('/box/234/closed (POST)', async () => {
      const response = await request(app.getHttpServer())
        .post('/box/234/closed')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ packageCode: '1bo3j5b' })
        .expect(201)

      const expectedBody = {
        success: expect.any(Boolean),
      }
      expect(response.body).toMatchObject(expectedBody)

      return response
    })

    it('/box/234/closed (POST) - invalid packageCode', async () => {
      const response = await request(app.getHttpServer())
        .post('/box/234/closed')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ packageCode: 'xxx' })
        .expect(404)

      const expectedBody = {
        error: 'Not Found',
        message: 'package with code xxx not found',
        statusCode: 404,
      }
      expect(response.body).toMatchObject(expectedBody)

      return response
    })

    it('/box/123412341234123/closed (POST) - invalid id', async () => {
      const response = await request(app.getHttpServer())
        .post('/box/123412341234123/closed')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ packageCode: '1bo3j5b' })
        .expect(404)

      const expectedBody = {
        error: 'Not Found',
        message: 'box with id 123412341234123 not found',
        statusCode: 404,
      }
      expect(response.body).toMatchObject(expectedBody)

      return response
    })
  })
})
