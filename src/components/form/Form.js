import React, { Component } from 'react';
import Input from './Input';
import Button from './Button';
import axios from 'axios';
import { usePromiseTracker, trackPromise } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
// import { emptyStatement } from '@babel/types';

const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();
    return (
        promiseInProgress && 
        <div
            style={{
                width: "100%",
                height: "100",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Loader type="ThreeDots" color="#2BAD60" height={100} width={100} />
        </div>
    );
}

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }

class Form extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        errors: {
            name: '',
            email: '',
            password: '',
            matchPassword: ''
        },
        response: {
            success: '',
            email: '',
            username: ''
        },
        message: '',
        error: null
    }

    change = (e) => {
        e.preventDefault();
        // this.props.onChange({[e.target.name]: e.target.value});
        
        const {name, value} = e.target;
        let errors = this.state.errors;

        switch (name) {
            case 'email':
                // errors.email = 
                // validEmailRegex(value) ? '' : 'Email is not valid!';
                break;
            case 'password':
                errors.password = 
                value.length < 8 ? 'Password must be 8 characters long!' : '';
            case 'confirmPassword':
                errors.matchPassword = 
                value !== this.state.password ? 'Passwords do not match!' : '';
                break;
            default:
                break;              
        }

        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(validateForm(this.state.errors)) {
            trackPromise(
                axios({
                method: "post",
                url: "http://localhost:80/piano/api/register.php",
                headers: { 
                    "access-control-allow-origin": "*",
                    "content-type": "application/json"
                },
                data: this.state
                })
                .then(result => {
                    console.log(result);
                    let data = result.data;
                    if (data.registered) {
                        this.setState({
                            message : data.message,
                            error: ""
                        })
                    } else {
                        this.setState({
                            message: '',
                            error : data.emailError + " " + data.usernameError
                        })
                    }
                })
                .catch(error => { 
                    console.log(error)
                })
            );

        } else {
            console.log(this.state.errors);
        }
    }


    render() {
        const {errors} = this.state;
        return (
            <form className="form-container">
                <label>First Name</label>
                <Input 
                    type={'text'}
                    name={'firstName'}
                    value={this.state.firstName}
                    placeholder={'Enter your first name'}
                    onChange={e => this.change(e)}
                /> 
                <label>Last Name</label>
                <Input 
                    type={'text'}
                    name={'lastName'}
                    value={this.state.lastName}
                    placeholder={'Enter your last name'}
                    onChange={e => this.change(e)}
                />   
                <label>Email</label>
                <Input 
                    type={'text'}
                    name={'email'}
                    value={this.state.email}
                    placeholder={'bob@xyz.com'}
                    onChange={e => this.change(e)}
                />   
                <label>Username</label>
                <Input 
                    type={'text'}
                    name={'username'}
                    value={this.state.username}
                    placeholder={'bob007'}
                    onChange={e => this.change(e)}
                />  
                <label>Password</label>
                <Input 
                    type={'password'}
                    name={'password'}
                    value={this.state.password}
                    onChange={e => this.change(e)}
                />   
                {errors.password.length > 0 && 
                <span className='error'>{errors.password}</span>}
                
                <br />
                <label>Confirm Password</label>
                <Input 
                    type={'password'}
                    name={'confirmPassword'}
                    value={this.state.confirmPassword}
                    onChange={e => this.change(e)}
                />  
                {errors.matchPassword.length > 0 && 
                <span className='error'>{errors.matchPassword}</span>}

                <br />
                <Button 
                    title={'Submit'}
                    action={(e) => this.handleSubmit(e)}
                />
                <br />   
                <LoadingIndicator />
                <br />   
                <label>{this.state.message}</label>
                <label>{this.state.error}</label>                                                                                        
            </form>
        )
    }
}

export default Form;