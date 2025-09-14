import AdminDashboard from '../dashboard/AdminDashboard';

export default function AdminDashboardExample() {
  return (
    <div className="p-6">
      <AdminDashboard
        onAddUser={() => console.log('Add user modal opened')}
        onAddStore={() => console.log('Add store modal opened')}
      />
    </div>
  );
}