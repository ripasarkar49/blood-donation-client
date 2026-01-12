import React from 'react'
import Banner from '../Components/Banner'
import FeaturedSection from '../Components/FeaturedSection'
import ContactUs from '../Components/ContactUs'
import HomeContent from '../Components/shared/HomeContent'

const Home = () => {
  return (
    <div>
     <Banner></Banner>
     <FeaturedSection></FeaturedSection>
     <HomeContent></HomeContent>
     <ContactUs></ContactUs>
    </div>
  )
}

export default Home
