import '../../../output.css';
import Image from 'next/image';
import team_data from '@/data/team_data.json'

export default function About(){
    const renderTeam = () => {
        return team_data.data.map((member, index) => (
            <div key={index} className="flex column align-center margin-50 width-200">
                <img src={member.image} alt={member.name}/>
                <h3 className="center">{member.name}</h3>
                <p>Role</p>
            </div>
        ));
      };
    
    return(
        <div>
            <div className="page-container">
                <div className="content-container">
                    <div className="section">
                        <h1> About the project </h1>
                        <img className="margin-30" src="/assets/images/rebaseXgroup.svg" alt="rebase X IVIS group logo"/>
                        <p className="width-60 center">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                    </div>
                    <div className="section">
                        <h2>Meet the team</h2>
                        <div className="flex row justify-center wrap">
                            {renderTeam()}
                        </div>
                    </div>
                </div>
                {/*FOOTER*/}
                <Image width={0} height={0} sizes="100vw" src="/assets/images/lineImg.svg" alt="line background"/>
                <p>IVIS 2024</p>
            </div>
        </div>
    )
}