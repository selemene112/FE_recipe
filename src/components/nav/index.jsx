import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Nav({ firstlink, firstlinkto, secondlink, secondlinkto, thirdlink, thirdlinkto, props }) {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-5 mt-4 gap-5">
            <li className="nav-item">
              <Link className="nav-link" to={firstlinkto}>
                {firstlink}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={secondlinkto}>
                {secondlink}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={thirdlinkto}>
                {thirdlink}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
Nav.propTypes = {
  firstlink: PropTypes.string.isRequired,
  firstlinkto: PropTypes.string.isRequired,
  secondlink: PropTypes.string.isRequired,
  secondlinkto: PropTypes.string.isRequired,
  thirdlink: PropTypes.string.isRequired,
  thirdlinkto: PropTypes.string.isRequired,
  props: PropTypes.string.isRequired,
};
