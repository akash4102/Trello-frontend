import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useProjectContext } from "../context/ProjectContext";
import { Card, Button, Modal, Form, Badge, Container, Row, Col } from "react-bootstrap";
import axios from '../services/api';
import { useForm } from 'react-hook-form'; // Import react-hook-form
import './ProjectDetails.css';

const ProjectDetails = () => {
  const { projects, fetchProjects } = useProjectContext();
  const { projectId } = useParams();
  const project = projects.find(p => p._id === projectId);
  const [show, setShow] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm(); // Initialize useForm

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    reset(); // Reset form fields when the modal is shown
  };

  const handleAddTask = async (data) => {
    try {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const tagsArray = data.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      const taskData = { ...data, tags: tagsArray, project: project._id };
      await axios.post('/task', taskData);
      fetchProjects();
      handleClose();
    } catch (error) {
      console.error('Error adding task:', error.response ? error.response.data : 'No response');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await axios.delete(`/task/${taskId}`);
      fetchProjects();
      alert("Task deleted successfully!");
    } catch (error) {
      console.error('Error deleting task:', error.response ? error.response.data : 'No response');
    }
  };

  if (!project) {
    return <h2 className="text-danger">Project not found</h2>;
  }

  return (
    <Container className="mt-4 project-details">
      <h2 className="text-primary">{project.name}</h2>
      <p>{project.description}</p>
      <Button variant="outline-success" onClick={handleShow}>
        Add New Task
      </Button>
      <Row className="mt-4">
        {project?.tasks?.map((task) => (
          <Col md={4} key={task._id} className="mb-4">
            <Card className="task-card">
              <Card.Body>
                <Card.Title className="task-title">{task.name}</Card.Title>
                <Card.Text>{task.description}</Card.Text>
                <Badge bg="secondary" className="me-2">
                  {task.tags.join(", ")}
                </Badge>
                <Badge bg="info">{task.status}</Badge>
                <div className="mt-2">
                  <small className="text-muted">Due: {new Date(task.dueDate).toLocaleDateString()}</small>
                </div>
                <Button variant="outline-danger" size="sm" className="mt-2" onClick={() => handleDeleteTask(task._id)}>
                  Delete Task
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={show} onHide={handleClose} className="add-task-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(handleAddTask)}>
            <Form.Group controlId="taskName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task name"
                {...register('name', { required: 'Task name is required' })}
                className={errors.name ? 'is-invalid' : ''}
              />
              {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
            </Form.Group>
            <Form.Group controlId="taskDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter task description"
                {...register('description', { required: 'Description is required' })}
                className={errors.description ? 'is-invalid' : ''}
              />
              {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
            </Form.Group>
            <Form.Group controlId="taskStatus" className="mt-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                {...register('status', { required: 'Status is required' })}
                className={errors.status ? 'is-invalid' : ''}
              >
                <option value="">Select status</option>
                <option value="Backlog">Backlog</option>
                <option value="In Discussion">In Discussion</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </Form.Control>
              {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
            </Form.Group>
            <Form.Group controlId="taskTags" className="mt-3">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task tags (comma separated)"
                {...register('tags')}
              />
            </Form.Group>
            <Form.Group controlId="taskDueDate" className="mt-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                {...register('dueDate', { required: 'Due date is required' })}
                className={errors.dueDate ? 'is-invalid' : ''}
              />
              {errors.dueDate && <div className="invalid-feedback">{errors.dueDate.message}</div>}
            </Form.Group>
            <Form.Group controlId="taskAssignedUser" className="mt-3">
              <Form.Label>Assigned User</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter assigned user"
                {...register('assignedUser', { required: 'Assigned user is required' })}
                className={errors.assignedUser ? 'is-invalid' : ''}
              />
              {errors.assignedUser && <div className="invalid-feedback">{errors.assignedUser.message}</div>}
            </Form.Group>
            <Button type="submit" variant="success" className="mt-4 w-100">
              Add Task
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProjectDetails;
