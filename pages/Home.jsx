import './main.css'

export default function HomePage() {
    return (
      <>
      <nav class="menu-container">
              <input type="checkbox" aria-label="Toggle menu" />
              <span></span>
              <span></span>
              <span></span>
              
              <div class="menu">
              <ul>
                  <li>
                  <a href="#home">
                      Tradery
                  </a>
                  </li>
              </ul>
              <ul>
                  <li>
                  <a href="#signup">
                      Messages
                  </a>
                  </li>
                  <li>
                  <a href="#login">
                      User
                  </a>
                  </li>
              </ul>
              </div>
          </nav>
          <div class="Main" id="wrapper">
              <form>
                  <i class="fa fa-search">
                  </i>
                  <input name="keyword" placeholder="Search for Items..."></input>
                  <button type="submit">Search</button>
              </form>
          </div>
      </>
    )
  }