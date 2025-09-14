import StoreOwnerDashboard from '../dashboard/StoreOwnerDashboard';

export default function StoreOwnerDashboardExample() {
  return (
    <div className="p-6">
      <StoreOwnerDashboard
        storeData={{
          name: 'Downtown Coffee Shop',
          rating: 4.3,
          totalRatings: 127
        }}
      />
    </div>
  );
}