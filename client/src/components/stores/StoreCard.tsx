import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Edit2, Eye } from "lucide-react";
import { useState } from "react";
import StarRating from "./StarRating";

interface StoreCardProps {
  store: {
    id: string;
    name: string;
    address: string;
    email: string;
    rating: number;
    totalRatings: number;
    userRating?: number;
  };
  userRole: 'system_admin' | 'normal_user' | 'store_owner';
  onRate?: (storeId: string, rating: number) => void;
  onEdit?: (storeId: string) => void;
  onView?: (storeId: string) => void;
}

export default function StoreCard({ store, userRole, onRate, onEdit, onView }: StoreCardProps) {
  const [isRating, setIsRating] = useState(false);
  const [currentRating, setCurrentRating] = useState(store.userRating || 0);

  const handleRatingSubmit = (rating: number) => {
    setCurrentRating(rating);
    setIsRating(false);
    console.log(`Rating ${rating} submitted for store ${store.id}`);
    onRate?.(store.id, rating);
  };

  const handleEdit = () => {
    console.log(`Edit store ${store.id}`);
    onEdit?.(store.id);
  };

  const handleView = () => {
    console.log(`View store ${store.id}`);
    onView?.(store.id);
  };

  return (
    <Card className="hover-elevate" data-testid={`card-store-${store.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold mb-1" data-testid={`text-store-name-${store.id}`}>
              {store.name}
            </CardTitle>
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span data-testid={`text-store-address-${store.id}`}>{store.address}</span>
            </div>
          </div>
          {userRole === 'system_admin' && (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleEdit}
                data-testid={`button-edit-store-${store.id}`}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleView}
                data-testid={`button-view-store-${store.id}`}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Overall Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= store.rating
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium" data-testid={`text-rating-${store.id}`}>
              {store.rating.toFixed(1)}
            </span>
            <span className="text-xs text-muted-foreground">
              ({store.totalRatings} reviews)
            </span>
          </div>
        </div>

        {/* User Rating Section - Only for normal users */}
        {userRole === 'normal_user' && (
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Your Rating:</span>
              {currentRating > 0 && (
                <Badge variant="secondary" data-testid={`badge-user-rating-${store.id}`}>
                  {currentRating} star{currentRating !== 1 ? 's' : ''}
                </Badge>
              )}
            </div>
            
            {isRating ? (
              <div className="space-y-3">
                <StarRating
                  value={currentRating}
                  onChange={setCurrentRating}
                  size="lg"
                  data-testid={`rating-input-${store.id}`}
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleRatingSubmit(currentRating)}
                    disabled={currentRating === 0}
                    data-testid={`button-submit-rating-${store.id}`}
                  >
                    Submit Rating
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setIsRating(false);
                      setCurrentRating(store.userRating || 0);
                    }}
                    data-testid={`button-cancel-rating-${store.id}`}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={currentRating > 0 ? "outline" : "default"}
                  onClick={() => setIsRating(true)}
                  data-testid={`button-rate-store-${store.id}`}
                >
                  <Star className="h-4 w-4 mr-1" />
                  {currentRating > 0 ? 'Update Rating' : 'Rate Store'}
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Store Owner - Show email for admin */}
        {userRole === 'system_admin' && (
          <div className="text-sm text-muted-foreground pt-2 border-t">
            <span className="font-medium">Email:</span> {store.email}
          </div>
        )}
      </CardContent>
    </Card>
  );
}