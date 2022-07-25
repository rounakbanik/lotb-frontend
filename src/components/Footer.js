import './Footer.css';
import twitter_white from '../images/twitter.png';
import discord_white from '../images/discord.png';
import opensea_white from '../images/opensea.png';

function Footer(props) {
    return (
        <footer className='footer'>
            <p>
                SMART CONTRACT ADDRESS:&nbsp;
                <br />
                <span>
                    <a className='contract-link' href={`https://rinkeby.etherscan.io/address/${props.address}`} target='_blank' rel='noreferrer'>
                        {props.address}
                    </a>
                </span>
            </p>
            <div className='footer-social-media-links'>
                <div>
                    <a href='https://discord.gg/'>
                        <img src={discord_white} alt="Discord" />
                    </a>
                </div>
                <div>
                    <a href='https://opensea.io/collection/legends-on-the-block' target='_blank' rel='noreferrer'>
                        <img src={opensea_white} alt="Opensea" />
                    </a>
                </div>
                <div>
                    <a href='https://twitter.com/LegendsOnTheBlock' target='_blank' rel='noreferrer'>
                        <img src={twitter_white} alt="Twitter" />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;