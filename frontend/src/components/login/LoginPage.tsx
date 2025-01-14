import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useUser } from '../../contexts/UserContext';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [doNotCache, setDoNotCache] = useState(false);
  const [revokeConsent, setRevokeConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await simulateBackendRequest();
      setUser(response.data);
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage("Verbindung zum Server fehlgeschlagen. Bitte versuchen Sie es später erneut.");
    }

    setIsSubmitting(false);
  };

  const simulateBackendRequest = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.3) {  // 70% chance of success
          resolve({
            data: {
              firstName: 'Max',
              lastName: 'Mustermann',
              matrikelNumber: '0123456789',
              department: 'Informatik'
            }
          });
        } else {
          reject(new Error('Connection failed'));
        }
      }, 1000);  // Simulate network delay
    });
  };

  return (
    <div className="container-fluid login-page">
      <div className="row">
        <main className="col-md-9">
          <header className="login-header">
            <img className="main-logo" src="/idp/images/logo.png" alt="Technische Universität Darmstadt" />
            <h1 className="h3 login-title">Identity Provider der Technischen Universität Darmstadt</h1>
          </header>
          
          <section className="login-form">
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="csrf_token" value="_6400de90d158455e83703d984f59ce2d98d3a340" />
              
              <legend className="h5 mb-4">
                Anmelden bei Hochschulwahlwebseite
              </legend>

              <div className="mb-3">
                <label htmlFor="username" className="form-label">Benutzername</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Passwort</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mb-3 form-check">
                <input 
                  type="checkbox" 
                  className="form-check-input" 
                  id="donotcache" 
                  checked={doNotCache}
                  onChange={(e) => setDoNotCache(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="donotcache">Anmeldung nicht speichern</label>
              </div>

              <div className="mb-3 form-check">
                <input 
                  type="checkbox" 
                  className="form-check-input" 
                  id="_shib_idp_revokeConsent" 
                  checked={revokeConsent}
                  onChange={(e) => setRevokeConsent(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="_shib_idp_revokeConsent">
                  Die zu übermittelnden Informationen anzeigen, damit ich die Weitergabe gegebenenfalls ablehnen kann.
                </label>
              </div>

              <div className="d-grid">
                <button 
                  type="submit" 
                  className="btn btn-danger" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Anmeldung läuft, bitte warten...' : 'Anmelden'}
                </button>
              </div>
            </form>
            {errorMessage && (
              <div className="alert alert-danger mt-3" role="alert">
                {errorMessage}
              </div>
            )}
          </section>
        </main>
        <Sidebar />
      </div>
    </div>
  );
};

export default LoginPage;

