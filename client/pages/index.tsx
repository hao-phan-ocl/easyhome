import axios from 'axios'
import type { NextPage } from 'next'

import GoogleButton from '../components/GoogleButton'

const Home: NextPage = () => {
  async function googleLogin() {
    // const res = await axios.get('http://localhost:5000/login/google')
    // window.open('http://localhost:5000/login/google', '_self')
    // const res = await axios.get('http://localhost:5000/profile')
    // console.log(res)
    // console.log(res)
  }

  return (
    <>
      <GoogleButton />
      {/* <button onClick={googleLogin}>Google Login</button> */}
    </>
  )
}

export default Home
