
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const port = 3005
const app = express()

const publicDr = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)


const currentData ={
    title: 'index',
    name: 'makafa'
}



app.use(express.static(publicDr))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather app',
        name: 'herobiam heita'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'Weather app',
        name: 'herobiam heita'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        helptext: 'This is a help text',
        title: 'help',
        name: 'Herobiam Heita'
    })
})



app.get('/weather', (req, res)=>{
    if (!req.query.address){
        return res.send({
            error:'provide address'
        })
    }

    geocode(req.query.address, (error, {latitude, logitude, location} ={}) =>{
        if(error){
            return res.send(error)
        }
        forecast(latitude, logitude, (error, data) =>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: data,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     forcast: forecast.feeling,
    //     location: geocode.address,
    //     address: req.query.address
    // })
})

app.get('/product', (req, res)=>{
    if (!req.query.search){

        return res.send({
            error: 'you must provide a search term'
        })

    }
    console.log(req.query)
    res.send({
        product:[]

    })
})

app.get('/help/*', (req, res)=>{
    res.send('help article not found')
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        errorMessage: 'page not found'

    })
})
app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})