const express = require('express')
const bodyParser = require('body-parser')
const https = require("https")
const mongoose = require("mongoose")
const showWeatherController = require("./showWeatherController.js")
const cityModel = require("./models.js")

const urlDB = "mongodb+srv://shrutib952:Learn00000@clusterlearn.6fq3spc.mongodb.net/cityNames?retryWrites=true&w=majority"

const app = express();
const port = process.env.PORT || 3000;


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/Public'));


app.get("/",showWeatherController);

app.get("/go",async(req,res)=>{
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=a451eb7191f5cca07fc18dfb2c10989a&units=metric"
    const data = await fetch(url,{JSON:true});
    console.log(data)
   // res.send(JSON.parse(data))
})

app.post("/addcity",async (req,res)=>{
  const newCity = new cityModel(req.body);
  //res.send(JSON.body)
    try{ 
        await newCity.save();
        res.redirect("/");
      //  res.send(city)
    }catch(err){
        //res.write("nope");
       // res.send(req.body);
        console.log("err" + newCity + err);
        res.redirect("/");
    }
})



app.post("/fhhh",(req,res)=>{
    //res.sendFile(__dirname +  "index.html")
    const city = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=a451eb7191f5cca07fc18dfb2c10989a&units=metric"
    https.get(url, (response)=>{
        response.on("data", (data)=>{
            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const descw = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const imgurl =  "https://openweathermap.org/img/wn/" + icon+"@2x.png"

            res.write("<p1>The weather in "+ city+ " is currently "+ descw +".</p1>");
            res.write("<h1>The temperature is " + temp +" </h1>");
            res.write("<img src= "+imgurl+" >");
            res.send();


        })
    })
})
app.get("/fhhh",(req,res)=>{
    //res.sendFile(__dirname +  "index.html")
    const city = "Delhi";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=a451eb7191f5cca07fc18dfb2c10989a&units=metric"
    https.get(url, (response)=>{
        response.on("data", (data)=>{
            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const descw = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const imgurl =  "https://openweathermap.org/img/wn/" + icon+"@2x.png"

            res.write("<p1>The weather in "+ city+ " is currently "+ descw +".</p1>");
            res.write("<h1>The temperature is " + temp +" </h1>");
            res.write("<img src= "+imgurl+" >");
            res.send();


        })
    })
})

mongoose.connect(urlDB,{
    useNewUrlParser: true,
   
    useUnifiedTopology: true
  })
.then(()=>{
    app.listen(port,"0.0.0.0",()=>{
        console.log("Your app is now listening very carefully!");
    })
},err=>{
    console.log(err);
})