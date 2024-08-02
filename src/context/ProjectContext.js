// src/context/ProjectContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from '../services/api';

const ProjectContext = createContext();

export const useProjectContext = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get('/project');
      setProjects(response.data);
    } catch (error) {
      console.error('Failed to fetch projects:', error.response ? error.response.data : 'No response');
    }
  };
  const fetchProjectsWithOutTask = async (id) => {
    try {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get(`/project/${id}`);
      setProjects(response.data);
    } catch (error) {
      console.error('Failed to fetch projects:', error.response ? error.response.data : 'No response');
    }
  };
  const token = localStorage.getItem('token');
  useEffect(() => {
    if(token){
      fetchProjects();
    }
  }, []);

  const createNewProject = async (projectData) => {
    try {
      const response = await axios.post('/project', projectData);
      const newProject = response.data;
      setProjects([...projects, newProject]);
    } catch (error) {
      console.error('Error creating project:', error.response ? error.response.data : 'No response');
    }
  };

  return (
    <ProjectContext.Provider value={{ projects, setProjects, createNewProject ,fetchProjects,fetchProjectsWithOutTask}}>
      {children}
    </ProjectContext.Provider>
  );
};
