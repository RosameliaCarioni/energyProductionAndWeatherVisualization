import '../output.css';

export default function WelcomePage(){
  return(
    <div>
        <div className='w-full py-12 flex items-center justify-center'>
          <div className='max-w-screen-md flex-col items-center justify-center text-center'>
            <img className="w-full" src="/assets/images/rebaseXgroup.svg" alt="rebase X IVIS group logo"/>

            <h2>About</h2>
            <p>For this project, we collaborated with <a href="https://www.rebase.energy/">Rebase Energy</a> to create a visualisation tool that displays combined geospatial, weather and energy data for their clients. The aim is to give their clients a platform that visualises this data in a comprehensive way, to help them understand the energy production of their assets and make more informed decisions in their day to day work when it comes to energy trading.  Through this work we aim to enable energy traders to make well-informed, strategic decisions in real-time, maximizing their market opportunities and minimizing risks. </p>
            <p className='mt-4'>The design of our project was achieved by engagement with energy traders and consultations with our stakeholders. We drew inspiration from related works in the field, notably Diehl et al. [1], which explores the visual analysis of spatio-temporal data in weather forecasting; and Lundblad et al. [2], which presents innovative methods for visualizing road weather conditions. Additionally, practical insights were obtained from the operational frameworks of two interactive websites: Windy [3], a known platform for its weather forecasting visualizations, and Robinhawkes [4], which provides an interactive map for tracking renewable energy sources in Great Britain. These references served as both the foundation and the spark for our creative process. </p>
            <p className='mt-4'>References:</p>
            <p className='mt-4'>[1] Diehl, A., Pelorosso, L., Delrieux, C., Saulo, C., Ruiz, J., Gröller, M. E., & Bruckner, S. (2015, June). Visual analysis of spatio‐temporal data: Applications in weather forecasting. In Computer Graphics Forum (Vol. 34, No. 3, pp. 381-390).</p>
            <p className='mt-4'>[2] Lundblad, P., Thoursie, J., & Jern, M. (2010, July). Swedish road weather visualization. In 2010 14th International Conference Information Visualisation (pp. 313-321). IEEE.</p>
            <p className='mt-4'>[3] Windyty, S. (2024). Windy as forecasted. Windy.com. Available at https://www.windy.com/?59.378,17.916,5</p>
            <p className='mt-4'>[4] GB Renewables Map. (2024). Robinhawkes.com. Available at https://renewables-map.robinhawkes.com/#5/55/-3.2</p>

            <h2 className='mt-8'>Video demo</h2>
            <a href="">Link</a>

            <h2 className='mt-8'>Repository</h2>
            <p>To view the code of this project, visit our <a href="https://github.com/MischaRauch/weatherVisualizationRebase">Github</a>.</p>
          
            <h2 className='mt-8'>Data</h2>
            <p>This project leverages data from multiple sources, including Rebase Energy, the <a href="https://github.com/rebase-energy/NVE-Wind-Power-Production-in-Norway">NVE Wind Power Production in Norway</a>, and <a href="https://github.com/electricitymaps/electricitymaps-contrib/tree/master/web/geo">ElectricityMaps</a>. The focus is on wind farms in Norway, their energy production at specific dates and times, and the corresponding weather conditions. For a detailed exploration of our data, we encourage you to consult the README section of our <a href="https://github.com/MischaRauch/weatherVisualizationRebase">Github</a> project.</p>
          
            <h2 className='mt-12'>Learning goals</h2>
            <p>Throughout this project, we accomplished a series of learning goals that have enriched our knowledge in information visualization:</p>
            <ul>
              <li>Acquired and implemented techniques for data visualization, leading to a more impactful presentation of information. This underscored the importance of offering data access while empowering users with customization tools, thereby enhancing their interaction with the system.</li>
              
              <li>Enhanced our understanding and application of visual perception principles, ensuring that the visualizations we create are not just informative but also intuitive, thereby making data interpretation more accessible.</li>
              
              <li>Gained technical skills in web development, which allowed us to build a platform with responsive and effective visualization tools. We did this using React and Next.js.</li>
              
              <li>Improved our ability to justify design choices by engaging in continuous dialogue with our expected users and among our team.</li>
              
              <li>Gained experience in setting up servers and deploying web applications.</li>
              
              <li>Engaged in constant analysis and critique of our work, discussing and refining our choices as a team. For example, we tested different colour pallets for the weather layers and for the markers in the map.</li>
              
              <li>Improved our public speaking skills by presenting our visualizations to an audience, including not only classmates but also stakeholders and clients, to demonstrate the utility and functionality of our work.</li>
              
              <li>Improved our skills on designing user tests.</li>
            </ul>

            <h2 className='mt-12'>Credits</h2>
            <p>We would like to acknowledge and thank <a href="https://www.linkedin.com/in/sebaheg/">Sebastian Haglund</a> and <a href="https://www.linkedin.com/in/henrik-k%C3%A4lvegren-1129a8147/">Henrik Kälvegren</a> from <a href="">Rebase Energy</a> for the opportunity to work on this project and for guidance throughout the process. Lastly, we would like to thank <a href="https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Afsd_profile%3AACoAAADoHHcB82kx1734f-HuZhngWj8iIWY8ZXs&keywords=mario%20romero&origin=RICH_QUERY_SUGGESTION&position=0&searchId=99bed06d-720d-4bd8-aa6c-cceb65fb9d20&sid=dit&spellCorrectionEnabled=false">Mario Romero</a>, our professor and course responsible for the Information Visualization course, for his active engagement and ongoing feedback, which helped us advance this project.</p>
          </div>
        </div>
        <img className='w-full' src="/assets/images/lineImg.svg" alt="line background"/>
        <div className='flex w-full items-center justify-center'>
          <p>IVIS 2024</p>
        </div>
    </div>
    
  )
}