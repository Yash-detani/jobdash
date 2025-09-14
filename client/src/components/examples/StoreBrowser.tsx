import StoreBrowser from '../stores/StoreBrowser';

export default function StoreBrowserExample() {
  return (
    <div className="p-6">
      <StoreBrowser
        userRole="normal_user"
        onRateStore={(storeId, rating) => console.log(`Rated store ${storeId} with ${rating} stars`)}
      />
    </div>
  );
}