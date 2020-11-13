import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserConsumer from "../context"
import {Link} from "react-router-dom"
import axios from "axios"

class User extends Component {

    state = {
        isVisible : false,

    }
        
    onClickEvent=(number ,e) =>{
        this.setState({
            isVisible : !this.state.isVisible
        })

    }
    onDeleteUser = async (dispatch,e) => {
        const {id} = this.props;
        //DELETE
        await axios.delete(`http://localhost:3004/users/${id}`)
        // Consumer Dispatch
        dispatch({type : "DELETE_USER",payload:id})
    }
    

    render() {

        // Destruscting
        const{id ,name,departmen,salary} = this.props;
        const{isVisible} = this.state;
        return(
            <UserConsumer>
            {
                value => {
                    const {dispatch} = value;

                    return (
                    <div className ="col-md-8 mb-4" >
                        <div className="card">
                            <div className="card-header d-flex justify-content-between" style = {isVisible ?{backgroundColor : "#62848d" , color : "white"} : null}>
                                <h4 className="d-inline" onClick= {this.onClickEvent.bind(this,34)}>{name}</h4>
                                <i onClick={this.onDeleteUser.bind(this,dispatch)} className="fas fa-trash-alt" style ={{cursor : "pointer"}}></i>
                            </div>
                            {
                                isVisible ? <div className="card-body">
                                <p className="card-text">Maaş : {salary}</p>
                                <p className="card-text">Yeri : {departmen}</p>
                                <Link to ={`edit/${id}`} className= "btn btn-dark btn-block">Update User</Link>
                            </div> : null
                            }
                            
                        </div>
                    </div>
                    )

                }
            }
            
            </UserConsumer>
        )
       
    }
}
User.defaultProps = {
    name : "Bilgi Yok",
    salary : "Bilgi Yok",
    departmen : "Bilgi Yok"
}
User.propTypes = {
    name : PropTypes.string.isRequired,
    salary : PropTypes.string.isRequired,
    departmen : PropTypes.string.isRequired,
    id : PropTypes.string.isRequired
}
export default User;


//     constructor(props){
        //     super(props);
        //     this.state = {
        //         isVisible : false
        //     }
        // }
        // constructor(props){
        //     super(props)
        //     this.onClickEvent = this.onClickEvent.bind(this);
        // }
