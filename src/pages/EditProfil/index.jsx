import React from 'react';

import CustomNavbar from './../../components/nav';

function EditProfile() {
  return (
    <div>
      <CustomNavbar />
      {/* <section className="container w-100 d-flex justify-content-center align-items-center" style={{ paddingTop: '100px' }}>
        <div className="my-5 col-sm-12 col-md-6 col-lg-6">
          <form action="">
            <div className="d-flex flex-column align-items-center">
              <img src="../asset/img/Profil/ProfilNav.svg" alt="" className="w-50" />
              <div className="fw-medium">Change Profile Picture</div>
            </div>
            <label htmlFor="name" className="mt-3 fw-medium">
              Name
            </label>
            <input type="text" id="name" value="Ayudia" className="w-100 p-3 rounded mt-3" />
            <label htmlFor="email" className="mt-3 fw-medium">
              Email
            </label>
            <input type="text" id="email" value="Ayudia@gmail.com" className="w-100 p-3 rounded mt-3" />
            <button className="p-3 rounded border-0 text-white w-100 mt-5 bg-warning">Update Profile</button>
            <p className="mt-3 fw-medium">
              Change Password?{' '}
              <a href="./change-password.html" className="text-warning text-decoration-none">
                Click Here
              </a>
            </p>
          </form>
        </div>
      </section>
      <section id="call-modal">
        <Modal show={false} onHide={() => {}}>
          <Modal.Header closeButton>
            <Modal.Title className="text-warning">You want to logout?</Modal.Title>
          </Modal.Header>
          <Modal.Footer className="border-0">
            <Button className="w-100 bg-warning text-white border-0">Yes</Button>
            <Button className="w-100 bg-secondary-subtle text-white border-0" onClick={() => {}}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </section> */}
    </div>
  );
}

export default EditProfile;
