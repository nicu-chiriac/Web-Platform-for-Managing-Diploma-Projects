import React from "react";
import './../../components/styles/landingPage.css';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";


const LandingPage = () => {
  
  const particlesInit = async (main) => {
    console.log(main);

    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };

  return (
    <div className="landing-page">
      <div className="tsparticles">
        <Particles
        className="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          psLimit: 30,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 800,
                duration: 2,
                opacity: 0.005,
                size: 40,
              },
              push: {
                quantity: 1,
              },
              repulse: {
                distance: 25,
                duration: 1,
              },
            },
          },
          particles: {
            color: {
              value: "#ACCBE9",
            },
            links: {
              color: "#DEEDF9",
              distance: 80,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 0.5,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 500,
              },
              value: 20,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 5,
            },
          },
          detectRetina: true,

      }}
      />
      </div>
      <img className="connection-img" src="/connection.png" alt="connection hands" />
      <img className="circuit-abstract" src="/circuitabstract.png" alt="circuit abstract" />
      <h1 className="heading-landing-page">Platformă pentru administrarea <br/> temelor de licență</h1>
      <div className="bottom-items">
        <img className="politehnica-logo" src="/politehnica_logo.png" alt="Politehnica logo" />
        <img className="fiir-logo" src="/FIIR_logo.png" alt="FIIR logo" />
        <img className="tcm-logo" src="/tcm_logo.png" alt="TCM logo" />
        <h2 className="footer">Facultatea de Inginerie Industrială și Robotică <br/> Departamentul Tehnologia Construcțiilor de Mașini </h2>
      </div>
      
      
    </div>
    
  )
}

export default LandingPage