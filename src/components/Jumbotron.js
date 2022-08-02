import './Jumbotron.css';
import cards from '../images/cards.gif';
import banner from '../images/banner.jpeg';

function Jumbotron() {
    return (
        <div className='jumbotron'>
            <div className='banner'>
                <img src={banner} alt="banner" />
            </div>
            <div className='img-container'>
                <img src={cards} alt="NFT GIF" />
            </div>
        </div>
    )
}

export default Jumbotron;