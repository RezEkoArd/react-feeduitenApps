import React from 'react';
import Modal from 'react-bootstrap/Modal';

class ModalCreate extends React.Component {
    constructor(){
      super();
      this.state = {
        show : false,
        deskripsi : '',
        nominal: 0,
        tanggal: '',
        category: '',
      }
      
      this.handleClose = this.handleClose.bind(this); 
      this.handleShow = this.handleShow.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.tambahItem = this.tambahItem.bind(this)
    }
  
    handleClose() {
      this.setState({
        show : false
      })
    }
    
    handleShow() {
      this.setState({
        show : true,
        category: this.props.category
      })
    }
  
    handleChange(e){
      this.setState({
        [e.target.name] : e.target.value,
      })
    }
  
    tambahItem(){
      const Data = {
        deskripsi : this.state.deskripsi,
        nominal: parseInt(this.state.nominal),
        tanggal: this.state.tanggal,
        category: this.state.category,
      }
      const fnTambahItem = this.props.action;
      fnTambahItem(Data)
      this.setState({
        show: false,
      })
    }
  
    render(){
      return (
        <>
          <button className={this.props.variant} onClick={this.handleShow}>{this.props.text} <span><i className={this.props.icons}></i></span></button>
    
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{this.props.modalHeading}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3">
                <label className="form-label">Deskripsi</label>
                <input
                 type="text"
                className="form-control" 
                name='deskripsi' 
                placeholder="Masukan Deskripsi" 
                value={this.state.deskripsi}
                onChange={this.handleChange}
                />
              </div>
  
              <div className="mb-3">
                <label className="form-label">Nominal</label>
                <input
                 type="number"
                className="form-control" 
                name='nominal' 
                placeholder="Masukan Nominal" 
                value={this.state.nominal}
                onChange={this.handleChange}
                />
              </div>
  
              <div className="mb-3">
                <label className="form-label">Tanggal</label>
                <input
                 type="date"
                className="form-control" 
                name='tanggal' 
                value={this.state.tanggal}
                onChange={this.handleChange}
                />
              </div>
  
              <div>
                <input
                 type="hidden"
                name='tanggal' 
                value={this.state.category}
                onChange={this.handleChange}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button className={this.props.variant} onClick={this.tambahItem}>
                Save
              </button>
            </Modal.Footer>
          </Modal>
        </>
      )
    }
  }

export default ModalCreate;