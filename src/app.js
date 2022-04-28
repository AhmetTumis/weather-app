let express = require('express')
let path = require('path')
let hbs = require('hbs')
let geocode = require('./utils/geocode.js')
let weather = require('./utils/weather.js')
console.log(__dirname)

let app = express()
let port = process.env.PORT || 3000
//paths
let publicDirPath = path.join(__dirname, '../public/')
let viewsPath = path.join(__dirname,'../templates/views')
let partialsPath = path.join(__dirname,'../templates/partials')

//app settings
app.set('view engine','hbs')
app.set('views', viewsPath)
app.set('x-powered-by', true)
hbs.registerPartials(partialsPath)

//static dir
app.use(express.static(publicDirPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        author: 'Ahmet'
    })
})

app.get('/about',(req,res)=>{
    res.render('about', {
        title: 'About Page',
        author: 'ahmet'
    })
})

app.get('/help',(req,res)=>{
    res.render('help', {
        title: 'Help Page',
        author: 'ahmet'
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title:'404 help page',
        author:'ahmet',
        errorMessage:'Help Page not found'
    })
})


app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an adress'
        })
    }
    
    
    geocode(req.query.address, (error, {latitude, longitude, location} = { })=>{
    
        if(error){
            return res.send(error)
        }
        
        weather(latitude, longitude,(error,weatherdata)=>{
            if(error){
                return console.log(error)
            }
            
            console.log(location)
            console.log(weatherdata)


            res.send({
                weatherdata: weatherdata,
                location: location,
                ip: req.ip,
                address: req.query.address    
            })


        })
    })



    
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})


app.get('*', (req,res)=>{
    res.render('404',{
        title:'404 page',
        author:'ahmet',
        errorMessage:'Page not found'
    })
})


app.listen(port, ()=>{
    console.log('hey')
})