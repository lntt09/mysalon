import React, {Component} from 'react';
import ServiceList from "./ServicesList/ServiceList";
import NewService from "./NewService/NewService";
import './saloncontainer.css';

class SalonContainer extends Component{
    constructor(){
        super();
        this.state = {
            services: []
        }
    }
    componentDidMount(){
        console.log('Component is Mounted')
        this.getServices();
    }

    updateService = async (id, formData)=>{
        const updateService = await fetch(`http://localhost:9000/api/v1/services/${id}`, {
            method: "PUT",
            body: JSON.stringify(formData),
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const parsedResponse = await updateService.json();
        if(parsedResponse.status.code === 201){
            this.setState({
                services: formData
            })
            console.log(formData)
        }
        console.log(parsedResponse)
    };

    deleteService = async(id)=>{
        console.log(id);
        try{
            const deleteService = await fetch(`http://localhost:9000/api/v1/services/${id}`, {
                method: "DELETE",
                credentials: "include"
            });
            const parsedResponse = await deleteService.json();
            if(parsedResponse.status.code === 200){
                this.setState({
                    services: this.state.services.filter(service => service._id !== id)
                })
            }
        }
        catch(err){
            console.log(err)
        }
    };

    createService = async(formData) =>{
        console.log(formData);
        try{
            const newService = await fetch('http://localhost:9000/api/v1/services', {
                method: "POST",
                body: JSON.stringify(formData),
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedResponse = await newService.json();
            if(parsedResponse.status.code === 201){
                this.setState({
                    services: [parsedResponse.data, ...this.state.services]
                })
            }
        }
        catch(err){
            console.log(err)
        }
    };

    getServices = async()=>{
        try{
            const services = await fetch('http://localhost:9000/api/v1/services', {
                credentials: "include"
            });
            const parsedResponse = await services.json();
            if(parsedResponse.status.code === 200){
                this.setState({
                    services: parsedResponse.data
                })
            }
        }
        catch(err){
            console.log(err)
        }
    }

    render(){
        return(
            <div>
                <h1 className="sch1">Services We Offer!</h1>
                <ServiceList services={this.state.services} deleteService={this.deleteService} updateService={this.updateService}/>
                <NewService createService={this.createService} />
            </div>
        )
    }
}



export default SalonContainer;