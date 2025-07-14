import React, { useState } from "react";
import { auth, db } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Container } from "react-bootstrap";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInstructor, setIsInstructor] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email,
        isInstructor,
      });

      alert("Signup successful!");
      navigate("/dashboard");
    } catch (err) {
      alert("Signup failed: " + err.message);
    }
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", paddingTop: "60px" }}>
      <Container className="d-flex justify-content-center align-items-center">
        <Card className="p-4 shadow-lg border-0 w-100" style={{ maxWidth: "500px" }}>
          <h3 className="mb-4 text-center text-primary fw-bold">Create Your Upwise Account 🎓</h3>
          <Form onSubmit={handleSignup}>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Check
                type="checkbox"
                label="I want to register as an Instructor"
                checked={isInstructor}
                onChange={() => setIsInstructor(!isInstructor)}
              />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100">
              Create Account
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
}

export default Signup;
