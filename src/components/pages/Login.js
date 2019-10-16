import React, { Component } from 'react';
import Input from '../form/Input';
import Button from '../form/Button';
import axios from 'axios';

const validate = (email, pass) => {
    return email.length > 0 && pass.length > 0 ? true : false; 
}

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    change = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (validate(this.state.email, this.state.password)) {
            console.log("passed validation");
            axios({
                method: "post",
                url: "http://localhost:80/piano/api/login.php",
                headers: { 
                    "access-control-allow-origin": "*",
                    "content-type": "application/json"
                },
                data: this.state
            }).then(result => {
                console.log(result);
                let expire = result.data.expireAt;
                let token = result.data.jwt;
                
                localStorage.setItem('jwt', token);
                localStorage.setItem('expiration', expire);
                
            }).catch(error => {
                console.log(error);
            });
        } else {
            console.log("insufficient data");
        }
    }
    render() {
        return (
            <form className="login-form">
                <label>Email</label>
                <Input 
                    type={'text'}
                    name={'email'}
                    value={this.state.email}
                    placeholder={'Enter your email'}
                    onChange={e => this.change(e)}
                />
                <Input 
                    type={'password'}
                    name={'password'}
                    value={this.state.password}
                    placeholder={'Enter your password'}
                    onChange={e => this.change(e)}
                />    
                <Button 
                   title={'Submit'}
                   action={(e) => this.handleSubmit(e)}                
                />            
            </form>

        )
    }
}

export default Login;
