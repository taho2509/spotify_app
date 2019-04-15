import albumsHandler from './albums'
import koa from 'koa'
import cors from 'koa-cors'

var app = new koa();

app.use(cors())
app.use(albumsHandler)

app.listen(process.env.NODE_PORT, function(){
   console.log('Server running on https://localhost:3002')
});