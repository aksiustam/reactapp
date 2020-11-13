import React, { Component } from 'react'
 class test extends Component {
     constructor(props) {
         super(props);
         //console.log(this.props);
        this.state = { a:10}
        console.log("Constructor");
     }
     componentDidMount() {
            console.log("comp_didMount");
            this.setState({ a:20})
    }
    
    componentDidUpdate =(prevProps, prevState) =>{
        console.log("Comp Did Update");
    }
    
    shouldComponentUpdate(){
        console.log("shouldComponentUpdate");
        return true;
    }
    render() {
        console.log("Render");
        
        return (
            <div>
                Heyyyy
            </div>
        )
    }
}

export default test;