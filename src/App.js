import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import AppNavbar from "./components/Navbar"; // ✅ Use AppNavbar (not plain "Navbar")
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AddCourse from "./pages/AddCourse";
import CourseList from "./pages/CourseList";
import MyCourses from "./pages/MyCourses";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './App.css'; // ✅ or './App.css' if you used that


function Home() {
  return (
    <div style={{ background: 'linear-gradient(to right, #f8f9fa, #e9ecef)', minHeight: '100vh', paddingTop: '60px' }}>
      <Container>
        <div className="row align-items-center">
          {/* LEFT SIDE: TEXT */}
          <div className="col-md-6">
            <h1 className="display-4 fw-bold text-primary mb-3">Welcome to Upwise 🎓</h1>
            <p className="lead text-muted mb-4">
              Discover top courses from expert instructors. Learn at your own pace with flexibility.
            </p>
            <div className="d-flex gap-3">
              <Link to="/login">
                <Button variant="primary" size="lg">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline-secondary" size="lg">Sign Up</Button>
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE: IMAGE */}
          <div className="col-md-6 text-center">
            <div className="p-3 bg-white rounded shadow-sm d-inline-block">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
                alt="Learning"
                className="img-fluid"
                style={{ maxWidth: '75%', borderRadius: '12px' }}
              />
            </div>
          </div>
        </div>

        {/* FEATURES SECTION */}
        <hr className="my-5" />
        <div className="text-center mb-4">
          <h2 className="fw-bold">Why Choose Upwise?</h2>
        </div>
        <div className="row text-center">
          <div className="col-md-4">
            <div className="p-4 shadow-sm bg-white rounded">
              <h5>👨‍🏫 Expert Instructors</h5>
              <p className="text-muted">Real-world expertise in every lesson.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 shadow-sm bg-white rounded">
              <h5>📱 Learn Anytime</h5>
              <p className="text-muted">Device friendly and mobile ready.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 shadow-sm bg-white rounded">
              <h5>🏆 Career Boost</h5>
              <p className="text-muted">Earn skills that matter in 2025.</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}



function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <AppNavbar isAuthenticated={!!user} /> {/* ✅ Corrected */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-course"
          element={
            <ProtectedRoute>
              <AddCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <CourseList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-courses"
          element={
            <ProtectedRoute>
              <MyCourses />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
