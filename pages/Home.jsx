import '../src/main.css'

export default function HomePage() {
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
                    <a href="#home">
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
                    <a href="#/login">
                        User
                    </a>
                    </li>
                </ul>
                </div>
            </nav>
            <div class="Main" id="wrapper">
                <div class="search">
                    <form>
                        <input name="keyword" placeholder="Search for Items..."></input>
                        <button type="submit">Search</button>
                    </form>
                </div>
            </div>
          </div>
      </>
    )
  }