/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

function TransparentFooter() {
  return (
    <footer className="footer">
      <Container>
        <nav>
          <ul>
            <li>
              <a
                href="/"
                target="_blank"
              >
                Student Login
              </a>
            </li>
            <li>
              <a
                href="/staff"
                target="_blank"
              >
                Staff Login
              </a>
            </li>
            <li>
              <a
                href="/register"
                target="_blank"
              >
                Student Sign Up
              </a>
            </li>
            <li>
              <a
                href="/registerstaff"
                target="_blank"
              >
                Staff Sign Up
              </a>
            </li>
        
          </ul>
        </nav>
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}, Designed by{" "}
          GIANTIO INC
          .
        </div>
      </Container>
    </footer>
  );
}

export default TransparentFooter;
