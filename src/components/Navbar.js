import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../util/mutations";

import Auth from "../util/auth";

const AppNavbar = () => {
  // set modal display state
  // const [showModal, setShowModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [validated] = useState(false);

  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    //TODO: INSERT THE MUTATION HERE
    try {
      const { data } = await addUser({
        variables: {
          username: userFormData.username,
          email: userFormData.email,
          password: userFormData.password,
        },
      });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="h-12 w-screen">
      <form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <input
          onChange={handleInputChange}
          className="w-50 h-full border-2 border-black"
          type='text'
          placeholder='Your username'
          name='username'
          value={userFormData.username}
        ></input>
        <input
          onChange={handleInputChange}
          className="w-50 h-full border-2 border-black"
          type='text'
          placeholder='Your email'
          name='email'
          value={userFormData.email}
        ></input>
        <input
          onChange={handleInputChange}
          className="w-50 h-full border-2 border-black"
          type='text'
          placeholder='Your password'
          name='password'
          value={userFormData.password}
        ></input>
        <button
          disabled={
            !(
              userFormData.username &&
              userFormData.email &&
              userFormData.password
            )
          }
          type="submit"
          variant="success">
          Submit
        </button>
      </form>
    </div>
    // <>
    //   <Navbar bg='dark' variant='dark' expand='lg'>
    //     <Container fluid>
    //       <Navbar.Toggle aria-controls='navbar' />
    //       <Navbar id='navbar'>
    //         <Nav className='ml-auto'>
    //           <Nav.Link as={Link} to='/'>
    //             Search For Books
    //           </Nav.Link>
    //           {/* if user is logged in show saved books and logout */}
    //           {Auth.loggedIn() ? (
    //             <>
    //               <Nav.Link as={Link} to='/saved'>
    //                 See Your Books
    //               </Nav.Link>
    //               <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
    //             </>
    //           ) : (
    //             <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
    //           )}
    //         </Nav>
    //       </Navbar>
    //     </Container>
    //   </Navbar>
    //   {/* set modal data up */}
    //   <Modal
    //     size='lg'
    //     show={showModal}
    //     onHide={() => setShowModal(false)}
    //     aria-labelledby='signup-modal'>
    //     {/* tab container to do either signup or login component */}
    //     <Tab.Container defaultActiveKey='login'>
    //       <Modal.Header closeButton>
    //         <Modal.Title id='signup-modal'>
    //           <Nav variant='pills'>
    //             <Nav.Item>
    //               <Nav.Link eventKey='login'>Login</Nav.Link>
    //             </Nav.Item>
    //             <Nav.Item>
    //               <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
    //             </Nav.Item>
    //           </Nav>
    //         </Modal.Title>
    //       </Modal.Header>
    //       <Modal.Body>
    //         <Tab.Content>
    //           <Tab.Pane eventKey='login'>
    //             <LoginForm handleModalClose={() => setShowModal(false)} />
    //           </Tab.Pane>
    //           <Tab.Pane eventKey='signup'>
    //             <SignUpForm handleModalClose={() => setShowModal(false)} />
    //           </Tab.Pane>
    //         </Tab.Content>
    //       </Modal.Body>
    //     </Tab.Container>
    //   </Modal>
    // </>
  );
};

export default AppNavbar;
