import AuthCheck from '../../components/AuthCheck'
import AccountForm from '../../components/Form/AccountForm'

export default function AccountInfo() {
  return (
    <AuthCheck>
      <AccountForm />
    </AuthCheck>
  )
}
