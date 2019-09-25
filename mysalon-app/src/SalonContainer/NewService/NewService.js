import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './newservice.css'

class NewService extends Component {
    constructor(){
        super();
        this.state = {
            modal: false,
            serviceName: '',
            description: '',
            price: '',
            duration: ''
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createService(this.state);
        this.toggle();
    }

    render(){
        return(
            <div>
                <Button color="danger" onClick={this.toggle}>Add A New Service</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Lets Add A New Service </ModalHeader>
                <ModalBody className='modalbody'>
                    <form onSubmit={this.handleSubmit}>
                        <h3>Hey, lets add a new Service</h3>
                        <label htmlFor="serviceName">Service Name:</label>
                        <input type="text" name="serviceName" onChange={this.handleChange} />
                        <br />
                        <br />
                        <label htmlFor="description">Description:</label>
                        <textarea name="description" onChange={this.handleChange}></textarea>
                        <br />
                        <br />
                        <label htmlFor="price">Price:</label>
                        <input type="text" name="price" onChange={this.handleChange} />
                        <br />
                        <br />
                        <label htmlFor="duration">Duration of Service:</label>
                        <input type="text" name="duration" onChange={this.handleChange} />
                        <br />
                        <br />
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleSubmit}>Add Service</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default NewService;