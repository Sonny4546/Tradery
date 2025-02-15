import '../src/main.css'
import { Models } from 'appwrite';
import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import { useAuth } from './lib/AuthHook';
import { getCurrentSession} from "./lib/appwrite";
import { Redirect } from 'wouter';
import Form from 'react-bootstrap/Form';

export default function Register() {
  const handleAdminLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    }
    const {session, logInAdmin} = useAuth();
    await logInAdmin(target.email.value, target.password.value)
    console.log("pressed")
  }
  return (
    <div className="RegAdminContainer">
      <div className="login-register-container">
        <form onSubmit={handleAdminLogin}>
          <div className="form-field-wrapper">
            <label>Email:</label>
            <input required type="email" name="email" placeholder="Enter email..."/>
          </div>

          <div className="form-field-wrapper">
            <label>Password:</label>
            <Form.Control type="password" name="password" placeholder="Enter password..."/>
          </div>

          <div className="form-field-wrapper">
            <Button type="submit" className="admin-btn btn-dark w-100">Log-In</Button>
          </div>

        </form>
    </div>
  </div>
  )
}
