import React from 'react';
import './Content.css';

const Content = () => {
  return (
    <div className="container" id="hero">
      <section  className="hero-section text-center mb-5">
        <h1>Willkommen bei Hochschulwahl</h1>
        <p className="lead">
          Dein Portal für die Hochschulwahlen. Hier findest du alle Informationen, die du für deine Wahl benötigst.
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
           dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
           It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
           It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
          and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
      </section>
    <div className="container" id="info">
      <section id="info" className="info-section text-center mb-5">
        <h2>Was ist Hochschulwahl?</h2>
        <p>
          Die Hochschulwahl ist die wichtigste Wahl für Studierende. Du kannst über die Vertretung deiner Interessen
          in der Universität entscheiden.
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy 
          text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has 
          survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised
           in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
           and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
           Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy 
           text ever since the 1500s, 
           when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five 
           centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like 
            Aldus PageMaker including versions of Lorem Ipsum.
        </p>
      </section>
      </div>
      <div className='container' id='cta'>
      <section  className="cta-section text-center mb-5">
        <h2>Mach mit bei der Hochschulwahl!</h2>
        <button className="btn btn-primary">Anmelden</button>
      </section>
      </div>
    </div>
  );
};

export default Content;
