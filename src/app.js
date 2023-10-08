const path = require('path')
const express = require('express')

const hbs = require('hbs')

const app = express()

//paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handle bars engine and views location
app.set('views', viewsPath) 
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//static directory
app.use(express.static(publicDirectoryPath))


app.get('', (req, res)=>{

    res.render('index', {
        title: 'Weather App',
        name: 'Amelia'
    }) 
})

app.get('/about', (req, res)=>{ 

    res.render('about', {
        title: 'About Me',
        name: 'Amelia'
    })
})

app.get('/help', (req, res)=>{

    res.render('help', {
        title: 'this is the help section',
        name: 'Amelia'
     
    })
})

app.get('/weather', (req, res)=>{

    if(!req.query.lat){
        return res.send({
             error: 'Must provide search'
         })
 
     }

    res.send({
        forecast: 'Rainy',
        locaion: 'Mombasa',
        lat: req.query.lat
    })
})

app.get('/products', (req, res)=>{

    if(!req.query.search){
       return res.send({
            error: 'Must provide search'
        })

    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{

    res.render('404', {
        title: 'this is the help section',
        name: 'Amelia',
        errorMessage: 'HELP ARTICLE NOT FOUND!'
     
    })
})

app.get('*', (req, res)=>{

    res.render('404', { 
        title: '404 page',
        name: 'Amelia',
        errorMessage: 'PAGE NOT FOUND!'
     
    })
})

app.listen(3000, ()=>{
    console.log('Server is up and running!')
})