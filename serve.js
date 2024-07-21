const express= require('express')
const dotenv= require('dotenv')
const morgan = require('morgan')
const bodyparser= require('body-parser')
const path = require('path');
const cors = require('cors'); 
const connectDB= require('./server/database/connection')

dotenv.config({path:'config.env'})
const app=express()
const PORT = process.env.PORT || 8080

// Middleware setup
app.use(cors({
    origin: 'https://your-allowed-origin.com',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));



//* log request
app.use(morgan('tiny'))

//* mongodb connection
connectDB()

// * parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))

//*set vew engine
app.set('view engine','ejs')
// app.set('views',path.resolve(__dirname,"views"))

// *load assets

app.use('/css',express.static(path.resolve(__dirname,'assets/css')))
app.use('/img',express.static(path.resolve(__dirname,'assets/img')))
app.use('/js',express.static(path.resolve(__dirname,'assets/js')))



//* load routers
app.use('/',require('./server/routes/router'))

app.listen(PORT, () => {console.log(`server is running http://localhost:${PORT}`)})