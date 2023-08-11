import { describe, it, before, after } from 'node:test'
import { app } from '../../api.js'
import assert from 'node:assert'


describe('Unit test Suite', () => {
  
  

  // it('should return 401 when user or pwd is invalid', async () => {
  //   const input = {
  //     user: 'invalid',
  //     password: ''
  //   }

  //   const response = await fetch(`${BASE_URL}/login`, {
  //     method: 'POST',
  //     body: JSON.stringify(input)
  //   })

  //   const { status } = response
  //   const expectedCode = 401

  //   assert.strictEqual(status, expectedCode, `status should be 401, actual: ${status}`)

  //   const expectedBody = { error: 'user invalid!' }
  //   const body = await response.json()

  //   console.log(body)
    
  //   assert.deepStrictEqual(body, expectedBody, 
  //     `body should be ${JSON.stringify(expectedBody)}, actual: ${JSON.stringify(body)}`)
  // })

})
