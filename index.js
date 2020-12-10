const express = require('express')
const app = express()
const port = 3000
const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.use(express.static('public/css'))

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})
