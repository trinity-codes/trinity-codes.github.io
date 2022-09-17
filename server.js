const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()

// ========================
// Link to Database
// ========================
// Updates environment variables
// @see https://zellwk.com/blog/environment-variables/
require('dotenv').config();


// Replace process.env.DB_URL with your actual connection string
//const connectionString = process.env.DB_URL

MongoClient.connect('mongodb+srv://seikosama:19951016@cluster0.o4phinn.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to Database`)
        const db = client.db('coffee-butter-quotes')
        const quotesCollection = db.collection('quotes')

    // ========================
    // Middlewares
    // ========================    
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(express.static('public'))


    // ========================
    // Routes
    // ========================
    app.get('/', (req, res) => {
        db.collection('quotes').find().toArray()
          .then(quotes => {
            res.render('index.ejs', { quotes: quotes })
          })
          .catch(error => console.error(error))
    })

    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
          .then(result => {
            res.redirect('/')
          })
          .catch(error => console.error(error))
    })

    app.delete('/quotes', (req, res) => {
      quotesCollection.deleteOne(
        {quote: req.body.quote}
      )
        .then(result => {
            console.log('Quote Deleted')
            res.json('Quote Deleted')
        })
        .catch(error => console.error(error))
      console.log(req.body);
    })

    // ========================
    // Listen
    // ========================
    const isProduction = process.env.NODE_ENV === 'production'
    const port = isProduction ? 7500 : 3000
    app.listen(port, function () {
      console.log(`listening on ${port}`)
    })
  })

  .catch(console.error)

