import { ethers } from 'ethers';
import { Fragment, useEffect, useState } from 'react';
import { contractAddress, contractAbi } from '../contracts/contractData';
import FlashMessage from 'react-flash-message';
import './Minter.css';

const Minter = (props) => {

    const [price, setPrice] = useState(0.0442);
    const [quantity, setQuantity] = useState(1);
    const [freeMintDone, setFreeMintDone] = useState(true);
    const [mineStatus, setMineStatus] = useState(null);
    const [saleState, setSaleState] = useState(null);

    const quantityHandler = (e) => {
        setQuantity(e.target.value);
    }

    const mintHandler = async (e) => {
        e.preventDefault();
        console.log("Form has been submitted");

        try {
            setMineStatus('mining');

            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const nftContract = new ethers.Contract(contractAddress, contractAbi, signer);

                let eth;

                if (freeMintDone) eth = (quantity * price).toString();
                else eth = ((quantity - 1) * price).toString();

                const feth = ethers.utils.parseEther(eth);

                let txn = await nftContract.mintNft(quantity, { value: feth });
                console.log("Mining...");
                await txn.wait();

                console.log(`Mined, see transaction: https://etherscan.io/tx/${txn.hash}`);
                setMineStatus('success');

                setTimeout(() => {
                    window.location.reload()
                }, 2000);

            } else {
                setMineStatus('error')
                console.log('No Metamask installed');
            }

        } catch (err) {
            setMineStatus('error');
            console.log(err);
        }
    }

    useEffect(() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, contractAbi, signer);

        const getPrice = async () => {
            try {
                const { ethereum } = window;

                if (ethereum) {

                    const price = await nftContract.price();
                    let formattedPrice = ethers.utils.formatEther(price);
                    setPrice(formattedPrice.toString());
                }
            } catch (err) {
                console.log("Something went wrong!")
                console.log(err)
            }
        }

        const getSaleState = async () => {
            try {
                const { ethereum } = window;

                if (ethereum) {
                    const saleIsActive = await nftContract.saleIsActive();
                    console.log("Sale state:", saleIsActive);
                    console.log(props.currentAccount)
                    setSaleState(saleIsActive);
                }
            } catch (err) {
                console.log("Something went wrong!")
                console.log(err)
            }
        }

        const getFreeState = async (wAddress) => {
            try {
                const { ethereum } = window;

                if (ethereum) {
                    const freeMint = await nftContract.isFreeMintDone(wAddress);
                    console.log("Free Mint Done:", freeMint);
                    setFreeMintDone(freeMint);
                }
            } catch (err) {
                console.log("Something went wrong!")
                console.log(err)
            }
        }

        getSaleState();
        getPrice();
        getFreeState(props.currentAccount);
    }, [props.currentAccount])

    return (
        <Fragment>
            {saleState && <div>
                <p>1 Free + Gas Per Wallet. Any Additional: {price} ETH + Gas</p>
                <form onSubmit={mintHandler}>
                    <div className='form-control'>
                        <select name='quantity' id='quantity' onChange={quantityHandler} value={quantity}>
                            {[1, 2, 3].map(q => <option key={q} value={q}>{q}</option>)}
                        </select>
                    </div>
                    {freeMintDone && <button type='submit' className='submit-btn cta-button'>
                        Mint {quantity} NFT{quantity === 1 ? '' : 's'} for {quantity * price} ETH
                    </button>}
                    {!freeMintDone && <button type='submit' className='submit-btn cta-button'>
                        Mint {quantity} NFT{quantity === 1 ? '' : 's'} for {(quantity - 1) * price === 0 ? "Free!" : `${(quantity - 1) * price} ETH`}
                    </button>}
                </form>
            </div>}
            {!saleState && <div className='no-sale'>
                <p>Sale hasn't opened yet. Check again soon!</p>
            </div>}
            {mineStatus === 'success' && <FlashMessage duration={5000}>
                <div className={`form-submission ${mineStatus}`}>
                    <p>NFT(s) successfully minted. Check them out on OpenSea!</p>
                </div>
            </FlashMessage>}
            {mineStatus === 'mining' &&
                <div className={`form-submission ${mineStatus}`}>
                    <p>
                        <i className="fa fa-spinner fa-spin"></i>
                        &nbsp;Transaction is mining
                    </p>
                </div>}
            {mineStatus === 'error' && <FlashMessage duration={2000}>
                <div className={`form-submission ${mineStatus}`}>
                    <p>Transaction failed. Please try again.</p>
                </div>
            </FlashMessage>}
        </Fragment>
    )

}

export default Minter;