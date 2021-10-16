const express = require('express')
const PORT = 8080;
const app = express();

app.use(express.json())

const subscriberRouter = require('./routes/articles')
app.get('/', subscriberRouter)

app.listen(PORT, ()=> {
    console.log('Server connected')
})