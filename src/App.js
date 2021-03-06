import React,{Component} from 'react';
import Navigation from './components/navigation/navigation';
import SignIn from './components/signin/signin';
import Register from './components/register/register';
/*import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkform';*/
import Particles from 'react-particles-js';
import './App.css';



const particlesoptions={
  
                particles: {
                number:{
                  value:200,
                  density:{
                 enable:true,
                 value_area:1000
                  }
              }
            }
          }

const intialState={
    
      input:'',
      imageUrl:'',
      box:{},
      route:'signin',
      isSignedIn:false,
      user:{
          id:'',
          name:'',
          email:'',
          entries:0,
          joined: ''

      }
}


class App extends Component{
  constructor(){
    super();
    this.state=intialState;
    }
  

loadUser=(data)=>{
  this.setState({user:{
          id:data.id,
          name:data.name,
          email:data.email,
          entries:data.entries,
          joined:data.joined
  }})


}

  onInputChange=(event)=>{
  this.setState({input:event.target.value});
  }

onSubmit = ()=>{
  this.setState({imageUrl:this.state.input});
      fetch('http://localhost:3000//imageurl',{
         method:'post',
         headers:{'Content-Type':'application/json'},
         body:JSON.stringify({
         input:this.state.input
         })
       })
      .then(response=>response.json())
      .then(response=>{
      if(response){
      fetch('http://localhost:3000//image',{
          method:'put',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
           id:this.state.user.id
          })
         })
     .then(response=>response.json())
     .then(count=>{
      this.setState(Object.assign(this.state.user,{entries:count}))

     })
        .catch(console.log)
    }
    this.displayFaceBox(this.calculateFaceLocation(response))
      })
   .catch(err=>console.log(err));
}

onRouteChange=(route)=>{
if(route==='signout'){
  this.setState(intialState)
}
else if(route==='home'){
  this.setState({isSignedIn:true})
}
this.setState({route:route})
}


render() {
 const {isSignedIn,imageUrl,route,box}=this.state; 
  return (
    <div className="App">
     <Particles className='particles'
              params={particlesoptions}
            />
     <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
    {
       route==='signin'
       ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
       : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
    
   
    }
    </div>
  );
}
}
export default App;
