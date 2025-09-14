import Header from '../layout/Header';

export default function HeaderExample() {
  return (
    <Header
      user={{
        name: "John Smith",
        email: "john.smith@example.com",
        role: "system_admin"
      }}
      onLogout={() => console.log('Logout clicked')}
      onSettingsClick={() => console.log('Settings clicked')}
    />
  );
}