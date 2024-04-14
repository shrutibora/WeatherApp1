const cityModel = require("./models.js")
//const https = require("https")
const got = require("got")

async function func(city){
  console.log("name:"+city)
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=a451eb7191f5cca07fc18dfb2c10989a&units=metric"
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function forfunc(cities){
  let weather =[]
  for(let i=0; i <cities.length; i++){ 
    //console.log("here: ") ;console.log( cities[0].cityName);
    const city = cities[i]
    func(city.cityName).then(data=>{

          const weatherdata = data
          console.log("ok:"+city.cityName)
          //console.log( data)
          const icon = weatherdata.weather[0].icon;
          const x = {
              cityName : city.cityName,
              temp : weatherdata.main.temp,
              descw : weatherdata.weather[0].description,
              humidity: weatherdata.main.humidity,
              imgurl :  "https://openweathermap.org/img/wn/" + icon+"@2x.png"
          }
          //console.log(x)
          weather.push(x); 
          
      }) 
    }
   // console.log(weather)
    return weather
}
const extra= async(req,res)=>{
  const cities = await cityModel.find({});
  
    const weather = await forfunc(cities)
    //x.then(weather=>{
      //console.log(weather); 
    //.then(promweather=>{
      console.log("here" )
     // console.log(weather)
      res.render(__dirname + "/main.ejs", {weather: weather});
    //}) 
    }
    
  


module.exports= async(req,res)=>{
    const cities = await cityModel.find({});

    const weather =await Promise.all( cities.map(async(city)=>{ 
      //console.log("here: ") ;console.log( cities[0].cityName);
       const weather =  await func(city.cityName).then(data=>{
            const weatherdata = data
            //console.log("ok:"+city.cityName)
            console.log( weatherdata)
            if(weatherdata.cod == '404'){
              const x = {
                cityName : city.cityName,
                temp : '-',
                descw : '-',
                humidity: '-',
                imgurl :  '-'
              }
              return x;
            }
            const icon = weatherdata.weather[0].icon;
            const x = {
                cityName : city.cityName,
                temp : weatherdata.main.temp,
                descw : weatherdata.weather[0].description,
                humidity: weatherdata.main.humidity,
                imgurl :  "https://openweathermap.org/img/wn/" + icon+"@2x.png"
            }
            return x; 
        }) 
        return weather;
      }))
      console.log(weather); 
      //.then(promweather=>{
        console.log("here" )
        console.log(weather)
        res.render(__dirname + "/main.ejs", {weather: weather});
      //}) 
    
}