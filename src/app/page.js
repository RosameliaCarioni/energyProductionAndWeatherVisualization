import '../output.css';

export default function WelcomePage(){
  return(
    <div>
        <div className='w-full py-12 flex items-center justify-center'>
          <div className='max-w-screen-md flex-col items-center justify-center text-center'>
            <h1>Welcome page</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>
        <img className='w-full' src="/assets/images/lineImg.svg" alt="line background"/>
        <div className='absolute bottom-0 flex w-full items-center justify-center'>
          <p>IVIS 2024</p>
        </div>
    </div>
    
  )
}