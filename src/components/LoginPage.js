import React, {Component} from 'react';
import $ from 'jquery';
import {apiBaseUrl} from './config.jsx'

const readCookie = require('../cookie.js').readCookie;
const eraseCookie = require('../cookie.js').eraseCookie;
const createCookie = require('../cookie.js').createCookie;

const email_validator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forgotPassword: false
        }
    }

    loginUser = (e) => {
        e.preventDefault();
        let email = $('#login-form #email').val();
        let password = $('#login-form #password').val();

        if (email !== '' && email.match(email_validator) !== null && password !== '') {
            $('#login-spinner').removeClass('d-none');
            $('#login-spinner').css('display', 'block');
            $('#login-span').addClass('d-none');

            let data = {email, password};

            fetch(apiBaseUrl + '/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => {
                return response.json();
            }).then(data => {
                if (data.status === 'ok') {
                    createCookie('access_token', data['accessToken'], 30);
                    createCookie('refresh_token', data['refreshToken'], 30);
                    createCookie('userData', JSON.stringify(data['data']), 30);
                    window.location.pathname = "";
                } else if (data.status === 'error') {
                    $('#login-spinner').addClass('d-none');
                    $('#login-span').removeClass('d-none');

                    if (data.showMessage) $('.red-color.error').html(data.message);
                    else $('.red-color.error').html('Oops! Something went wrong');
                    $('.red-color.error').css('display', 'block');
                }
            });
        } else {
            if (email === '' || email.match(email_validator) === null) {
                $('#login-form #email').addClass('wrong');
                $('#login-form #email').siblings('label').addClass('wrong');
                $('#login-spinner').addClass('d-none');
                $('#login-spinner').css('display', 'block');
                $('#login-span').removeClass('d-none');
            } else if (password === '') {
                $('#login-form #password').addClass('wrong');
                $('#login-form #password').siblings('label').addClass('wrong');
                $('#login-spinner').addClass('d-none');
                $('#login-spinner').css('display', 'block');
                $('#login-span').removeClass('d-none');
            }
        }
    };

    componentDidMount() {
        $('#login-spinner').css('display', 'none');
    }

    setLoginForm = () => {
        $(document).ready(() => {
            $('.form').find('input, textarea').on('keyup blur focus', (e) => {
                var $this = $(e.target), label = $this.prev('label');
                if ($(this).hasClass('wrong')) $(this).removeClass('wrong');
                if (e.type === 'keyup') {
                    if ($this.val() === '') label.removeClass('highlight');
                    else label.addClass('active highlight');
                } else if (e.type === 'blur') {
                    if ($this.val() === '') label.removeClass('active highlight');
                    else label.removeClass('highlight');
                } else if (e.type === 'focus') {
                    label.addClass('active highlight');
                }
            });

            $('body').click();

            if ($('input#email').val() !== '') {
                if (!$('input#email').siblings('label').hasClass('active')) $('input#email').siblings('label').addClass('active');
            }
            if ($('input#password').val() !== '') {
                if (!$('input#password').siblings('label').hasClass('active')) $('input#password').siblings('label').addClass('active');
            }
        });
    };

    componentDidUpdate() {
        this.setLoginForm();
    }

    change() {
        if ($('#login-form #email').siblings('label').hasClass('wrong')) {
            $('#login-form #email').siblings('label').removeClass('wrong');
        }
        if ($('#login-form #password').siblings('label').hasClass('wrong')) {
            $('#login-form #password').siblings('label').removeClass('wrong');
        }
    }

    render() {
        return (
            <div id="login-container">
                <div className="sahaj-front sahaj-front-mobile"></div>
                {(() => {
                    if (this.state.forgotPassword === false) {
                        return (
                            <div className="form form-mobile">
                                <div className="tab-content">
                                    <div id="login" className="text-center">
                                        <h1>Welcome Back!</h1>
                                        <form id="login-form" onSubmit={this.loginUser}>
                                            <div className="field-wrap">
                                                <label> Email Address<span className="req">*</span> </label>
                                                <input id="email" type="email" required autoComplete="off"
                                                       onChange={this.change}/>
                                            </div>
                                            <div className="field-wrap">
                                                <label> Password<span className="req">*</span> </label>
                                                <input id="password" type="password" required autoComplete="off"
                                                       onChange={this.change}/>
                                            </div>
                                            <div className="field-wrap">
                                                <span className="red-color error"></span>
                                            </div>
                                            <button
                                                className="button button-block d-flex justify-content-center align-items-center">
                                                <i id="login-spinner" className="fas fa-spinner fa-spin mr10"
                                                   style={{display: 'none'}}></i>
                                                <span id="login-span">Log In</span>
                                            </button>
                                            {/*<a className="forgot">
			                  <span id="forgot-span" onClick={this.forgotPassword.bind(this)}>Forgot Password?</span>
			                </a>*/}
                                        </form>
                                        {/*<img src={"/images/le_black.png"} style={{marginTop: 30, width: 200}} />*/}
                                    </div>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div className="form forgot form-mobile text-center">
                                <div className="tab-content">
                                    <div id="forgot-password">
                                        <h2>Forgot Password</h2>
                                        <div className="field-wrap">
                                            <label> Email Address<span className="req">*</span> </label>
                                            <input id="email" type="email" required autoComplete="off"
                                                   onChange={this.changeForgotPasswordEmail.bind(this)}/>
                                            <span hidden={this.state.forgotPasswordEmailValid}><span
                                                className="required-span"> Incorrect Email entered! </span></span>
                                        </div>
                                        <button
                                            className="button button-block d-flex justify-content-center align-items-center"
                                            onClick={this.forgotPasswordSubmit.bind(this)}>
                                            <span id="login-span">Submit</span>
                                            <i className="fas fa-check ml15"
                                               hidden={!this.state.submittedForgotPassword}></i>
                                        </button>
                                        <h4>Enter your registered email and a new password link will be sent to the
                                            registered email.</h4>
                                        <a className="forgot">
                      <span id="forgot-span" onClick={this.forgotPassword.bind(this)}>
                        <i className="fas fa-chevron-left"></i> Back
			                </span>
                                        </a>
                                    </div>
                                    <img src={"/images/le_black.png"} style={{marginTop: 30, width: 200}}/>
                                </div>
                            </div>
                        )
                    }
                })()}
            </div>
        );
    }
}
