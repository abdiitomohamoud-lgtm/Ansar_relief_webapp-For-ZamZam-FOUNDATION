# ANSAR HUMANITARIAN RELIEF - CODE SUMMARY

## 1. PROJECT ARCHITECTURE

### 1.1 Frontend Architecture (React)

The frontend is built with React and follows a component-based architecture with the following structure:

- **Pages**: Container components that represent full pages/routes
- **Components**: Reusable UI elements organized by feature
- **Contexts**: Global state management for authentication and themes
- **Redux Store**: State management for API data with slices and thunks
- **Hooks**: Custom React hooks for shared logic
- **Utils**: Helper functions and utilities
- **Assets**: Static assets like images and icons

### 1.2 Backend Architecture (Express/Node.js)

The backend follows the MVC pattern with a RESTful API structure:

- **Models**: Mongoose schemas for MongoDB data modeling
- **Controllers**: Request handlers organized by resource
- **Routes**: API endpoint definitions
- **Middleware**: Request processing functions (auth, validation, etc.)
- **Utils**: Helper functions and error handling
- **Services**: Business logic and external integrations
- **Config**: Environment and application configuration

### 1.3 Database Design (MongoDB)

MongoDB is used with Mongoose ODM, with collections for:

- Users
- Campaigns
- Donations
- Projects
- Sponsorships
- Sadaqah
- Categories
- Media

## 2. FRONTEND IMPLEMENTATION

### 2.1 Key Frontend Pages

#### HomePage (Home.js)

```jsx
import React from "react";
import HeroSection from "../components/home/HeroSection";
import DonationCategories from "../components/home/DonationCategories";
import EnhancedCampaigns from "../components/home/EnhancedCampaigns";

const Home = () => {
  // Sample data for campaigns and projects
  const urgentCampaigns = [
    /* campaign data */
  ];
  const featuredProjects = [
    /* project data */
  ];

  return (
    <div className="home-page">
      <HeroSection />
      {/* Urgent Needs Section with campaign cards */}
      {/* Projects Section with project cards */}
      {/* Sadaqah Section with donation options */}
      {/* How It Works Section explaining donation process */}
      {/* Call to Action Section for volunteers */}
    </div>
  );
};
```

#### AboutPage (AboutPage.js)

```jsx
import { motion } from "framer-motion";
import AboutTabs from "../components/about/AboutTabs";

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section with gradient background */}
      <section className="relative bg-gradient-to-r from-[#8B1F4B] to-[#4B1F8B] text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold">About Ansar Relief</h1>
          <p className="text-xl">Dedicated to providing humanitarian aid...</p>
        </motion.div>
      </section>

      {/* Tabs Section with mission, vision, team info */}
      <AboutTabs />
    </div>
  );
};
```

#### CampaignsPage (CampaignsPage.js)

```jsx
import React, { useState, useEffect } from "react";
import CampaignCard from "../../components/campaigns/CampaignCard";

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    // Fetch campaigns data
    // In production, this would call an API
  }, []);

  // Filter campaigns based on search and category
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || campaign.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="campaigns-page">
      {/* Hero Section */}
      {/* Search and Filter Section */}
      {/* Campaigns Grid with filtered results */}
    </div>
  );
};
```

#### SadaqahPage (SadaqahPage.js)

```jsx
import React, { useState, useEffect } from "react";
import SadaqahTypeCard from "../../components/sadaqah/SadaqahTypeCard";
import DonationForm from "../../components/sadaqah/DonationForm";

const SadaqahPage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [sadaqahOptions, setSadaqahOptions] = useState([]);

  // Tab definitions for different sadaqah types
  const tabs = [
    { id: "general", label: "General Sadaqah" },
    { id: "immediate", label: "Immediate Needs" },
    { id: "periodic", label: "Periodic Donation" },
    { id: "kafarat", label: "Kafarat & Fidyah" },
    { id: "aqiqah", label: "Aqiqah & Sacrifice" },
    { id: "specific", label: "Specific Projects" },
  ];

  useEffect(() => {
    // Fetch sadaqah options
    // In production, this would call an API
  }, []);

  return (
    <div className="sadaqah-page">
      {/* Hero Section */}
      {/* Tabs Navigation */}
      {/* Content Section based on active tab */}
      {/* Donation Form */}
    </div>
  );
};
```

#### LoginPage (Login.js)

```jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../store/slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    // Form validation logic
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    dispatch(loginStart());

    try {
      // API call to login
      // On success, dispatch loginSuccess and navigate
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      {/* Login form with email, password fields */}
      {/* Social login options */}
      {/* Links to register, forgot password */}
    </div>
  );
};
```

### 2.2 Key Components

#### Navigation (Navbar.js)

```jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Navigation items with nested dropdowns
  const navItems = [
    { title: "Home", path: "/" },
    {
      title: "About",
      path: "/about",
      dropdown: [
        { title: "Our Mission", path: "/about/mission" },
        { title: "Our Team", path: "/about/team" },
        // More dropdown items
      ],
    },
    // More navigation items
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      {/* Logo */}
      {/* Navigation Links */}
      {/* Authentication Buttons */}
      {/* Donation Button */}
      {/* Mobile Menu Toggle */}
      {/* Mobile Menu Dropdown */}
    </header>
  );
};
```

#### DonationForm (DonationForm.js)

```jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addDonation } from "../../store/slices/donationSlice";

const DonationForm = ({ campaignId, campaignTitle }) => {
  const [amount, setAmount] = useState("");
  const [donationType, setDonationType] = useState("one-time");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    // Process donation
    // On success, redirect to payment page
  };

  return (
    <div className="donation-form bg-white rounded-lg shadow-md p-6">
      {/* Amount selection buttons */}
      {/* Custom amount input */}
      {/* Donation type toggle (one-time vs recurring) */}
      {/* Payment method selection */}
      {/* Anonymous donation checkbox */}
      {/* Submit button */}
    </div>
  );
};
```

### 2.3 State Management

#### Redux Store Configuration (store.js)

```javascript
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import campaignReducer from "./slices/campaignSlice";
import donationReducer from "./slices/donationSlice";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    campaigns: campaignReducer,
    donations: donationReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
```

#### Auth Context (AuthContext.js)

```jsx
import React, { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    // Other cases
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for stored token on mount
  useEffect(() => {
    // Load user from token
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
```

## 3. BACKEND IMPLEMENTATION

### 3.1 Server Setup (app.js)

```javascript
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const AppError = require("./utils/appError");
const { errorHandler } = require("./middleware/error.middleware");

// Import routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const campaignRoutes = require("./routes/campaign.routes");
// More route imports

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(mongoSanitize());
app.use(xss());

// Request parsing
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/campaigns", campaignRoutes);
// More route registrations

// Error handling
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorHandler);

module.exports = app;
```

### 3.2 Database Connection (index.js)

```javascript
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./.env" });
const app = require("./app");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connection successful!"));

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

// Handle unhandled rejections
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
```

### 3.3 Key Controllers

#### Auth Controller (auth.controller.js)

```javascript
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // Send welcome email and create token
  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: { user: newUser },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  // Check if user exists & password is correct
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // Send token to client
  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token,
    data: { user },
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // Get token and check if it exists
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError("Please log in to access this resource", 401));
  }

  // Verify token
  // Check if user still exists
  // Check if user changed password after token was issued
  // Grant access to protected route
});
```

#### Campaign Controller (campaign.controller.js)

```javascript
const Campaign = require("../models/campaign.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("../utils/handlerFactory");

// Generic CRUD operations using factory functions
exports.getAllCampaigns = factory.getAll(Campaign);
exports.getCampaign = factory.getOne(Campaign);
exports.createCampaign = factory.createOne(Campaign);
exports.updateCampaign = factory.updateOne(Campaign);
exports.deleteCampaign = factory.deleteOne(Campaign);

// Custom controller methods
exports.getActiveCampaigns = catchAsync(async (req, res, next) => {
  const campaigns = await Campaign.find({
    isActive: true,
    endDate: { $gte: new Date() },
  });

  res.status(200).json({
    status: "success",
    results: campaigns.length,
    data: { campaigns },
  });
});

exports.getFeaturedCampaigns = catchAsync(async (req, res, next) => {
  const campaigns = await Campaign.find({
    isActive: true,
    isFeatured: true,
  }).limit(4);

  res.status(200).json({
    status: "success",
    data: { campaigns },
  });
});
```

### 3.4 Key Models

#### User Model (user.model.js)

```javascript
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please tell us your first name!"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Please tell us your last name!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "volunteer", "admin", "super-admin"],
      default: "user",
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    passwordChangedAt: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Password hashing middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Password comparison method
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Password reset token generation
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpires = Date.now() + 3600000; // 1 hour

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
```

#### Campaign Model (campaign.model.js)

```javascript
const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A campaign must have a title"],
      trim: true,
      maxlength: [100, "A campaign title cannot exceed 100 characters"],
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "A campaign must have a description"],
    },
    shortDescription: {
      type: String,
      required: [true, "A campaign must have a short description"],
      maxlength: [200, "Short description cannot exceed 200 characters"],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "A campaign must belong to a category"],
    },
    goal: {
      type: Number,
      required: [true, "A campaign must have a fundraising goal"],
    },
    raised: {
      type: Number,
      default: 0,
    },
    startDate: {
      type: Date,
      required: [true, "A campaign must have a start date"],
    },
    endDate: {
      type: Date,
      required: [true, "A campaign must have an end date"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isUrgent: {
      type: Boolean,
      default: false,
    },
    coverImage: {
      type: String,
      required: [true, "A campaign must have a cover image"],
    },
    images: [String],
    location: {
      type: String,
      required: [true, "A campaign must have a location"],
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A campaign must have an author"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate for donations
campaignSchema.virtual("donations", {
  ref: "Donation",
  foreignField: "campaign",
  localField: "_id",
});

// Document middleware to create slug
campaignSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;
```

## 4. API ENDPOINTS

### 4.1 Authentication Routes

- `POST /api/auth/signup`: Register a new user
- `POST /api/auth/login`: Authenticate user and get token
- `GET /api/auth/logout`: Log out user and clear cookie
- `POST /api/auth/forgotPassword`: Send password reset email
- `PATCH /api/auth/resetPassword/:token`: Reset password with token
- `PATCH /api/auth/updateMyPassword`: Update current user password

### 4.2 User Routes

- `GET /api/users/me`: Get current user profile
- `PATCH /api/users/updateMe`: Update current user data
- `DELETE /api/users/deleteMe`: Deactivate current user account
- `GET /api/users`: Get all users (admin only)
- `GET /api/users/:id`: Get specific user (admin only)
- `PATCH /api/users/:id`: Update user (admin only)
- `DELETE /api/users/:id`: Delete user (admin only)

### 4.3 Campaign Routes

- `GET /api/campaigns`: Get all campaigns
- `POST /api/campaigns`: Create new campaign (admin only)
- `GET /api/campaigns/:id`: Get specific campaign
- `PATCH /api/campaigns/:id`: Update campaign (admin only)
- `DELETE /api/campaigns/:id`: Delete campaign (admin only)
- `GET /api/campaigns/active`: Get active campaigns
- `GET /api/campaigns/featured`: Get featured campaigns
- `GET /api/campaigns/urgent`: Get urgent campaigns

### 4.4 Donation Routes

- `POST /api/donations`: Create new donation
- `GET /api/donations`: Get all donations (admin only)
- `GET /api/donations/me`: Get user's donations
- `GET /api/donations/:id`: Get specific donation
- `PATCH /api/donations/:id/status`: Update donation status (admin only)

## 5. SECURITY IMPLEMENTATION

### 5.1 Authentication & Authorization

- JWT-based authentication with secure HTTP-only cookies
- Password hashing with bcrypt
- Role-based access control (user, volunteer, admin, super-admin)
- Token expiration and refresh mechanism
- Password reset with secure tokens

### 5.2 Data Protection

- Input validation and sanitization
- Protection against NoSQL injection
- XSS prevention
- CSRF protection
- Rate limiting for API endpoints
- Secure HTTP headers with Helmet

### 5.3 Error Handling

- Global error handling middleware
- Operational vs programming error distinction
- Custom AppError class for consistent error responses
- Async error handling with catchAsync utility

## 6. DEPLOYMENT ARCHITECTURE

### 6.1 Development Environment

- Local MongoDB instance
- Nodemon for server auto-restart
- React development server with hot reloading
- Environment variables for configuration

### 6.2 Production Environment

- MongoDB Atlas for database hosting
- Express serving static React build
- PM2 for Node.js process management
- NGINX as reverse proxy
- SSL/TLS encryption
- Automated backups for database

### 6.3 CI/CD Pipeline

- GitHub Actions for automated testing and deployment
- Staging environment for pre-production testing
- Production deployment with approval workflow
- Automated database migrations
