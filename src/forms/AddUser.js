import React, { Component } from 'react'
import posed from 'react-pose' 
import UserConsumer from '../context'
import axios from "axios"


const Animation = posed.div({
    visible : { opacity: 1,
        applyAtStart : { display :"block"}},
    hidden : { opacity : 0,
        applyAtEnd: {display : "none"}}
});

 class AddUser extends Component {
     
    state = { 
        visible : false,
        name : "",
        departmen : "",
        salary : "",
        error : false
    }
    changeVis = (e) => { this.setState({
        visible : !this.state.visible
    })}
    validateForm = () => {
        const{name,salary,departmen} = this.state;
        if(name === "" || salary === "" || departmen === ""){
            return false;
        }
        return true;
    }
    changeInput = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    addUser = async (dispatch,e) => {
        e.preventDefault();
        const{name,departmen,salary} = this.state;

        const newUser={
            name : name,
            salary:salary,
            departmen:departmen
        }
        if(!this.validateForm()){
            this.setState({error :true})
            return;
        }


        const response = await axios.post("http://localhost:3004/users",newUser)
        dispatch({type : "ADD_USER",payload:response.data});

        this.props.history.push("/");
    }
    render() {

        const{visible , name , salary,departmen , error} = this.state;
        return <UserConsumer>
        {
            value => {
                const {dispatch} = value;
                return (
                    <div className="col-md-8 mb-4">
                    <button onClick = {this.changeVis} className="btn btn-dark btn-block mb-2">{visible ? "Hideform" : "Show Form"}</button>
                        <Animation pose= {visible ? "visible":"hidden"}>
                        <div className="card">
                            <div className="card-header">
                            <h4 >Add User Form</h4>
                            </div>
                            <div className="card-body">
                            {
                                error ? 
                                <div className="alert alert-danger">
                                    Lütfen bilgilerinizi kontrol edin.
                                </div>
                                :null
                            }
                            <form onSubmit = {this.addUser.bind(this,dispatch)}>
                                <div className="form-group">
                                    <label htmlFor="name" >Name</label>
                                    <input onChange={this.changeInput} type="text" name="name" id = "id" placeholder="Enter Name" className="form-control" value={name}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="departmen" >Departmen</label>
                                    <input onChange={this.changeInput} type="text" name="departmen" id = "departmen" placeholder="Enter Departmen" className="form-control" value={departmen}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="salary" >Salary</label>
                                    <input onChange={this.changeInput} type="text" name="salary" id = "salary" placeholder="Enter Salary " className="form-control"value={salary}/>
                                </div>
                                <button className="btn btn-danger btn-block" type="submit">Add User</button>
                            </form>
                            </div>
                        
                        </div>
                        </Animation>
                    </div>
                )
            }
        }
        </UserConsumer>
    }
}
export default AddUser;
