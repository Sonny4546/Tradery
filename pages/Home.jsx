import '../src/main.css'
import React, { useState, useEffect } from 'react'
import { logoutUser, getUser } from './Login'

const HomePage = () => {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const checkUser = async () => {
  //     try {
  //       const userData = await getUser()
  //       setUser(userData)
  //     } catch (error) {
  //       setUser(null)
  //     }
  //   }

  //   checkUser()
  // }, []);
  return (
    <>
    <div class="body">
          <nav class="menu-container">
              <input type="checkbox" aria-label="Toggle menu" />
              <span></span>
              <span></span>
              <span></span>
              <div class="menu">
              <ul>
                  <li>
                  <a href="/home">
                      Tradery
                  </a>
                  </li>
              </ul>
              <ul>
                  <li>
                  <a href="#/messages">
                      Messages
                  </a>
                  </li>
                  <li>
                  <a href="">
                      {user.name}
                  </a>
                  </li>
              </ul>
              </div>
          </nav>
          <div class="Main" id="pagewrap">
              <div class="searchinput">
                  <form>
                      <input name="keyword" placeholder="Search for Items..."></input>
                      <button type="submitbtn">Search</button>
                  </form>
              </div>
          </div>
        </div>
    </>
  );
}
export default HomePage