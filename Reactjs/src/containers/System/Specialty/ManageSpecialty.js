import React, { Component } from 'react';
import { connect } from "react-redux";
import  { FormattedMessage } from 'react-intl';
import './ManageSpecialty.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import {CommonUtils} from '../../../utils'
import { createNewSpecialty } from '../../../services/userService';
import {toast} from "react-toastify"
import Select from 'react-select';
import * as actions from "../../../store/actions"

const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageSpecialty extends Component {
   constructor(props){
       super(props);
       this.state = {
          name: '',
          imageBase64: '',
          descriptionHTML: '',
          descriptionMarkdown: '',
          listSpecialty: '',
       }
   }

   async componentDidMount() {
    this.props.fetchAllSpecialty()
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
       if (prevProps.allSpecialties !== this.props.allSpecialties){
        let dataSelect = this.builDataInputSelect(this.props.allSpecialties)
           this.setState({ 
               listSpecialty: dataSelect
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

    handleSaveNewSpecialty = async() => {

        let res = await createNewSpecialty(this.state)
        if(res && res.errCode === 0) {
            toast.success('Add new specialty succeeds!')
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            })
        }else {
            toast.error('Something Wrong , please try again')
        }
       
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption }, () =>
          console.log(`Option selected:`, this.state.selectedOption)
        );
      };
    render() {
        console.log('hoidanit setstate', this.state)
        return (
      <div className="manage-specialty-container">
          <div className="ms-title">Quản lý chuyên khoa </div>

       <div className="add-new-specialty row"> 

     
       <div className="col-6 form-group">
           <label>Tên chuyên khoa </label>
           <input className="form-control" type="text" value={this.state.name}
                onChange={(event)=> this.handleOnchangeInput(event, 'name')}

           />
            </div> 

            <div className="col-6 form-group">
           <label>Ảnh chuyên khoa </label>
           <input className="form-control-file" type="file"
               onChange={(event) =>this.handleOnChangeImage(event)}
           />
            </div>    

            <div className="col-6 form-group">
           <label>Danh sách chuyên khoa </label>
           <Select
                value={this.state.selectedOption}
                onChange={this.handleChange}
                options={this.state.listSpecialty}
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
                onClick={() => this.handleSaveNewSpecialty()}
                >Save</button>
            </div>
      
       </div>

    
      </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        allSpecialties: state.admin.allSpecialties,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllSpecialty: () => dispatch(actions.fetchAllSpecialty())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
