import React from 'react'                                                   
  
class Api extends React.Component {  
  constructor (props) {  
    super(props)  
    this.state = { advice: null }  
    this.URI = 'https://api.adviceslip.com/advice'  
   }  
      
  componentDidMount () {  
    this.getData(this.URI)  
  }  
     
  async getData (URI) {  
    const data = await window  
      .fetch(this.URI)  
      .then(res => res.json())  
      .then(json => json.slip.advice)  
    this.setState({ advice: data })    
  }  
  render () {
    return (
      <div>
        <h1>{this.state.advice}</h1>
        <button>push</button>
      </div>
    )
  }
}

export default Api      