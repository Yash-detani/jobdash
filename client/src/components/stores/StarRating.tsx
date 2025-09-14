import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  'data-testid'?: string;
}

const sizeClasses = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5'
};

export default function StarRating({ 
  value, 
  onChange, 
  readonly = false, 
  size = 'md', 
  className,
  'data-testid': testId 
}: StarRatingProps) {
  const handleStarClick = (rating: number) => {
    if (!readonly && onChange) {
      onChange(rating);
      console.log(`Star rating changed to: ${rating}`);
    }
  };

  return (
    <div 
      className={cn("flex items-center gap-1", className)}
      data-testid={testId}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleStarClick(star)}
          disabled={readonly}
          className={cn(
            "transition-colors duration-200",
            !readonly && "hover:scale-110 cursor-pointer",
            readonly && "cursor-default"
          )}
          data-testid={`star-${star}`}
        >
          <Star
            className={cn(
              sizeClasses[size],
              star <= value
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300 hover:text-yellow-200"
            )}
          />
        </button>
      ))}
    </div>
  );
}