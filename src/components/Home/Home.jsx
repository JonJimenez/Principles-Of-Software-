import React, { useState, useEffect } from 'react'
import HorizontalScroll from '../horizontalScroller/HorizontalScroll'
import RecentOpportunities from '../RecentOpportunities/Container/RecentOpportunities'
import SideNav from "../SideNav/SideNav"
import Carousel from "../RecentPaper/Carousel"
import auth from '../../firebase/index'
import { UserConsumer } from '../../UserProvider'
import SearchBar from '../../components/SearchBar/SearchBar'
import firebase from '../../firebase'
import MobileNavBar from '../MobileNavBar/MobileNavBar'
import './Home.css'


const Home = props => {

    // Note: When using states in functions,
    //function name must start with a capital letter
    // returns array of [userEmail, userdisplayName, userProfileImage, favoriteSubject, userfavoriteSubject, userUniversity]
    function GetuserInfo() {

        // Declared all states
        // [state,statefunction]
        const [userEmail, setuserEmail] = useState()
        const [userProfileImage, setUserProfileImage] = useState()
        const [userdisplayName, setUserdisplayName] = useState()
        const [userfavoriteSubject, setUserfavoriteSubject] = useState()
        const [userUniversity, setUserUniversity] = useState()

        // Teachers and Students are stored in the same collection
        const docRef = firebase.firestore().collection(firebase.auth().currentUser.displayName).doc('users')
            .collection('allUsers').doc(firebase.auth().currentUser.uid)
        docRef.get().then(function (doc) {

            //get current user info from firebase and
            //set states equal to respective field in database
            setuserEmail(doc.data().email)
            setUserProfileImage(doc.data().profileImageUrl)
            setUserdisplayName(doc.data().displayName)
            setUserfavoriteSubject(doc.data().favoriteSubject)
            setUserUniversity(doc.data().University)

        }).catch(function (error) {
            console.log(error);
            console.log(error.message);
        });
        return [userEmail, userdisplayName, userProfileImage, userfavoriteSubject, userUniversity]
    }

    const userInfo = GetuserInfo()

    return (
        <div style={{ flex: 1, justifyContent: 'space-between', overflowX: 'hidden' }}>

            <SideNav />
            <div className="InfoContainer" >

                {/* <SearchBar /> */}
                <MobileNavBar hello='sup' />
                <div>
                    <h1 className="opportunityTitle" style={{ fontSize: '24px' }}>Recent Opportunites</h1>
                    <RecentOpportunities />
                </div>
                <div id="carousel-container">
                    <h1 className="carouselClass" style={{ fontSize: '24px' }}>Recent Published Papers</h1>
                    {/* <Carousel /> */}
                </div>
                <h2 className="mainSubject">{userInfo[4]}</h2>
                <h2 className="mainSubject">{userInfo[3]}</h2>
                <HorizontalScroll />
            </div>

        </div>
    )
}

export default Home;