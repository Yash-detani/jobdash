# Store Rating System Design Guidelines

## Design Approach
**Utility-Focused Design System Approach** - Using Material Design principles for this data-heavy administrative application with multiple user roles and complex CRUD operations.

## Core Design Elements

### A. Color Palette
**Light Mode:**
- Primary: 25 85% 47% (Material Blue)
- Secondary: 210 40% 96% (Light Blue-Gray)
- Success: 142 71% 45% (Green)
- Warning: 45 93% 47% (Amber)
- Error: 0 84% 60% (Red)
- Background: 0 0% 98%
- Surface: 0 0% 100%

**Dark Mode:**
- Primary: 25 85% 65% (Lighter Blue)
- Secondary: 210 20% 25% (Dark Blue-Gray)
- Success: 142 71% 55% (Lighter Green)
- Warning: 45 93% 60% (Lighter Amber)
- Error: 0 84% 70% (Lighter Red)
- Background: 210 20% 8%
- Surface: 210 20% 12%

### B. Typography
- **Primary Font:** Inter (Google Fonts)
- **Headings:** 600-700 weight, sizes from text-lg to text-3xl
- **Body:** 400-500 weight, text-sm to text-base
- **Labels/Captions:** 500 weight, text-xs to text-sm

### C. Layout System
- **Spacing Units:** Tailwind units of 2, 4, 6, 8, 12, 16
- **Container:** max-w-7xl with responsive padding
- **Grid:** 12-column responsive grid system
- **Cards:** Consistent p-6 padding with rounded-lg borders

### D. Component Library

**Navigation:**
- Top navigation bar with role-based menu items
- Sidebar navigation for admin dashboard
- Breadcrumb navigation for complex flows

**Data Display:**
- Sortable tables with hover states
- Card-based layouts for store listings
- Star rating components (1-5 stars) with visual feedback
- Statistics cards with icons and counts

**Forms:**
- Consistent form field styling with labels
- Input validation states (error, success)
- Multi-step registration forms
- Search and filter components

**Interactive Elements:**
- Primary buttons for main actions
- Secondary buttons for supporting actions
- Icon buttons for table actions (edit, delete)
- Dropdown menus for filtering

**Overlays:**
- Modal dialogs for confirmations and forms
- Toast notifications for success/error states
- Loading states and skeletons

### E. Role-Specific Design Patterns

**System Admin Dashboard:**
- Statistics overview cards at the top
- Tabbed interface for Users/Stores/Ratings management
- Bulk action controls for table selections

**Normal User Interface:**
- Prominent store search functionality
- Grid/list view toggle for stores
- Quick rating submission interface

**Store Owner Dashboard:**
- Rating analytics and average display
- Timeline view of received ratings
- Store information management panel

### F. Responsive Design
- Mobile-first approach
- Collapsible navigation for mobile
- Stacked card layouts on smaller screens
- Touch-friendly button sizes (minimum 44px)

### G. Accessibility Features
- High contrast ratios for text (4.5:1 minimum)
- Consistent focus indicators
- Screen reader friendly labels
- Keyboard navigation support
- Dark mode toggle with system preference detection

This design system prioritizes data clarity, role-based functionality, and consistent user experience across all three user types while maintaining Material Design's proven usability patterns.