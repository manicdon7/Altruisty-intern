import React from 'react'
import Navbar from '../Components/Navbar'
import Landing from '../Components/Landing'
import Jobcards from '../Components/Jobcards'
import JobUpdates from '../Components/JobUpdates'
import Footer from '../Components/Footer'


const Home = () => {
  return (
    <div className=''>
        <Navbar />
        <Landing />
        <Jobcards />
        <JobUpdates />
        <Footer />
    </div>
  )
}

export default Home