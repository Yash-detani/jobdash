import LoginForm from '../auth/LoginForm';

export default function LoginFormExample() {
  return (
    <LoginForm
      onLogin={(credentials) => console.log('Login:', credentials)}
      onRegister={(userData) => console.log('Register:', userData)}
    />
  );
}