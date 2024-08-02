import React from 'react';
import { useProjectContext } from '../context/ProjectContext';
import { Card, Badge, Container, Row, Col, Button } from 'react-bootstrap';
import axios from '../services/api';
import './TaskBoard.css';

const TaskBoard = () => {
  const { projects, fetchProjects } = useProjectContext();

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await axios.delete(`/task/${taskId}`);
      fetchProjects();
      alert('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error.response ? error.response.data : 'No response from server');
    }
  };

  const tasks = projects.flatMap(project =>
    project?.tasks?.map(task => ({ ...task, projectName: project.name }))
  );

  const statuses = ['Backlog', 'In Discussion', 'In Progress', 'Done'];

  return (
    <Container fluid className="mt-4">
      <h2 className="text-primary mb-3 text-center">Task Board</h2>
      <Row>
        {statuses.map(status => (
          <Col md={3} key={status} className="task-column">
            <div className={`status-card status-${status.replace(/\s+/g, '-').toLowerCase()}`}>
              <h4 className="status-header">{status}</h4>
              {tasks
                ?.filter(task => task?.status === status)
                .map(task => (
                  <Card key={task?._id} className="task-card">
                    <Card.Body>
                      <Card.Title>{task?.name}</Card.Title>
                      <Card.Subtitle>
                        <small>{task?.projectName}</small>
                      </Card.Subtitle>
                      <Card.Text>
                        {task?.description}
                        <Badge className="task-badge">{task?.tags.join(', ')}</Badge>
                        <small className="due-date">Due: {new Date(task?.dueDate).toLocaleDateString()}</small>
                      </Card.Text>
                      <Button variant="outline-danger" onClick={() => handleDeleteTask(task?._id)}>
                        Delete
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TaskBoard;
