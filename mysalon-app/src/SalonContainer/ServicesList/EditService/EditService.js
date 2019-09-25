import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './editservice.css'

class EditService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      serviceName: props.service.serviceName,
      description: props.service.description,
      price: props.service.price,
      duration: props.service.duration
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleChange = (e)=>{
      this.setState({
          [e.currentTarget.name] : e.currentTarget.value
      })
      console.log(this.state);
  }

  handleSubmit = async(e) => {
      e.preventDefault();
      console.log("read to update");
      const validUpdate = await this.props.updateService(this.props.service._id, this.state)
      if (validUpdate){
        this.toggle();
      }
      
  }

  render() {
    return (
      <div>
        <Button color="info" onClick={this.toggle}>Edit {this.props.service.serviceName}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Editing {this.props.service.serviceName}</ModalHeader>
          <ModalBody className='modalbody'>
            <form onSubmit={this.handleSubmit}>
                Service Name: <input type="text" name="serviceName" onChange={this.handleChange} value={this.props.service.serviceName} /><br/><br/>
                Description: <textarea name="description" onChange={this.handleChange} value={this.props.service.description}></textarea><br/><br/>
                Price: <input type="text" name="price" onChange={this.handleChange} value={this.props.service.price} /><br/><br/>
                Duration: <input type="text" name="duration" onChange={this.handleChange} value={this.props.service.duration} />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit}>Edit Service</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EditService;