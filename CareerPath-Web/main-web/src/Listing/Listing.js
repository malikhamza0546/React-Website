import React,{useEffect} from 'react'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import ListingPage from './Listing_Page/Listing_Page'

const Listing = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div>
            <Navbar/>
            <hr/>
            <ListingPage/>
            <Footer/>
        </div>
    )
}

export default Listing
