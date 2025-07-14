import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase';
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import { Container, Row, Col, Card } from 'react-bootstrap';

function MyCourses() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      try {
        const enrollmentQuery = query(
          collection(db, 'enrollments'),
          where('userId', '==', userId)
        );
        const enrollmentSnapshot = await getDocs(enrollmentQuery);

        const courseIds = enrollmentSnapshot.docs.map(doc => doc.data().courseId);

        const coursePromises = courseIds.map(id => getDoc(doc(db, 'courses', id)));
        const courseSnapshots = await Promise.all(coursePromises);

        const courses = courseSnapshots
          .filter(docSnap => docSnap.exists())
          .map(docSnap => ({
            id: docSnap.id,
            ...docSnap.data(),
          }));

        setEnrolledCourses(courses);
      } catch (error) {
        console.error('Failed to fetch enrolled courses:', error);
      }
    };

    fetchEnrolledCourses();
  }, []);

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingTop: '60px' }}>
      <Container>
        <h2 className="text-center mb-5 text-primary fw-bold">📘 My Enrolled Courses</h2>

        {enrolledCourses.length === 0 ? (
          <p className="text-center text-muted">You haven't enrolled in any courses yet.</p>
        ) : (
          <Row className="g-4">
            {enrolledCourses.map(course => (
              <Col md={4} key={course.id}>
                <Card className="shadow-sm border-0">
                  <Card.Body>
                    <Card.Title className="fw-semibold text-dark">{course.title}</Card.Title>
                    <Card.Text className="text-muted">{course.description}</Card.Text>
                    <Card.Text className="text-secondary small">
                      Instructor: {course.instructor}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default MyCourses;
