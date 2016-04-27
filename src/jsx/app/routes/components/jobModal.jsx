import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';


export default class JobModal extends React.Component {
  render() {
    const modalStyles = {
      zIndex: 10000000,
      position: 'absolute',
    }

    const pushedDown = {
      'margin-top':'150px;'
    }
    return (
      <div style={modalStyles} >
        <Modal  style={pushedDown} isOpen={this.props.isOpen} onRequestHide={this.props.hideModal}>
          <ModalHeader>
            <ModalClose onClick={this.props.hideModal}/>
            <ModalTitle>Modal title</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p>Ab ea ipsam iure perferendis! Ad debitis dolore excepturi
              explicabo hic incidunt placeat quasi repellendus soluta,
              vero. Autem delectus est laborum minus modi molestias
              natus provident, quidem rerum sint, voluptas!</p>
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-default' onClick={this.props.hideModal}>
              Close
            </button>
            <button className='btn btn-primary'>
              Save changes
            </button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}