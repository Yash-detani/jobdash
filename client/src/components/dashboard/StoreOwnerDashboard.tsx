import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Users, TrendingUp } from "lucide-react";
import StarRating from "../stores/StarRating";
import StatsCard from "./StatsCard";

interface StoreOwnerDashboardProps {
  storeData?: {
    name: string;
    rating: number;
    totalRatings: number;
  };
}

export default function StoreOwnerDashboard({ storeData }: StoreOwnerDashboardProps) {
  //todo: remove mock functionality
  const mockStore = storeData || {
    name: 'Downtown Coffee Shop',
    rating: 4.3,
    totalRatings: 127
  };

  const mockRatings = [
    {
      id: '1',
      userName: 'Sarah Michelle Johnson Brown',
      userEmail: 'sarah.johnson@example.com',
      rating: 5,
      date: '2024-01-15',
      comment: 'Amazing coffee and friendly service!'
    },
    {
      id: '2',
      userName: 'Michael David Thompson Davis',
      userEmail: 'michael.thompson@example.com',
      rating: 4,
      date: '2024-01-14',
      comment: 'Great atmosphere for working.'
    },
    {
      id: '3',
      userName: 'John Smith Anderson Williams',
      userEmail: 'john.anderson@example.com',
      rating: 5,
      date: '2024-01-13',
      comment: 'Best coffee in the downtown area!'
    },
    {
      id: '4',
      userName: 'Emily Catherine Rodriguez Martinez',
      userEmail: 'emily.rodriguez@example.com',
      rating: 3,
      date: '2024-01-12',
      comment: 'Good coffee but could improve wait times.'
    },
    {
      id: '5',
      userName: 'David Alexander Wilson Taylor',
      userEmail: 'david.wilson@example.com',
      rating: 5,
      date: '2024-01-11',
      comment: 'Excellent service and quality products!'
    }
  ];

  const recentRatings = mockRatings.slice(0, 3);
  const ratingDistribution = {
    5: mockRatings.filter(r => r.rating === 5).length,
    4: mockRatings.filter(r => r.rating === 4).length,
    3: mockRatings.filter(r => r.rating === 3).length,
    2: mockRatings.filter(r => r.rating === 2).length,
    1: mockRatings.filter(r => r.rating === 1).length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Store Dashboard</h1>
          <p className="text-muted-foreground">Monitor your store's performance and customer feedback</p>
        </div>
      </div>

      {/* Store Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatsCard
          title="Average Rating"
          value={mockStore.rating.toFixed(1)}
          description="Out of 5 stars"
          icon={Star}
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Total Reviews"
          value={mockStore.totalRatings}
          description="Customer reviews"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Recent Trend"
          value="+8.5%"
          description="Rating improvement"
          icon={TrendingUp}
          trend={{ value: 8.5, isPositive: true }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Store Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Store Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center pb-4 border-b">
              <h2 className="text-xl font-semibold mb-2" data-testid="text-store-name">
                {mockStore.name}
              </h2>
              <div className="flex items-center justify-center gap-2 mb-2">
                <StarRating value={mockStore.rating} readonly size="lg" />
                <span className="text-lg font-medium" data-testid="text-store-rating">
                  {mockStore.rating.toFixed(1)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Based on {mockStore.totalRatings} customer reviews
              </p>
            </div>
            
            {/* Rating Distribution */}
            <div className="space-y-3">
              <h3 className="font-medium">Rating Distribution</h3>
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-12">
                    <span className="text-sm">{stars}</span>
                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                  </div>
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary rounded-full h-2 transition-all duration-300"
                      style={{ 
                        width: `${mockStore.totalRatings > 0 ? (ratingDistribution[stars as keyof typeof ratingDistribution] / mockStore.totalRatings) * 100 : 0}%` 
                      }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-8">
                    {ratingDistribution[stars as keyof typeof ratingDistribution]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRatings.map((rating) => (
                <div key={rating.id} className="p-4 bg-muted/50 rounded-lg space-y-3" data-testid={`review-${rating.id}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {rating.userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm" data-testid={`text-reviewer-name-${rating.id}`}>
                          {rating.userName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {rating.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <StarRating value={rating.rating} readonly size="sm" />
                      <Badge variant="secondary" className="text-xs">
                        {rating.rating}/5
                      </Badge>
                    </div>
                  </div>
                  {rating.comment && (
                    <p className="text-sm text-muted-foreground pl-11" data-testid={`text-review-comment-${rating.id}`}>
                      "{rating.comment}"
                    </p>
                  )}
                </div>
              ))}
            </div>
            
            {mockRatings.length > 3 && (
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Showing 3 of {mockRatings.length} reviews
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* All Reviews Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRatings.map((rating) => (
              <div 
                key={rating.id} 
                className="flex items-start justify-between p-4 border rounded-lg hover-elevate"
                data-testid={`full-review-${rating.id}`}
              >
                <div className="flex items-start gap-3 flex-1">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {rating.userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{rating.userName}</p>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{rating.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{rating.userEmail}</p>
                    {rating.comment && (
                      <p className="text-sm">"{rating.comment}"</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <StarRating value={rating.rating} readonly size="sm" />
                  <Badge variant="outline" className="text-xs">
                    {rating.rating}/5
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}