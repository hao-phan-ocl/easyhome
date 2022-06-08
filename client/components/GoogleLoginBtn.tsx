import GoogleLogin from 'react-google-login'

export default function GoogleLoginBtn() {
  const responseGoogle = async (response: any) => {
    console.log(response)
  }

  return (
    <GoogleLogin
      theme="dark"
      clientId={process.env.NEXT_PUBLIC_GOOGLE_ID as string}
      buttonText="Sign in with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  )
}
