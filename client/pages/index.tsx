import type { NextPage } from 'next'
import { signIn } from 'next-auth/react'
import GoogleLoginBtn from '../components/GoogleLoginBtn'

const Home: NextPage = () => {
  return (
    <>
      <div onClick={() => signIn()}>Sign in</div>
      <GoogleLoginBtn />
    </>
  )
}

export default Home
