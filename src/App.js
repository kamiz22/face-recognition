import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Register from './components/Register/Register'
import './App.css';
import Particles from 'react-particles-js';

const partOptions = {
  particles: {
      number:{
        value:40,
        density:{
          enable: true,
          value_area:300,
          
        }
      },
      move:{
        speed:5
      }
    }
}

const initialState = {
  input:'',
    imageUrl:'',
    box:{},
    route:'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      password:'',
      email: '',
      entries:0,
      joined: ''
    }
}
class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState ({user:{
      id: data.id,
      name: data.name,
      password:data.password,
      email: data.email,
      entries:data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLoction = (data)=>{
    const clarifaiBox = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number (image.height);
    return {
      leftCol: clarifaiBox.left_col * width,
      topRow: clarifaiBox.top_row * height,
      rightCol: width - (clarifaiBox.right_col * width),
      bottomRow: height -(clarifaiBox.bottom_row * height)
    }

  }

  displayBox = (box) => {
    this.setState({box: box});
  }

  inputChange = (event) =>{
    this.setState({input: event.target.value});
  }

  buttonSubmitPress = () =>{
    this.setState({imageUrl:this.state.input})
    fetch('https://damp-gorge-60354.herokuapp.com/imageurl',{
      method:'post',
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify({
          input:this.state.input
      })
    })
    .then (response => response.json())
    .then(response => {
      if(response){
        fetch('https://damp-gorge-60354.herokuapp.com/image',{
          method:'put',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify({
              id:this.state.user.id
          })
        })
        .then (response => response.json())
        .then (count => {
          this.setState(Object.assign(this.state.user,{entries: count}))
        })
        .catch(console.log)
      }
        this.displayBox(this.calculateFaceLoction(response))
    })
      
    .catch(err => console.log(err));
  }

  routeChange = (route) => {
    this.setState({route:route})
    if(route ==='signin'){
      this.setState(initialState)
    } else if(route === 'home'){
      this.setState({isSignedIn:true})
    }
  }

  render() {
    const {isSignedIn, imageUrl, route,box} = this.state;
    return(
    <div className="App">
      <Particles className='particles' params={partOptions}/>
      <Navigation isSignedIn={isSignedIn} routeChange={this.routeChange}/>
      <Logo/>
      { route ==='home' ?
      <div>
        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
        <ImageLinkForm 
        inputChange={this.inputChange} 
        buttonSubmitPress={this.buttonSubmitPress}/>
        <FaceRecognition box={box} imageUrl={imageUrl}/>
      </div>
      : (route ==='signin' ?
       <SignIn loadUser={this.loadUser} routeChange={this.routeChange}/>
       :<Register loadUser={this.loadUser} routeChange={this.routeChange}/>
      ) 
      }
      <div className="mt6">
        <p>© 2019 Muli Orgatz</p>
      </div>
    </div>
    );
  }
}

export default App;
