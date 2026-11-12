
function About() {
  return (
    <section className="section">
      <div className="page-heading">
        <h1>About ProductExplorer</h1>
        <p>
          A React application developed to demonstrate
          routing and application architecture.
        </p>
      </div>

      <div className="content-card">
        <h2>Project Overview</h2>

        <p>
          ProductExplorer is an educational product
          catalog built with React, React Router
          and the DummyJSON API.
        </p>

        <h2>Technologies</h2>

        <ul>
          <li>React and Vite</li>
          <li>React Router</li>
          <li>JavaScript and CSS</li>
          <li>DummyJSON REST API</li>
        </ul>

        <h2>Project Goals</h2>

        <p>
          The main goal is to practice nested routes,
          dynamic URLs, reusable components,
          API integration, filtering, pagination,
          lazy loading and responsive design.
        </p>
      </div>
    </section>
  );
}

export default About;
