import StoreCard from '../stores/StoreCard';

export default function StoreCardExample() {
  //todo: remove mock functionality
  const mockStore = {
    id: '1',
    name: 'Downtown Coffee Shop',
    address: '123 Main Street, Downtown District',
    email: 'info@downtowncoffee.com',
    rating: 4.3,
    totalRatings: 127,
    userRating: 4
  };

  return (
    <div className="max-w-md p-6">
      <StoreCard
        store={mockStore}
        userRole="normal_user"
        onRate={(storeId, rating) => console.log(`Rated store ${storeId} with ${rating} stars`)}
        onEdit={(storeId) => console.log(`Edit store ${storeId}`)}
        onView={(storeId) => console.log(`View store ${storeId}`)}
      />
    </div>
  );
}