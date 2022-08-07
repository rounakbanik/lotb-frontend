import './Footer.css';
import twitter_white from '../images/twitter.png';
import opensea_white from '../images/opensea.png';

function Footer(props) {
    return (
        <footer className='footer'>
            <p>
                SMART CONTRACT ADDRESS:&nbsp;
                <br />
                <span>
                    <a className='contract-link' href={`https://etherscan.io/address/${props.address}`} target='_blank' rel='noreferrer'>
                        {props.address}
                    </a>
                </span>
            </p>
            <div className='footer-social-media-links'>
                <div>
                    <a href='https://opensea.io/collection/legendsontheblock' target='_blank' rel='noreferrer'>
                        <img src={opensea_white} alt="Opensea" />
                    </a>
                </div>
                <div>
                    <a href='https://twitter.com/LegendsOTB' target='_blank' rel='noreferrer'>
                        <img src={twitter_white} alt="Twitter" />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;