# Service Filtering Functionality Demo

## What's New

I've updated your services page to include **individual service filtering** with the following features:

### 1. **Service Data Arrays**
All services are now stored in JavaScript arrays for better management:

```javascript
const servicesData = {
    government: [
        {
            id: 'passport-services',
            title: 'Passport Services',
            description: 'Complete passport services...',
            category: 'Government',
            image: 'assets/Images/passport-service.webp',
            icon: 'fas fa-passport',
            features: ['New Application', 'Renewal', 'Police Verification'],
            actionText: 'Apply Now'
        },
        // ... more government services
    ],
    travel: [
        // ... travel services
    ],
    additional: [
        // ... additional services
    ]
};
```

### 2. **Three Levels of Filtering**

#### **Level 1: Show All Services**
- Click "All Services" button
- Shows all services with their section titles and descriptions

#### **Level 2: Category Filtering**
- Click "Government Services", "Travel Services", or "Additional Services"
- Shows only services from that category
- Hides other categories and their section titles

#### **Level 3: Individual Service Filtering** ⭐ **NEW**
- **Click on any service card** (not the button)
- Shows only that specific service
- Hides all other services and section titles
- Adds a "Show All Services" button to return to full view

### 3. **Visual Enhancements**

#### **Clickable Service Cards**
- Service cards now have a **pointer cursor**
- **Hover effect**: Shows "Click to view details" tooltip
- **Click feedback**: Cards scale down slightly when clicked
- **Subtle overlay**: Blue gradient appears on hover

#### **Dynamic Button Management**
- When viewing a single service, a **green "Show All Services"** button appears
- This button has a **pulsing animation** to draw attention
- Clicking it returns to the full services view

### 4. **How It Works**

#### **Before (Original)**
```
[All Services] [Government Services] [Travel Services] [Additional Services]
┌─────────────────────────────────────────────────────────────────┐
│ Passport Services    │ Air Ticket Booking    │ Income Tax Filing │
│ Voter ID Card        │ Bus Ticket Booking    │ EB Bill Payment   │
│ PAN Card Services    │ Train Ticket Booking  │ Printing Services │
│ Aadhaar Services     │ Hajj & Umrah          │                   │
└─────────────────────────────────────────────────────────────────┘
```

#### **After Category Filter (Government)**
```
[All Services] [Government Services] [Travel Services] [Additional Services]
┌─────────────────────────────────────────────────────────────────┐
│ Passport Services    │                                         │
│ Voter ID Card        │                                         │
│ PAN Card Services    │                                         │
│ Aadhaar Services     │                                         │
│ Birth Certificate    │                                         │
│ Death Certificate    │                                         │
│ Income Certificate   │                                         │
│ Community Certificate│                                         │
│ Driving License      │                                         │
│ Marriage Certificate │                                         │
│ Nativity Certificate │                                         │
│ FSSAI Registration   │                                         │
└─────────────────────────────────────────────────────────────────┘
```

#### **After Individual Service Filter (Passport Services)** ⭐ **NEW**
```
[All Services] [Show All Services] [Government Services] [Travel Services] [Additional Services]
┌─────────────────────────────────────────────────────────────────┐
│ Passport Services    │                                         │
│                     │                                         │
│ Complete passport services including new application, renewal, │
│ and police verification assistance.                            │
│                     │                                         │
│ [New Application] [Renewal] [Police Verification]              │
│                     │                                         │
│ [Apply Now →]                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 5. **User Experience Flow**

1. **Landing**: User sees all services
2. **Category Filter**: User clicks "Government Services" → sees only government services
3. **Individual Filter**: User clicks on "Passport Services" card → sees only passport service
4. **Return**: User clicks "Show All Services" → returns to full view

### 6. **Technical Implementation**

#### **JavaScript Functions**
- `showAllServices()`: Shows all services and section titles
- `showCategoryServices(category)`: Shows services from specific category
- `showSingleService(serviceId)`: Shows only one specific service
- `updateFilterButtons(activeFilter)`: Manages button states and creates "Show All" button

#### **CSS Enhancements**
- Added `cursor: pointer` to service cards
- Added hover overlay with gradient
- Added "Click to view details" tooltip
- Added pulsing animation for "Show All Services" button
- Added click feedback with scale animation

### 7. **Benefits**

✅ **Better User Experience**: Users can focus on one service at a time
✅ **Cleaner Interface**: Reduces visual clutter when viewing specific services
✅ **Data-Driven**: Services are stored in arrays for easy management
✅ **Responsive**: Works on all screen sizes
✅ **Accessible**: Maintains keyboard navigation and screen reader support
✅ **Smooth Animations**: Provides visual feedback for all interactions

### 8. **Usage Instructions**

1. **To view all services**: Click "All Services" button
2. **To view category**: Click category buttons (Government/Travel/Additional)
3. **To view single service**: Click anywhere on a service card (not the button)
4. **To return to all services**: Click "Show All Services" button (appears when viewing single service)

The functionality is now live and ready to use! Users can click on any service card to see only that service, making it easier to focus on specific services they're interested in.