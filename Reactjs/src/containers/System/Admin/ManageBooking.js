import React, { Component } from 'react';
import { connect } from "react-redux";
import  { FormattedMessage } from 'react-intl';
import './ManageBooking.scss';
import * as actions from "../../../store/actions"


class ManageBooking extends Component {
   constructor(props){
       super(props);
       this.state = {
        listBookings: [],
       }
   }

   async componentDidMount() {
    this.props.fetchAllBooking()
  }
 
 

   async componentDidUpdate(prevProps, prevState, snapshot){
       if(prevProps.allBookings !== this.props.allBookings){
           this.setState({
               listBookings: this.props.allBookings
        })
       }
    }
   
   
   
    render() {
       console.log('HOIDANIT CHECK ALL BOOKINGS: ', this.props)
       console.log('HOIDANIT CHECK ALL BOOKINGS STATE: ', this.state)
       let arrBookings = this.state.listBookings
        return (
            <div className="manage-booking-container">
            <div className="m-p-title">
            <label><FormattedMessage id="manage-booking.title" /></label>
            </div>

            <div className="col-12">
            <table id="customers">
            <tbody>    
                <tr>         
                      
                      <th>ID Doctor</th>
                      <th>Status Id</th>
                      <th>ID Patient</th>
                      <th>TIME TYPE</th>
                      <th>DATE</th>
                      <th>ID </th>
                      </tr>  

                      {arrBookings && arrBookings.length > 0 && 
           arrBookings.map((item,index) =>{
                return (  
                <tr key={index}>
                    <td>{item.doctorId}</td>
                    <td>{item.statusId}</td>
                    <td>{item.patientId}</td>
                    <td>{item.date}</td>
                    <td>{item.timeType}</td>
                    <td>{item.id}</td>
                        </tr>  
                        )
                    })    
                }  
            </tbody> 
            </table>
            </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        allBookings: state.admin.allBookings
       
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllBooking: () =>  dispatch(actions.fetchAllBooking()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBooking);
