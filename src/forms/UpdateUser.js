import React, { Component } from 'react'
import UserConsumer from '../context'
import axios from "axios"



 class UpdateUser  extends Component {
     
    state = { 
        
        name : "",
        departmen : "",
        salary : "",
        error : false
    }
    
    changeInput = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }


    validateForm = () => {
        const{name,salary,departmen} = this.state;
        if(name === "" || salary === "" || departmen === ""){
            return false;
        }
        return true;
    }

    UpdateUser = async (dispatch,e) => {
        e.preventDefault();

        const{name,salary,departmen} = this.state;
        const {id} = this.props.match.params;
        const updatedUser = {
            name,
            salary,
            departmen
        };

        const response = await axios.put(`http://localhost:3004/users/${id}`,updatedUser)

        dispatch({type:"UPDATE_USER",payload : response.data})
        this.props.history.push("/");
        
    }

    componentDidMount = async () =>{
        const {id} = this.props.match.params;
        const response = await axios.get(`http://localhost:3004/users/${id}`)
        const {name,salary,departmen} = response.data;
        
        this.setState({
            name,
            salary,
            departmen
        });
    }
    
    
    render() {

        const{name , salary,departmen,error} = this.state;
        return <UserConsumer>
        {
            value => {
                const {dispatch} = value;
                return (
                    <div className="col-md-8 mb-4">
                        <div className="card">
                            <div className="card-header">
                            <h4 >Update User Form</h4>
                            </div>
                            <div className="card-body">
                            {
                                error ? 
                                <div className="alert alert-danger">
                                    Lütfen bilgilerinizi kontrol edin.
                                </div>
                                :null
                            }
                            <form onSubmit = {this.UpdateUser.bind(this,dispatch)}>
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
                                <button className="btn btn-danger btn-block" type="submit">Update User</button>
                            </form>
                            </div>
                        
                        </div>
                        
                    </div>
                )
            }
        }
        </UserConsumer>
        
    }
}
export default UpdateUser;
