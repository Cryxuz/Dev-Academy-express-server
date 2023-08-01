import * as Path from 'node:path/posix'
import * as URL from 'node:url'

import express from 'express'

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

const server = express()

server.use(express.static(Path.resolve(__dirname, 'public')))

server.use(express.urlencoded({ extended: false }))

server.get('/', (req, res) => {
  res.send('<h1>Homepage</h1>')
})
server.get('/!compliment', (req, res) => {
  res.send('This is not a compliment. You are an idiot!')
})

server.get('/profile', (req, res) => {
  const user = req.query.name

  if (user === 'silvia') {
    res.sendFile(__dirname + '/public/silvia.html')
  } else if (user === 'sampson') {
    res.sendFile(__dirname + '/public/sampson.html')
  }
})
server.get('/profiles/:id', (req, res) => {
  const id = req.params.id
  console.log(req.params)
  if (id === '1') {
    res.sendFile(__dirname + '/public/silvia.html')
  } else if (id === '2') {
    res.sendFile(__dirname + '/public/sampson.html')
  } else {
    res.send('Unknown ID')
  }
})

server.post('/named-compliment', (req, res) => {
  const name = req.body.name
  res.send(`<h1>${name}, you are awesome!!</h1>`)
})
export default server
