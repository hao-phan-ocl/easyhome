import Head from 'next/head'

import AuthCheck from '../../components/AuthCheck'
import AccountForm from '../../components/Form/AccountForm'

export default function AccountInfo() {
  return (
    <AuthCheck>
      <Head>
        <title>Account Info</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AccountForm />
    </AuthCheck>
  )
}
