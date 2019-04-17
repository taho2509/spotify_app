import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import albumsHandler from './albums'

var app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.use('/albums', albumsHandler)

app.listen(process.env.NODE_PORT)
