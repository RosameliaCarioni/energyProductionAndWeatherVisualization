import '../output.css';

export default function WelcomePage(){
  return(
    <div>
        <div className='w-full py-12 flex items-center justify-center'>
          <div className='max-w-screen-md flex-col items-center justify-center text-center'>
            <h1>Welcome</h1>
            <p>Explore a new era of <b>energy asset</b> management.</p>
            <p><br/>Our platform is designed to empower wind farm operators with comprehensive insights, enabling informed decisions for <b>optimized performance.</b> We seamlessly integrate geospatial insights, energy analytics, and real-time weather data to empower your decision-making.</p>
          </div>
        </div>
        <img className='w-full' src="/assets/images/lineImg.svg" alt="line background"/>
        <div className='absolute bottom-0 flex w-full items-center justify-center'>
          <p>IVIS 2024</p>
        </div>
    </div>
    
  )
}