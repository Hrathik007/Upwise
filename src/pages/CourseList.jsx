import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, setDoc, query, where } from 'firebase/firestore';
import { db, auth } from '../firebase/firebase';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const courseSnapshot = await getDocs(collection(db, 'courses'));
      const courseList = courseSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCourses(courseList);
    };

    const fetchEnrollments = async () => {
      const userId = auth.currentUser?.uid;
      const q = query(collection(db, 'enrollments'), where('userId', '==', userId));
      const snapshot = await getDocs(q);
      setEnrolledIds(snapshot.docs.map(doc => doc.data().courseId));
    };

    fetchCourses();
    fetchEnrollments();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      const userId = auth.currentUser.uid;
      await setDoc(doc(db, 'enrollments', `${userId}_${courseId}`), {
        userId,
        courseId,
        enrolledAt: new Date(),
      });
      alert('✅ Enrolled successfully!');
      setEnrolledIds(prev => [...prev, courseId]);
    } catch (err) {
      console.error(err);
      alert('❌ Enrollment failed!');
    }
  };

  return (
    <Container className="py-5">
      <h2 className="text-center text-primary mb-5">📚 Explore Courses</h2>
      {courses.length === 0 ? (
        <p className="text-center text-muted">No courses available at the moment.</p>
      ) : (
        <Row>
          {courses.map(course => (
            <Col key={course.id} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow-sm border-0">
                <Card.Body>
                  <Card.Title className="fw-bold">{course.title}</Card.Title>
                  <Card.Text>{course.description}</Card.Text>
                  <Card.Text className="text-muted">
                    👨‍🏫 Instructor: <strong>{course.instructor}</strong>
                  </Card.Text>
                  {enrolledIds.includes(course.id) ? (
                    <div className="text-success fw-semibold mt-3">✅ Already Enrolled</div>
                  ) : (
                    <Button
                      variant="primary"
                      className="w-100 mt-3"
                      onClick={() => handleEnroll(course.id)}
                    >
                      Enroll Now
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default CourseList;
