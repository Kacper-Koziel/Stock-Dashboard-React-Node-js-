import { faChartColumn, faHome, faRightFromBracket, faTrophy, faScaleBalanced } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import './Sidebtns.css'
import translate from "../../../Translator/Translator";

const Sidebtns = ({currentActive, setCurrentActive, refs, setIsObserving, colorMode, languageVersion}) => {

    
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const navigate = useNavigate();

    const scrollTo = (index) => {
        if(currentActive === index + 1)
        {
            return;
        }

        setIsObserving(false); 
        setCurrentActive(index + 1);
        refs[index].ref.current.scrollIntoView({behavior: 'smooth'});
        setIsObserving(true);
    }

    const logout = async () => {
        try 
        {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token })
            })

            if(response.status === 200)
            {
                navigate('../');
            }
        }
        catch(err)
        {
            console.log(err);
            return;
        }
    }

    return (
        <div className={`side-btns-container ${colorMode}`}>
            <span className="active-meter" style={{ top: `${(currentActive - 1) * 20}%` }}></span>
            <div className={`side-btn ${currentActive === 1 ? 'active' : ''}`} onClick={() => { scrollTo(0);}}>
                <FontAwesomeIcon icon={faHome} className="menu-btn-icon"/>  
                <h3>{translate(languageVersion, 'Strona główna')}</h3>
            </div>
            <div className={`side-btn ${currentActive === 2 ? 'active' : ''}`} onClick={() => { scrollTo(1); }}>
                <FontAwesomeIcon icon={faTrophy} className="menu-btn-icon"/>
                <h3>{translate(languageVersion, 'Trendujące')}</h3>
            </div>
            <div className={`side-btn ${currentActive === 3 ? 'active' : ''}`} onClick={() => { scrollTo(2); }}>
                <FontAwesomeIcon icon={faChartColumn} className="menu-btn-icon"/> 
                <h3>{translate(languageVersion, 'Wykresy')}</h3>
            </div>
            <div className={`side-btn ${currentActive === 4 ? 'active' : ''}`} onClick={() => { scrollTo(3); }}>
                <FontAwesomeIcon icon={faScaleBalanced} className="menu-btn-icon"/>
                <h3>{translate(languageVersion, 'Porównania')}</h3>
            </div>
            <div className={`side-btn ${currentActive === 5 ? 'active' : ''}`} onClick={logout}>
                <FontAwesomeIcon icon={faRightFromBracket} className="menu-btn-icon"/>
                <h3>{translate(languageVersion, 'Wyloguj się')}</h3>
            </div>
        </div>
    );
}

export default Sidebtns;