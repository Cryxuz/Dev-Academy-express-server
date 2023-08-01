import { test, expect } from 'vitest'
import request from 'supertest'
import server from './server.js'

// Homepage
test('The homepage says Hompage', async () => {
  // ACT
  const res = await request(server).get('/')

  // ASSERT
  expect(res.statusCode).toBe(200)
  expect(res.text).toMatch(/Homepage/)
})
// Compliment
test('/compliment says "This is not a compliment. You are an idiot!"', async () => {
  // ACT
  const res = await request(server).get('/!compliment')
  // ASSERT
  expect(res.statusCode).toBe(200)
  expect(res.text).toMatch('This is not a compliment. You are an idiot!')
})

// Silvia's profile
test("get silvia's profile (query)", async () => {
  // ACT
  const res = await request(server).get('/profile?name=silvia')
  // ASSERT
  expect(res.statusCode).toBe(200)
  expect(res.text).toMatch(/Silvia's/)
})
// Sampson's profile
test("get sampson's profile (query)", async () => {
  // ACT
  const res = await request(server).get('/profile?name=sampson')
  // ASSERT
  expect(res.statusCode).toBe(200)
  expect(res.text).toMatch(/Sampson's/)
})
// POST named-compliment
test('POST ', async () => {
  // ACT
  const res = await request(server)
    .post('/named-compliment')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send('name=user')

  // ASSERT
  expect(res.statusCode).toBe(200)
  expect(res.text).toMatch(/user, you are awesome!!/)
})

// Error test

test('/wrong URL response with a 404', async () => {
  // ACT
  const res = await request(server).get('/!wrong-url')

  // ASSERT
  expect(res.statusCode).toBe(404)
})
