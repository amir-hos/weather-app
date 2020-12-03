import React , {Component} from 'react';
import Form from './Component/Form';
import Weather from './Component/Weather';
const API_KEY = '1d035fa6f58c71b753c6d4509f03f268';
//http://api.openweathermap.org/data/2.5/weather?q=cairo,egypt&appid=e36ed364400282e43250b6c4c0274d44
class App extends Component {
  state={
    temprature:'',
    city:'',
    country:'',
    humitdy:'',
    description:'',
    error:''
  }
  getWeather = async (e)=>{
    e.preventDefault()
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);
    const data = await api.json();
    if(city && country){
      this.setState({
        temprature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error:''
      })
    }else{
      this.setState({
        temprature:'',
        city:'',
        country:'',
        humitdy:'',
        description:'',
        error:'please enter city and country'
      })
    }
  }
  render(){
    return (
      <div className="app">
        <div className="show">
          <Form getWeather={this.getWeather} />
          <Weather
          temprature={this.state.temprature}
          city={this.state.city}
          country={this.state.country}
          humidity={this.state.humidity}
          description={this.state.description}
          error={this.state.error}
          />
        </div>
      </div>
    );
  }

}

export default App;
