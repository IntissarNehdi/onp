import React from 'react';
import { useUser } from '../../contexts/UserContext';
import { Navigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Willkommen, {user.firstName} {user.lastName}!</h1>
      </header>
      <main className="dashboard-content">
        <section className="user-info">
          <h2>Ihre Informationen</h2>
          <p><strong>Matrikelnummer:</strong> {user.matrikelNumber}</p>
          <p><strong>Fachbereich:</strong> {user.department}</p>
        </section>
        {/* Add more dashboard content here */}
      </main>
    </div>
  );
};

export default Dashboard;

