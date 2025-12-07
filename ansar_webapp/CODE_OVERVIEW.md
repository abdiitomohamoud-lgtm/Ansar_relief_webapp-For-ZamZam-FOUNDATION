# Ansar Humanitarian Relief - Code Overview

## Frontend Components

### 1. HomePage (client/src/pages/Home.js)

```jsx
import React from "react";
import HeroSection from "../components/home/HeroSection";
import DonationCategories from "../components/home/DonationCategories";
import EnhancedCampaigns from "../components/home/EnhancedCampaigns";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
  // Sample data for urgent campaigns
  const urgentCampaigns = [
    {
      id: 1,
      title: "Emergency Relief: Gaza",
      description: "Provide urgent humanitarian aid to families in Gaza",
      image: "/images/campaigns/emergency-aid.jpg",
      goal: 100000,
      raised: 45000,
      category: "Emergency",
      slug: "emergency-relief-gaza",
    },
    // More campaigns...
  ];

  return (
    <div className="home-page">
      <HeroSection />

      {/* Urgent Needs Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Urgent Needs</h2>
            <Link
              to="/campaigns"
              className="flex items-center text-primary-600"
            >
              View all campaigns <FaArrowRight className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {urgentCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {/* Campaign card content */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional sections */}
    </div>
  );
};

export default Home;
```

### 2. AboutPage (client/src/pages/AboutPage.js)

```jsx
import { motion } from "framer-motion";
import AboutTabs from "../components/about/AboutTabs";

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#8B1F4B] to-[#4B1F8B] text-white">
        <div className="absolute inset-0 overflow-hidden">
          {/* Background pattern */}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6">About Ansar Relief</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Dedicated to providing humanitarian aid and sustainable
              development solutions to communities in need across Somali
              territories.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs Section */}
      <AboutTabs />
    </div>
  );
};

export default AboutPage;
```

### 3. CampaignsPage (client/src/pages/campaigns/CampaignsPage.js)

```jsx
import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSearch, FaFilter } from "react-icons/fa";
import CampaignCard from "../../components/campaigns/CampaignCard";

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    // Mock fetch campaigns data
    setTimeout(() => {
      setCampaigns([
        {
          id: "1",
          title: "Emergency Relief for Gaza",
          description:
            "Providing urgent humanitarian aid to families affected by the crisis in Gaza.",
          image: "https://via.placeholder.com/400x300",
          raised: 75000,
          goal: 100000,
          donors: 1240,
          daysLeft: 15,
          category: "Emergency Relief",
          location: "Gaza, Palestine",
          isUrgent: true,
        },
        // More campaigns...
      ]);
      setLoading(false);
    }, 1000);
  }, []);

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
      <section className="relative bg-gradient-to-r from-primary-800 to-primary-900 text-white py-12">
        {/* Hero content */}
      </section>

      {/* Filters Section */}
      <section className="bg-white py-8 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            {/* Search and filters */}
          </div>
        </div>
      </section>

      {/* Campaigns Grid */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-20">
              {/* Loading spinner */}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CampaignsPage;
```

### 4. SadaqahPage (client/src/pages/sadaqah/SadaqahPage.js)

```jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaHandHoldingHeart } from "react-icons/fa";
import SadaqahTypeCard from "../../components/sadaqah/SadaqahTypeCard";
import DonationForm from "../../components/sadaqah/DonationForm";

const SadaqahPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("general");
  const [sadaqahOptions, setSadaqahOptions] = useState([]);
  const [donationAmount, setDonationAmount] = useState("");

  const tabs = [
    { id: "general", label: "General Sadaqah" },
    { id: "immediate", label: "Immediate Needs" },
    { id: "periodic", label: "Periodic Donation" },
    { id: "kafarat", label: "Kafarat & Fidyah" },
    { id: "aqiqah", label: "Aqiqah & Sacrifice" },
    { id: "specific", label: "Specific Projects" },
  ];

  useEffect(() => {
    // Mock fetch sadaqah options
    setTimeout(() => {
      setSadaqahOptions({
        general: [
          {
            id: "general-1",
            title: "Daily Sadaqah",
            description:
              "A special donation program that allows enrolled donors to automatically donate an agreed amount every day.",
            image:
              "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6",
            iconName: "FaCalendarAlt",
            cta: "Subscribe Now",
            isPeriodic: true,
          },
          // More options...
        ],
        // More categories...
      });
    }, 1000);
  }, []);

  return (
    <div className="sadaqah-page">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-800 to-primary-900 text-white py-24">
        {/* Hero content */}
      </section>

      {/* Tabs Navigation */}
      <section className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-4 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-6 py-2 whitespace-nowrap mx-2 rounded-full transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Render content based on active tab */}
        </div>
      </section>
    </div>
  );
};

export default SadaqahPage;
```

### 5. Login Page (client/src/pages/auth/Login.js)

```jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../store/slices/authSlice";
import { useLoginMutation } from "../../store/api/apiSlice";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [login] = useLoginMutation();

  // Get the intended destination, if any
  const from = location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from);
    }
  }, [isAuthenticated, navigate, from]);

  const validateForm = () => {
    const errors = {};

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = "Invalid email address";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    dispatch(loginStart());

    try {
      const result = await login({
        email,
        password,
      }).unwrap();

      dispatch(loginSuccess(result));
      navigate(from);
    } catch (error) {
      dispatch(loginFailure(error.data?.message || "Login failed"));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Form fields */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
```

## Backend Components

### 6. Authentication Controller (server/src/controllers/auth.controller.js)

```javascript
const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Email = require("../utils/email");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers("x-forwarded-proto") === "https",
  });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: { user },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });

  const url = `${req.protocol}://${req.get("host")}/me`;
  await new Email(newUser, url).sendWelcome();

  createSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, req, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});
```

### 7. Campaign Controller (server/src/controllers/campaign.controller.js)

```javascript
const Campaign = require("../models/campaign.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("../utils/handlerFactory");

exports.getAllCampaigns = factory.getAll(Campaign);
exports.getCampaign = factory.getOne(Campaign);
exports.createCampaign = factory.createOne(Campaign);
exports.updateCampaign = factory.updateOne(Campaign);
exports.deleteCampaign = factory.deleteOne(Campaign);

exports.getActiveCampaigns = catchAsync(async (req, res, next) => {
  const campaigns = await Campaign.find({
    isActive: true,
    endDate: { $gte: new Date() },
  }).sort("-createdAt");

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
    results: campaigns.length,
    data: { campaigns },
  });
});

exports.getUrgentCampaigns = catchAsync(async (req, res, next) => {
  const campaigns = await Campaign.find({
    isActive: true,
    isUrgent: true,
  }).limit(4);

  res.status(200).json({
    status: "success",
    results: campaigns.length,
    data: { campaigns },
  });
});
```

### 8. User Model (server/src/models/user.model.js)

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
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
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
    verified: {
      type: Boolean,
      default: false,
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

// Virtual field for user's full name
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Match user entered password to hashed password in database
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Check if user changed password after token was issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// Create password reset token
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpires = Date.now() + 3600000; // 1 hour

  return resetToken;
};

// Pre-save hook to hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
```

### 9. App Configuration (server/src/app.js)

```javascript
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
const AppError = require("./utils/appError");
const { errorHandler } = require("./middleware/error.middleware");

// Import routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const campaignRoutes = require("./routes/campaign.routes");
const donationRoutes = require("./routes/donation.routes");
const sadaqahRoutes = require("./routes/sadaqah.routes");
const sponsorshipRoutes = require("./routes/sponsorship.routes");
const projectRoutes = require("./routes/project.routes");

// Start express app
const app = express();

app.enable("trust proxy");

// GLOBAL MIDDLEWARES

// Implement CORS
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : "http://localhost:3000",
    credentials: true,
  })
);

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Body parser
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/sadaqah", sadaqahRoutes);
app.use("/api/sponsorships", sponsorshipRoutes);
app.use("/api/projects", projectRoutes);

// Handle undefined routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(errorHandler);

module.exports = app;
```

### 10. Server Entry Point (server/src/index.js)

```javascript
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

// Load environment variables from config file
dotenv.config({ path: "./.env" });

const app = require("./app");

// Database connection string
const DB = process.env.MONGODB_URI || "mongodb://localhost:27017/ansar_db";

// Connect to MongoDB
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connection successful!"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
```
