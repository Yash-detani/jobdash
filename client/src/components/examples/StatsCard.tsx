import StatsCard from '../dashboard/StatsCard';
import { Users, Store, Star, TrendingUp } from 'lucide-react';

export default function StatsCardExample() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 p-6">
      <StatsCard
        title="Total Users"
        value={1247}
        description="Active registered users"
        icon={Users}
        trend={{ value: 12, isPositive: true }}
      />
      <StatsCard
        title="Total Stores"
        value={89}
        description="Registered stores"
        icon={Store}
        trend={{ value: 5, isPositive: true }}
      />
      <StatsCard
        title="Total Ratings"
        value={3542}
        description="Submitted ratings"
        icon={Star}
        trend={{ value: 18, isPositive: true }}
      />
      <StatsCard
        title="Avg Rating"
        value={4.2}
        description="Overall platform rating"
        icon={TrendingUp}
        trend={{ value: 3, isPositive: true }}
      />
    </div>
  );
}