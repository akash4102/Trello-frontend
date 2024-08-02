import React, { useState } from 'react';
import { useProjectContext } from '../context/ProjectContext';
import { Card, Button, Modal, Form, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from '../services/api';
import { useForm } from 'react-hook-form'; // Import react-hook-form
import './ProjectList.css'; 

const ProjectList = () => {
  const { projects, setProjects, fetchProjects } = useProjectContext();
  const [show, setShow] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm(); // Initialize useForm

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    reset(); // Reset form fields when the modal is shown
  };

  const handleCreateProject = async (data) => {
    try {
      const response = await axios.post('/projects', data);
      const newProjectData = response.data;
      setProjects([...projects, newProjectData]);
      handleClose();
    } catch (error) {
      console.error('Error creating project:', error.response ? error.response.data : 'No response');
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await axios.delete(`/project/${projectId}`);
      alert("Project deleted successfully");
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error.response ? error.response.data : 'No response');
    }
  };

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col>
          <h2 className="text-primary">Projects</h2>
          <Button variant="outline-success" onClick={handleShow} className="add-btn">Add New Project</Button>
        </Col>
      </Row>
      <Row>
        {projects.map((project) => (
          <Col md={4} key={project._id} className="mb-4">
            <Card className="project-card">
              <Card.Body>
                <Card.Title className="project-title">{project.name}</Card.Title>
                <Card.Text>{project.description}</Card.Text>
                <Button as={Link} to={`/projects/${project._id}`} variant="outline-primary">
                  View Details
                </Button>
                <Button variant="outline-danger" className="ms-2" onClick={() => handleDeleteProject(project._id)}>
                  Delete Project
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={show} onHide={handleClose} className="project-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(handleCreateProject)}>
            <Form.Group controlId="projectName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter project name"
                {...register('name', {
                  required: 'Project name is required',
                  minLength: {
                    value: 2,
                    message: 'Project name must be at least 2 characters long',
                  },
                  maxLength: {
                    value: 100,
                    message: 'Project name cannot exceed 100 characters',
                  },
                })}
                className={errors.name ? 'is-invalid' : ''}
              />
              {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
            </Form.Group>
            <Form.Group controlId="projectDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter project description"
                {...register('description', {
                  required: 'Description is required',
                  minLength: {
                    value: 10,
                    message: 'Description must be at least 10 characters long',
                  },
                  maxLength: {
                    value: 500,
                    message: 'Description cannot exceed 500 characters',
                  },
                })}
                className={errors.description ? 'is-invalid' : ''}
              />
              {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
            </Form.Group>
            <Button type="submit" variant="success" className="mt-3">
              Create Project
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProjectList;
