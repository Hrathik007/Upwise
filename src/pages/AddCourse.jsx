import React, { useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Form, Button, Container, Card } from 'react-bootstrap';

function AddCourse() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instructor, setInstructor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "courses"), {
        title,
        description,
        instructor,
        createdAt: serverTimestamp(),
      });
      alert("✅ Course added successfully!");
      setTitle('');
      setDescription('');
      setInstructor('');
    } catch (err) {
      console.error("Error adding course:", err);
      alert("❌ Failed to add course.");
    }
  };

  return (
    <Container className="py-5">
      <Card className="shadow mx-auto" style={{ maxWidth: '600px' }}>
        <Card.Body>
          <h3 className="text-center text-primary mb-4">➕ Add New Course</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Course Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter course title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Course Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter course description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Instructor Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter instructor name"
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Add Course
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddCourse;
