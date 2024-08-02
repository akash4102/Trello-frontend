import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import ProjectList from '../../views/ProjectList';
import TaskBoard from '../../views/TaskBoard';

const Dashboard = () => {
  return (
    <div className="mt-4">
      <Tabs defaultActiveKey="projects" id="dashboard-tabs">
        <Tab eventKey="projects" title="Projects">
          <ProjectList />
        </Tab>
        <Tab eventKey="task-board" title="Task Board">
          <TaskBoard />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Dashboard;
