import { describe, it, before, after } from 'node:test'
import { app } from '../../api.js'
import assert from 'node:assert'
describe('API E2E test Suite', ()=> {
  let BASE_URL = ''
  let _server = {}
  let _globalToken = ''
  before(async () => {
    _server = app
    _server.listen()
    await new Promise((resolve, reject) => {
      _server.once('listening', () => {
        const { port } = _server.address()
        BASE_URL = `http://localhost:${port}`
        console.log(`Server listening on ${BASE_URL}`)
        resolve()
      })
    })
  })

  after((done) => _server.close(done))

  describe('login', () => {
    it('should return 401 when user or pwd is invalid', async () => {
      const input = {
        user: 'invalid',
        password: ''
      }

      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        body: JSON.stringify(input)
      })

      const { status } = response
      const expectedCode = 401

      assert.strictEqual(status, expectedCode, `status should be 401, actual: ${status}`)

      const expectedBody = { error: 'user invalid!' }
      const body = await response.json()

      console.log(body)
      
      assert.deepStrictEqual(body, expectedBody, 
        `body should be ${JSON.stringify(expectedBody)}, actual: ${JSON.stringify(body)}`)
    })

    it('should return 200 when user and pwd is valid', async () => {
      const input = {
        user: 'erickwendel',
        password: '123'
      }

      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        body: JSON.stringify(input)
      })

      
       const { status } = response
       const expectedCode = 200

      assert.strictEqual(status, expectedCode, `status should be ${expectedCode}, actual: ${status}`)
      const body = await response.json()

      // test if object has property token
      assert.ok(body.token.length > 20, 'body should have property token')
      _globalToken = body.token

    })



  })

  describe('base', () => {
    it('should not be allow to access private data without a token ', async () => {
      const input = {
        headers: {
          authorization: ''
        }
      }

      const response = await fetch(`${BASE_URL}/`, {
        method: 'GET',
        headers: input.headers
      })

      const { status } = response
      const expectedCode = 400

      assert.strictEqual(status, expectedCode, `status should be 400, actual: ${status}`)

      const expectedBody = { error: 'invalid token!' }
      const body = await response.json()

      // console.log(body)
      
       assert.deepStrictEqual(body, expectedBody, 
         `body should be ${JSON.stringify(expectedBody)}, actual: ${JSON.stringify(body)}`)
    })

    it('should be allow to access private data with a token ', async () => {
      const input = {
        headers: {
          authorization: _globalToken
        }
      }

      const response = await fetch(`${BASE_URL}/`, {
        method: 'GET',
        headers: input.headers
      })

      const { status } = response
      const expectedCode = 200

      assert.strictEqual(status, expectedCode, `status should be 200, actual: ${status}`)

      const expectedBody = { result: 'Hey welcome!' }
      const body = await response.json()
      assert.ok(body.result.length > 5, 'body should have property token')
      
       assert.deepStrictEqual(body, expectedBody, 
         `body should be ${JSON.stringify(expectedBody)}, actual: ${JSON.stringify(body)}`)
    })

  })
})