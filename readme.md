# Full Stack Open Parts 4-5 - Backend and Testing

## 📋 Project Overview
This comprehensive project combines Parts 4 and 5 of the Full Stack Open course, creating a full-stack blog application with a Node.js/Express backend and a React frontend, including comprehensive testing strategies.

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Jest** - Testing framework
- **Supertest** - HTTP testing

### Frontend  
- **React** - Frontend framework
- **Vite** - Build tool
- **Axios** - HTTP client
- **React Testing Library** - Component testing
- **Cypress** - E2E testing

## 🏗️ Project Structure
```
├── client/             # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── server/             # Express backend
│   ├── controllers/
│   ├── models/
│   ├── utils/
│   ├── tests/
│   └── package.json
├── config/             # Configuration files
├── .github/            # GitHub workflows
└── package.json        # Root package.json
```

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Environment Variables
Create `.env` files in both client and server directories:

**Server `.env`:**
```env
MONGODB_URI=mongodb://localhost:27017/bloglist
PORT=3003
SECRET=your_jwt_secret_here
TEST_MONGODB_URI=mongodb://localhost:27017/bloglist_test
```

**Client `.env`:**
```env
VITE_API_URL=http://localhost:3003
```

### Installation & Running

1. **Install dependencies for all projects:**
   ```bash
   npm install
   ```

2. **Start the backend server:**
   ```bash
   cd server
   npm run dev
   ```

3. **Start the frontend (in another terminal):**
   ```bash
   cd client
   npm run dev
   ```

4. **Run full-stack development:**
   ```bash
   npm run dev  # Runs both client and server concurrently
   ```

## 🔧 Available Scripts

### Root Level
- `npm run dev` - Start both client and server
- `npm run build` - Build client for production
- `npm run test` - Run all tests
- `npm run lint` - Lint all code

### Server Scripts
- `npm run dev` - Start server with nodemon
- `npm start` - Start production server
- `npm test` - Run backend tests
- `npm run test:watch` - Run tests in watch mode

### Client Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run React tests
- `npm run cypress:open` - Open Cypress
- `npm run cypress:run` - Run E2E tests

## 📚 Features Implemented

### Backend Features (Part 4)
- ✅ RESTful API design
- ✅ User authentication with JWT
- ✅ Password hashing with bcrypt
- ✅ MongoDB integration with Mongoose
- ✅ Comprehensive error handling
- ✅ Request validation and sanitization
- ✅ API testing with Jest and Supertest
- ✅ Test database setup and teardown

### Frontend Features (Part 5)
- ✅ React component architecture
- ✅ State management with hooks
- ✅ Form handling and validation
- ✅ HTTP requests with Axios
- ✅ User authentication flow
- ✅ Responsive design
- ✅ Component testing with React Testing Library
- ✅ End-to-end testing with Cypress

### Testing Strategy
- **Unit Tests** - Individual functions and components
- **Integration Tests** - API endpoints and component interactions
- **End-to-End Tests** - Complete user workflows
- **Test Coverage** - Comprehensive code coverage reporting

## 🔗 API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/users` - Register new user
- `GET /api/users` - Get all users

### Blogs
- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create new blog (authenticated)
- `PUT /api/blogs/:id` - Update blog (authenticated)
- `DELETE /api/blogs/:id` - Delete blog (authenticated)
- `PUT /api/blogs/:id/like` - Like a blog

## 🚀 Deployment
The application is configured for deployment with:
- GitHub Actions CI/CD pipeline
- Environment-specific configurations
- Production build optimization
- Health check endpoints

---
*Completed by: Estivenm06*