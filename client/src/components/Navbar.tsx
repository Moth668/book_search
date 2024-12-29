import { useState } from "react"; // Import useState hook from React
import { Link } from "react-router-dom"; // Import Link component from React Router
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap"; // Import Navbar, Nav, Container, Modal, and Tab components from React Bootstrap
import SignUpForm from "./SignupForm"; // Import SignUpForm component
import LoginForm from "./LoginForm"; // Import LoginForm component

import Auth from "../utils/auth"; // Import Auth utility

const AppNavbar = () => {
  // Define AppNavbar component
  // set modal display state
  const [showModal, setShowModal] = useState(false); // Define showModal and setShowModal with useState

  return (
    // Return the following JSX
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        {" "}
        {/* Render a Navbar component with dark background and dark variant */}
        <Container fluid>
          {" "}
          {/* Render a fluid Container */}
          <Navbar.Brand as={Link} to="/">
            {" "}
            {/* Render a Navbar.Brand as a Link to the home page */}
            Google Books Search {/* Display the app title */}
          </Navbar.Brand>{" "}
          {/* End of Navbar.Brand */}
          <Navbar.Toggle aria-controls="navbar" />{" "}
          {/* Render a Navbar.Toggle component with aria-controls attribute */}
          <Navbar.Collapse id="navbar" className="d-flex flex-row-reverse">
            {" "}
            {/* Render a Navbar.Collapse component with flex-row-reverse class */}
            <Nav className="ml-auto d-flex">
              {" "}
              {/* Render a Nav component with ml-auto and d-flex classes */}
              <Nav.Link as={Link} to="/">
                {" "}
                {/* Render a Nav.Link as a Link to the home page */}
                Search For Books {/* Display the search link */}
              </Nav.Link>{" "}
              {/* End of Nav.Link */}
              {/* if user is logged in show saved books and logout */}
              {Auth.loggedIn() ? ( // Check if the user is logged in
                <>
                  <Nav.Link as={Link} to="/saved">
                    {" "}
                    {/* Render a Nav.Link as a Link to the saved books page */}
                    See Your Books {/* Display the saved books link */}
                  </Nav.Link>{" "}
                  {/* End of Nav.Link */}
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>{" "}
                  {/* Render a Nav.Link with an onClick event handler to log the user out */}
                </> // End of conditional rendering
              ) : (
                // If the user is not logged in
                <Nav.Link onClick={() => setShowModal(true)}>
                  Login/Sign Up
                </Nav.Link> // Render a Nav.Link with an onClick event handler to show the modal
              )}{" "}
              {/* End of conditional rendering */}
            </Nav>{" "}
            {/* End of Nav */}
          </Navbar.Collapse>{" "}
          {/* End of Navbar.Collapse */}
        </Container>{" "}
        {/* End of Container */}
      </Navbar>{" "}
      {/* End of Navbar */}
      {/* set modal data up */}
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        {" "}
        {/* Render a Modal component with large size, show, onHide, and aria-labelledby attributes */}
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey="login">
          {" "}
          {/* Render a Tab.Container with defaultActiveKey attribute */}
          <Modal.Header closeButton>
            {" "}
            {/* Render a Modal.Header with closeButton */}
            <Modal.Title id="signup-modal">
              {" "}
              {/* Render a Modal.Title with id */}
              <Nav variant="pills">
                {" "}
                {/* Render a Nav component with variant attribute */}
                <Nav.Item>
                  {" "}
                  {/* Render a Nav.Item */}
                  <Nav.Link eventKey="login">Login</Nav.Link>{" "}
                  {/* Render a Nav.Link with eventKey attribute */}
                </Nav.Item>{" "}
                {/* End of Nav.Item */}
                <Nav.Item>
                  {" "}
                  {/* Render a Nav.Item */}
                  <Nav.Link eventKey="signup">Sign Up</Nav.Link>{" "}
                  {/* Render a Nav.Link with eventKey attribute */}
                </Nav.Item>{" "}
                {/* End of Nav.Item */}
              </Nav>{" "}
              {/* End of Nav */}
            </Modal.Title>{" "}
            {/* End of Modal.Title */}
          </Modal.Header>{" "}
          {/* End of Modal.Header */}
          <Modal.Body>
            {" "}
            {/* Render a Modal.Body */}
            <Tab.Content>
              {" "}
              {/* Render a Tab.Content */}
              <Tab.Pane eventKey="login">
                {" "}
                {/* Render a Tab.Pane with eventKey attribute */}
                <LoginForm handleModalClose={() => setShowModal(false)} />{" "}
                {/* Render a LoginForm component */}
              </Tab.Pane>{" "}
              {/* End of Tab.Pane */}
              <Tab.Pane eventKey="signup">
                {" "}
                {/* Render a Tab.Pane with eventKey attribute */}
                <SignUpForm handleModalClose={() => setShowModal(false)} />{" "}
                {/* Render a SignUpForm component */}
              </Tab.Pane>{" "}
              {/* End of Tab.Pane */}
            </Tab.Content>{" "}
            {/* End of Tab.Content */}
          </Modal.Body>{" "}
          {/* End of Modal.Body */}
        </Tab.Container>{" "}
        {/* End of Tab.Container */}
      </Modal>{" "}
      {/* End of Modal */}
    </> // End of fragment
  ); // End of return statement
}; // End of AppNavbar component

export default AppNavbar; // Export AppNavbar component
