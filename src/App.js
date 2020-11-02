import React from 'react';
import './App.scss';
var $ = require( "jquery" )

const colors = ["orange", "red", "yellow", "green", "yellow", "orange", "red", "blue", "blue"]

const pads = [
  {
    Key: "Q",
    url: "https://shotasvedro.s3.eu-central-1.amazonaws.com/Ho+Ho+Ho+St+Nick-SoundBible.com-1954250969.mp3",
    id: "ho ho ho"
  },
  {
    Key: "W",
    url: "https://shotasvedro.s3.eu-central-1.amazonaws.com/openDoor.mp3",
    id: 'door close'
  },
  {
    Key: "E",
    url: "https://shotasvedro.s3.eu-central-1.amazonaws.com/salamisound-8489972-close-a-box-door-flap-also.mp3",
    id: "door slap"
  },
  {
    Key: "A",
    url: "https://shotasvedro.s3.eu-central-1.amazonaws.com/Bass-Drum-Hit-Level-6c-www.fesliyanstudios.com.mp3",
    id: "drum bass",
  },
  {
    Key: "S",
    url: "https://shotasvedro.s3.eu-central-1.amazonaws.com/wetflngk.wav",
    id: "drum hit",
  },
  {
    Key: "D",
    url: "https://shotasvedro.s3.eu-central-1.amazonaws.com/Hi-Hat-Closed-Hit-B1-www.fesliyanstudios.com.mp3",
    id: "plate",
  },
  {
    Key: "Z",
    url: "https://shotasvedro.s3.eu-central-1.amazonaws.com/DOWNWARD.WAV",
    id: "ufo",
  },
  {
    Key: "X",
    url: "https://shotasvedro.s3.eu-central-1.amazonaws.com/krrr.mp3",
    id: "alarm"
  },
  {
    Key: "C",
    url: "https://shotasvedro.s3.eu-central-1.amazonaws.com/screw.mp3",
    id: "screw",
  }
]

/* this is class for single Pad (key) and all functions for 
 * it */
class DrumPad extends React.Component {
  constructor(props){
    super(props);
    this.playSound = this.playSound.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }
  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyPress)
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyPress)
  }
  handleKeyPress(event){
    if(this.props.power){
        if(String.fromCharCode(event.which) === this.props.id){
        const sound = document.getElementById(this.props.id);
        sound.play();
        // change text on display
        this.props.updateDisplay(this.props.clipName)
        // play with opacity of the pad
        $('#'+this.props.id).parent().animate({opacity: 0.5}, 100, function(){
          $(this).animate({opacity: 1}, 100)
        })
      }  
    }
    
        
  }
  playSound() {
    if(this.props.power){
       let sound = document.getElementById(this.props.id);
      sound.play()
      // change text on display
      this.props.updateDisplay(this.props.clipName)
      // play with opacity of the pad
       $('#'+this.props.id).parent().animate({opacity: 0.5}, 100, function(){
          $(this).animate({opacity: 1}, 100)
        })
    }
   
  }
  render(){
    return (
    <div 
      id={this.props.clipName}
      className="drum-pad"
      onClick={this.playSound}
      style={{background: this.props.color}}
      > 
        <audio
          className="clip"
          id={this.props.id}
          src={this.props.url}
          />
        {this.props.id}
    </div>
    )
  }
}

 /* this is a class for all keys 
  * it creates a list of pads and then is added 
  * on the page*/
class Keyboard extends React.Component{
  render(){
    var keyboard = pads.map((padObj, i) => {
      console.log(padObj.Key)
      return (

        <DrumPad 
          id={padObj.Key}
          url={padObj.url}
          clipName={padObj.id}
          color={colors[i]}
          updateDisplay={this.props.updateDisplay}
          power={this.props.power}
          />
      )
    }); 
    
    return (
       <div id="keyboard">
        {keyboard}
       </div>
    )
  }
}


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      power: false,
      display: String.fromCharCode(32)
    }
    this.updateDisplay = this.updateDisplay.bind(this)
    this.powerControl = this.powerControl.bind(this)
  }
  
  powerControl(){
    this.setState({
      power: !this.state.power,
      display: String.fromCharCode(32)
    })
  }  
  updateDisplay(name){
    this.setState({
      display: name
  })
}

  render(){
   const powerStyle = this.state.power
      ? {
          float: 'right',
          backgroundColor: 'white'
        }
      : {
          float: 'left',
          backgroundColor: '#c3c0c0'
        }
   return (
     <>
       <div>
           <h2>Sounds are not very melodic,but anyway... enjoy</h2>
         </div>
      <div id="drum-machine">

         <Keyboard 
           updateDisplay={this.updateDisplay}
           power={this.state.power}
           />
         <div id="controls">
          <div id="display">{this.state.display}</div>
           <div id="power">
            <p>Power</p>
            <div class="select" onClick={this.powerControl}>
              <div class="inner" style={powerStyle}></div>  
            </div>
           </div>
        </div>
      </div>
     </>
)
  }
}



export default App;
