import '../output.css';

export default function WelcomePage(){
  return(
    <div>
      <div className="page-container">
        <div className="content-container">
          <div className="section">
            <h1>Welcome page</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>
        <img width="100%" src="/assets/images/lineImg.svg" alt="line background"/>
        <p>IVIS 2024</p>
      </div>
    </div>
    
  )
}