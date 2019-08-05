import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Clone from '../../Clone'

function Camion505() {
  var c = "505"
  
  const [modalShow, setModalShow] = React.useState(false);
  return (
      <div>
      <Button variant="primary" size="sm" onClick={() => setModalShow(true)}>
        {c}
      </Button>

      <MyVerticallyCenteredModal c={c}
        show={modalShow}
        onHide={() => setModalShow(false)}/>
      </div>
  );
}

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <center><h1>Camion {props.c}</h1></center>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
             <Clone c={props.c}/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}


export default Camion505