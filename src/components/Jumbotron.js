import './Jumbotron.css';
import cards from '../images/cards.gif';

function Jumbotron() {
    return (
        <div className='jumbotron'>
            <h1>
                Mint an LOTB Card
            </h1>
            <h2>
                Footballing greats on the blockchain!
            </h2>
            <div className='img-container'>
                <img src={cards} alt="NFT GIF" />
            </div>
        </div>
    )
}

export default Jumbotron;