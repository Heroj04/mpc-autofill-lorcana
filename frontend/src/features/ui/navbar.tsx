import Nav from "react-bootstrap/Nav";
import BSNavbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Image from "next/image";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { ProjectName } from "@/common/constants";
import { BackendConfig } from "@/features/backend/backend";
import { useState } from "react";
import DisableSSR from "@/features/ui/disableSSR";
import { useGetBackendInfoQuery } from "@/app/api";

export default function Navbar() {
  const backendInfoQuery = useGetBackendInfoQuery();

  const [showBackendConfig, setShowBackendConfig] = useState(false);

  const handleCloseBackendConfig = () => {
    setShowBackendConfig(false);
  };
  const handleShowBackendConfig = () => setShowBackendConfig(true);

  const backendURL = useSelector((state: RootState) => state.backend.url);

  return (
    <DisableSSR>
      <BSNavbar
        expand="lg"
        fixed="top"
        variant="dark"
        bg="primary"
        style={{ minHeight: 50 + "px" }}
      >
        <Container
          className="justify-content-center fixed-top align-middle bg-primary"
          style={{ maxWidth: 1200 + "px" }}
        >
          <BSNavbar.Brand href="/" as={Link}>
            <Image src="/logolowres.png" alt="logo" width="40" height="40" />{" "}
            <span className="align-middle">
              <b>{backendInfoQuery.data?.name ?? ProjectName}</b>
            </span>
          </BSNavbar.Brand>
          <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
          <BSNavbar.Collapse
            id="basic-navbar-nav"
            style={{ fontWeight: "bold" }}
          >
            <Nav className="me-auto">
              <Nav.Link as={Link} href="/editor">
                Editor (Temp)
              </Nav.Link>
              <Nav.Link as={Link} href="/guide">
                Guide
              </Nav.Link>
              {backendURL != null && (
                <>
                  <Nav.Link as={Link} href="/new">
                    What&apos;s New?
                  </Nav.Link>
                  <Nav.Link as={Link} href="/contributions">
                    Contributions
                  </Nav.Link>
                </>
              )}
              <Nav.Link
                href="https://github.com/chilli-axe/mpc-autofill/releases"
                target="_blank"
              >
                Download
              </Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <Button variant="secondary" onClick={handleShowBackendConfig}>
                Configure Server
              </Button>
            </Nav>
          </BSNavbar.Collapse>
        </Container>
      </BSNavbar>
      <BackendConfig
        show={showBackendConfig}
        handleClose={handleCloseBackendConfig}
      />
    </DisableSSR>
  );
}
