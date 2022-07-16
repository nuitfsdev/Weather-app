const express=require('express')
const path=require('path')
const hbs=require('hbs')
const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode')

const app=express()

const port=process.env.PORT || 3000

const publicDirectPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname, '../templates/views')
const partailsPath=path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partailsPath)

app.use(express.static(publicDirectPath))

app.get('', (req, res)=>{
    res.render('index',{
        title:"Weather App",
        name: "Nam Nguyen"
    })
})
app.get('/about', (req, res)=>{
    res.render('about',{
        title:"About me",
        name: "Nam Nguyen"
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        return res.send("You must provide a search item")
    }
    console.log(req.query.search)
    res.send({
        product:[]
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send("You must provide an address")
    }
    geocode(req.query.address, (error,{latitude,longitude,location}={}) => {
        if (error) {
            return res.send({error})
        }
        console.log(req.query.address,latitude,longitude,location)
        forecast(latitude,longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})
app.get('/help', (req, res)=>{
    res.render('help',{
        title:"Help",
        name: "Nam Nguyen"
    })
})
app.get('/help/*', (req, res)=>{
    res.render('404',{
        title:"404",
        name: "Nam Nguyen",
        errorMessage: "Help article not found"
    })
})
app.get('*', (req,res)=>{
    res.render('404',{
        title:"404",
        name: "Nam Nguyen",
        errorMessage: "Page not found."
    })
})
app.listen(port, ()=> {
    console.log("Server is up on port "+port)
})