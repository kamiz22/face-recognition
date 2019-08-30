import React from 'react';


class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state={
            signInEmail:'',
            signInPassword:''
        }
    }

    emailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    passwordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    submitSignIn = ()=> {
        fetch('https://damp-gorge-60354.herokuapp.com/signin',{
            method:'post',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({
                email:this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then (user => {
            if(user.id){
                this.props.loadUser(user);
                this.props.routeChange('home');
            }else{
                alert("Wrong Email or Password, Please try again");
            }
        })
    }

    render(){
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
                            <input onChange={this.emailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
                            <input onChange={this.passwordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                        </div>
                        </fieldset>
                        <div className="">
                        <input onClick= {this.submitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
                        </div>
                        <div className="lh-copy mt3">
                        <a href="#0" onClick= {()=> this.props.routeChange('register')} className="f6 link dim black db" >Register</a>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
} 
    

export default SignIn;