import React, { useState, FormEvent } from 'react';
import Sidebar from './Sidebar';
import './LoginPage.css';
import tudaLogo from '../../assets/tuda_logo.jpg'

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [doNotCache, setDoNotCache] = useState(false);
  const [revokeConsent, setRevokeConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Here you would typically handle the login logic
    console.log('Login submitted', { username, password, doNotCache, revokeConsent });
  };

  return (
    <div className="container-fluid login-page">
      <div className="row">
        <main className="col-md-9">
          <header className="login-header">
            <img className="main-logo" src={tudaLogo} alt="Technische Universität Darmstadt" />
            <h1 className="h3 login-title">Identity Provider der Technischen Universität Darmstadt</h1>
          </header>
          
          <section className="login-form">
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="csrf_token" value="_6400de90d158455e83703d984f59ce2d98d3a340" />
              
              <legend className="h5 mb-4">
                Anmelden bei https://moodle.informatik.tu-darmstadt.de
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
          </section>
        </main>
        <Sidebar />
      </div>
    </div>
  );
};

export default LoginPage;
