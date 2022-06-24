import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageClinic.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import {CommonUtils} from '../../../utils'
import { createNewClinic } from '../../../services/userService';
import {toast} from "react-toastify"
import Select from 'react-select';
import * as actions from "../../../store/actions"
import { getAllDetailClinicById} from '../../../services/userService'

const mdParser = new MarkdownIt(/* Markdown-it options */);



class ManageClinic extends Component {
   constructor(props){
       super(props);
       this.state = {
          name: '',
          address: '',
          imageBase64: '',
          listClinics: [],
          descriptionHTML: '',
          descriptionMarkdown: '',
          selectedOption: '',
       }
   }

   async componentDidMount() {
     this.props.fetchAllClinics()
     this.props.fetchAllDetailClinicById()
  }
 
    builDataInputSelect = (inputData) => {
        let result = [];
        if(inputData && inputData.length > 0) {
            inputData.map((item, index) => {
               let object = {}
               object.label = item.name;
               object.value = item.id;
               result.push(object)
            })
        }

        return result;
    }

   async componentDidUpdate(prevProps, prevState, snapshot){
         if(prevProps.allClinics !== this.props.allClinics){
             let dataSelect = this.builDataInputSelect(this.props.allClinics)
             this.setState({
                listClinics: dataSelect
             })    
            
         }
    }
   
   
    handleOnchangeInput = (event, id) => {
        let stateCopy = {...this.state}
        stateCopy[id]=event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleEditorChange = ({html , text}) => {
      this.setState({
          descriptionHTML: html, 
          descriptionMarkdown: text,
      })
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file){
            let base64 = await CommonUtils.getBase64(file)
           
            this.setState({
                imageBase64: base64
            })
           
        }
        
        
    }

    handleSaveNewClinic = async() => {

        let res = await createNewClinic(this.state)
        if(res && res.errCode === 0) {
            toast.success('Add new clinic succeeds!')
            this.setState({
                name: '',
                imageBase64: '',
                address: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            })
        }else {
            toast.error('Something Wrong , please try again')
        }
       
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption }, () =>
          console.log(`Option selected:`, selectedOption)
        );
      };

     
    render() {
        console.log('hoidanit channel: ', this.state)
        return (
      <div className="manage-specialty-container">
          <div className="ms-title">Quản lý phòng khám </div>

       <div className="add-new-specialty row"> 

     
       <div className="col-6 form-group">
           <label>Tên phòng khám  </label>
           <input className="form-control" type="text" 
                onChange={(event)=> this.handleOnchangeInput(event, 'name')}
                value={this.state.name}

           />
            </div> 

            <div className="col-6 form-group">
           <label>Ảnh phòng khám  </label>
           <input className="form-control-file" type="file"
               onChange={(event) =>this.handleOnChangeImage(event)}
           />
            </div>    

            <div className="col-6 form-group">
            <label>Địa chỉ  phòng khám  </label>
            <input className="form-control" type="text" 
                onChange={(event)=> this.handleOnchangeInput(event, 'address')}
                value={this.state.address}
           />
            </div>

            <div className="col-6 form-group">
            <label>Danh sách phòng khám</label>
            <Select
                value={this.state.selectedOption}
                onChange={this.handleChange}
                options={this.state.listClinics}
            />
           
            </div>

            <div className="col-12">
            
                <MdEditor 
                style={{ height: '300px' }} 
                renderHTML={text => mdParser.render(text)} 
               onChange={this.handleEditorChange} 
               value={this.state.descriptionMarkdown}
                />

            </div>

            <div className="col-12">
                <button className="btn-save-specialty"
                onClick={() => this.handleSaveNewClinic()}
                >Save</button>
            </div>
      
       </div>

    
      </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        allClinics: state.admin.allClinics,
        allDetailClinicById: state.admin.allDetailClinics
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllClinics: () => dispatch(actions.fetchAllClinics()),
        fetchAllDetailClinicById: () => dispatch(actions.fetchAllDetailClinicById)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
