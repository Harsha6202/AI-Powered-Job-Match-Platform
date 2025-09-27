require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const passport = require("passport");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");

// database connection
connection();

const allowedOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',')
    : [
        'https://lemon-coast-01b0ad500.3.azurestaticapps.net',
        'https://zealous-plant-030f3a200.3.azurestaticapps.net',
        'http://localhost:3000'
    ];

// middlewares
app.use(express.json());
app.use(passport.initialize());
app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

// API documentation routecd
app.get("/", (req, res) => {
    res.json({
        status: "API is running",
        endpoints: {
            health: {
                path: "/health",
                method: "GET",
                description: "Health check endpoint"
            },
            auth: {
                base: "/api/auth",
                endpoints: {
                    login: { method: "POST", path: "/" }
                }
            },
            users: {
                base: "/api/users",
                endpoints: {
                    register: { method: "POST", path: "/" },
                    profile: { method: "GET", path: "/profile" },
                    updateProfile: { method: "POST", path: "/profile" }
                }
            },
            jobs: {
                base: "/api/jobs",
                endpoints: {
                    getAllJobs: { method: "GET", path: "/" },
                    createJob: { method: "POST", path: "/" },
                    updateJob: { method: "PUT", path: "/:id" },
                    deleteJob: { method: "DELETE", path: "/:id" }
                }
            }
        }
    });
});

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

// health check endpoint for Railway
app.get("/health", (req, res) => {
    res.status(200).json({ status: "healthy" });
});

const port = process.env.PORT || 8080;
if (require.main === module) {
    app.listen(port, "0.0.0.0", () => {
        console.log(`Server running on port ${port}`);
    });
}

module.exports = app;
