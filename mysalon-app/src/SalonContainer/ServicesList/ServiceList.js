import React from 'react';
import EditService from './EditService/EditService';
import './servicelist.css'

function ServiceList(props){
    const services = props.services.map(function(service){
        return(
            <li key={service._id}>
                <h3 className="desc">{service.serviceName}</h3>
                <p className="pdesc">
                    {service.description} <br />
                    Cost: ${service.price} <br />
                    Length of Service: {service.duration} mins
                </p>
                
                <EditService service={service} updateService={props.updateService}/>
                <button type="btn" class="btn btn-outline-danger btn-sm"onClick={()=>{
                    props.deleteService(service._id)
                }}>Delete</button>
            </li>
        )
    })
    return(
        <div>
            {services}
        </div>
    )
}

export default ServiceList;