import '../src/main.css'
import React from 'react'
import Button from 'react-bootstrap/Button';
import { useAuth } from './lib/AuthHook';
import { Redirect } from 'wouter';

export default function Register() {
  return (
    <div className="RegAdminContainer">
  <div className="login-register-container">
    <form>
      <div className="form-field-wrapper">
        <label>Name:</label>
        <input required type="text" name="name" placeholder="Enter name..." />
      </div>

      <div className="form-field-wrapper">
        <label>Email:</label>
        <input required type="email" name="email" placeholder="Enter email..." />
      </div>

      <div className="form-field-wrapper">
        <label>Password:</label>
        <input type="password" name="password1" placeholder="Enter password..." />
      </div>

      <div className="form-field-wrapper">
        <label>Confirm Password:</label>
        <input type="password" name="password2" placeholder="Confirm password..." />
      </div>

      <div className="form-field-wrapper">
        <input type="submit" value="Register" className="btn" />
      </div>
    </form>

    <p>Already have an account? <a href="/login">Login</a></p>
  </div>
</div>
  )
}
