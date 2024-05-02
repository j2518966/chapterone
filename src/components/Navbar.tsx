// import React from 'react';
import { Navbar as BootstrapNavbar, Container, Nav } from 'react-bootstrap';

const Navbar = () => {
    return (
        <BootstrapNavbar style={{position: "sticky"}} bg="dark" expand="lg" fixed="top" data-bs-theme="dark">
            <Container fluid>
                <BootstrapNavbar.Brand href="#">ChapterOne</BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BootstrapNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* Add Nav.Link components here for additional links in your navbar */}
                    </Nav>
                    <Nav className="ml-auto">
                        <Nav.Link href="/logout">Logout</Nav.Link>
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
};

export default Navbar;