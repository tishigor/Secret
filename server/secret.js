const express = require('express')
const path = require('path')
const cors = require('cors')
const handlers = require('./lib/handlers')

require("dotenv").config();
require('./db')

const app = express()

app.use('/api', cors())

app.use(express.json())

app.get('/api/content/:uuid', handlers.getContent)
app.post('/api/content/', handlers.saveContent)
app.delete('/api/content/:uuid', handlers.deleteContent);

app.use(express.static(path.resolve(__dirname, 'client')))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

require("dotenv").config({
    path: path.join(__dirname, "..", ".env")
});
const port = process.env.PORT || 3000
if(require.main === module) {
    app.listen(port, () => {
        console.log( `Express started on http://localhost:${port}; press Ctrl-C to terminate.` )
    })
} else {
    module.exports = app
}