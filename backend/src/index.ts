import albumsHandler from './albums'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

var app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/albums', albumsHandler)

app.listen(process.env.NODE_PORT)
