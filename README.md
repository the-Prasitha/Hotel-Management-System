# Hotel Management System

A full-stack Hotel Management System built using ReactJS, Redux, Node.js, Express.js, and PostgreSQL.

The application allows users to add, view, search, filter, edit, and delete hotel records. It also supports image upload, pagination, form validation, and displaying hotel locations using latitude and longitude.

---
Demo Video:  https://drive.google.com/drive/folders/18nPbXzcXmeqI2-uzmJRUBB_uRJ2k9UcH?usp=drive_link

## Features

### Hotel Management

- Add new hotels
- Edit existing hotel details
- Delete hotels
- View hotel details
- Upload hotel images
- Preview images before submission

### Hotel Information

Each hotel contains:

- Hotel image
- Hotel title
- Description
- Latitude
- Longitude
- Price

### Search and Filtering

- Search hotels by title
- Filter hotels using minimum price
- Filter hotels using maximum price
- Clear search and filter values

### Pagination

- Hotels are displayed using pagination
- The application loads hotels according to the selected page

### Hotel Details

- Dedicated hotel details page
- Displays complete hotel information
- Displays hotel location using latitude and longitude
- Interactive map using React Leaflet and OpenStreetMap

### Validation

The application validates:

- Required hotel fields
- Latitude range
- Longitude range
- Non-negative price
- Image file type
- Image file size

### Notifications

The application provides notifications for:

- Hotel added successfully
- Hotel updated successfully
- Hotel deleted successfully
- Error messages

### SEO

- Dynamic page titles
- Dynamic meta descriptions
- Hotel images include alternative text

---

## Technology Stack

### Frontend

- ReactJS
- Redux Toolkit
- React Router
- Axios
- React Leaflet
- Leaflet
- React Helmet Async
- HTML
- CSS
- JavaScript

### Backend

- Node.js
- Express.js
- Multer
- CORS
- dotenv

### Database

- PostgreSQL
- Native SQL queries

---

## Project Structure

```text
Hotel-Management-System/
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── HotelCard.jsx
│   │   │   ├── HotelForm.jsx
│   │   │   ├── HotelMap.jsx
│   │   │   ├── Notification.jsx
│   │   │   ├── Pagination.jsx
│   │   │   └── SearchFilter.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── HotelList.jsx
│   │   │   ├── AddHotel.jsx
│   │   │   ├── EditHotel.jsx
│   │   │   └── HotelDetails.jsx
│   │   │
│   │   ├── redux/
│   │   │   ├── hotelSlice.js
│   │   │   └── store.js
│   │   │
│   │   ├── services/
│   │   │   └── hotelApi.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── index.html
│
├── backend/
│   │
│   ├── controllers/
│   │   └── hotelController.js
│   │
│   ├── db/
│   │   └── db.js
│   │
│   ├── middleware/
│   │   └── uploadMiddleware.js
│   │
│   ├── routes/
│   │   └── hotelRoutes.js
│   │
│   ├── uploads/
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
