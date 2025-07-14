import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { auth, db } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import {
  FaPlus,
  FaBookOpen,
  FaGraduationCap,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [isInstructor, setIsInstructor] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setIsInstructor(docSnap.data().isInstructor);
      }
    };

    fetchUserRole();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div style={{ backgroundColor: "#f9f9f9", minHeight: "100vh", paddingTop: "60px" }}>
      <Container className="py-5">
        <h2 className="text-center text-primary fw-bold mb-2">
          {isInstructor ? "👨‍🏫 Instructor Dashboard" : "🎓 Learner Dashboard"}
        </h2>
        <p className="text-center text-muted mb-5">
          Welcome to your personalized learning space.
        </p>

        <Row className="justify-content-center g-4">
          {isInstructor ? (
            <Col md={4}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Body className="text-center">
                  <FaPlus className="display-5 text-success mb-3" />
                  <Card.Title className="fw-bold">Add a New Course</Card.Title>
                  <Card.Text className="text-muted">
                    Upload and manage your learning content for students.
                  </Card.Text>
                  <Link to="/add-course">
                    <Button variant="success" className="mt-2 w-100">
                      Add Course
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ) : (
            <>
              <Col md={4}>
                <Card className="shadow-sm border-0 h-100">
                  <Card.Body className="text-center">
                    <FaBookOpen className="display-5 text-info mb-3" />
                    <Card.Title className="fw-bold">Browse Courses</Card.Title>
                    <Card.Text className="text-muted">
                      Discover and enroll in available courses.
                    </Card.Text>
                    <Link to="/courses">
                      <Button variant="info" className="mt-2 w-100">
                        View Courses
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="shadow-sm border-0 h-100">
                  <Card.Body className="text-center">
                    <FaGraduationCap className="display-5 text-primary mb-3" />
                    <Card.Title className="fw-bold">My Courses</Card.Title>
                    <Card.Text className="text-muted">
                      See your enrolled courses anytime.
                    </Card.Text>
                    <Link to="/my-courses">
                      <Button variant="primary" className="mt-2 w-100">
                        My Courses
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            </>
          )}

          <Col md={4}>
            <Card className="shadow-sm border-0 h-100">
              <Card.Body className="text-center">
                <FaSignOutAlt className="display-5 text-danger mb-3" />
                <Card.Title className="fw-bold">Logout</Card.Title>
                <Card.Text className="text-muted">
                  End your session securely.
                </Card.Text>
                <Button
                  variant="danger"
                  className="mt-2 w-100"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
