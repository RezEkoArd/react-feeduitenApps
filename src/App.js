import React from 'react';
import './App.css';
import ModalCreate from './components/ModalCreate';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      sisaUang : 0,
      persentaseUang : 0,
      pemasukanUang : 0,
      pengeluaranUang : 0,
      transaksiIN: 0,
      transaksiOUT: 0,
      Summary: [
        // {
        //   deskripsi : 'Menerima Gaji',
        //   tanggal : '1 July 2022',
        //   nominal : 10000,
        //   category : 'IN'
        // },
        // {
        //   deskripsi : 'Makan Nasi Padang',
        //   tanggal : '2 July 2022',
        //   nominal : 10000,
        //   category : 'OUT'
        // }
      ]
    }

    this.tambahItem = this.tambahItem.bind(this)
  }

  tambahItem(objek){
  let newData = [...this.state.Summary, objek]

    let dataUangIN = newData.filter((item) => item.category === 'IN');
    let nominalUang = dataUangIN.map((item) => item.nominal)
    let jumlahUangIN = nominalUang.reduce((jumlah,num) => jumlah + num,0)

    let dataUangOUT = newData.filter((item) => item.category === 'OUT');
    let nominalUangOUT = dataUangOUT.map((item) => item.nominal)
    let jumlahUangOUT = nominalUangOUT.reduce((jumlah,num) => jumlah + num,0)

    this.setState({
      pemasukanUang : jumlahUangIN,
      transaksiIN : nominalUang.length,
      pengeluaranUang : jumlahUangOUT,
      transaksiOUT : nominalUangOUT.length,
      sisaUang : jumlahUangIN - jumlahUangOUT,
      persentaseUang : Math.floor((jumlahUangIN -jumlahUangOUT)/jumlahUangIN * 100),
      Summary : newData,
    })

    // this.setState({
    //   Summary : [...this.state.Summary, objek]
    // })
  }

  funcHitung() {
    let dataUangIN = this.state.Summary.filter((item) => item.category === 'IN');
    let nominalUang = dataUangIN.map((item) => item.nominal)
    let jumlahUangIN = nominalUang.reduce((jumlah,num) => jumlah + num,0)

    let dataUangOUT = this.state.Summary.filter((item) => item.category === 'OUT');
    let nominalUangOUT = dataUangOUT.map((item) => item.nominal)
    let jumlahUangOUT = nominalUangOUT.reduce((jumlah,num) => jumlah + num,0)


    this.setState({
      pemasukanUang : jumlahUangIN,
      transaksiIN : nominalUang.length,
      pengeluaranUang : jumlahUangOUT,
      transaksiOUT : nominalUangOUT.length,
      sisaUang : jumlahUangIN - jumlahUangOUT,
      persentaseUang : Math.floor((jumlahUangIN -jumlahUangOUT)/jumlahUangIN * 100)
    })
  } 

  componentDidMount(){
    this.funcHitung()
  }

  render(){
    return (
      <>
        <div className="container py-5">
          <h1 className='fw-bold text-center'>FEEDUITEN APPS</h1>
          <hr/>
          <div className='row'>
            <div className='col-12 text-center'>
              <h2 className='fw-bold'>Rp. {this.state.sisaUang},-</h2>
              <span className='sub-title-md'>sisa uang kamu tersisah {this.state.persentaseUang}% lagi</span>
            </div>
          </div>

          <div className='row mt-4'>
            <div className='col-6'>
              <div className='card p-4'>
                <div className='icons-wrapper mb-2'>
                <i className="bi bi-wallet2"></i>
                </div>
                <span className='sub-title-sm'>Pemasukan</span>
                <h3 className='fw-bold'>Rp. {this.state.pemasukanUang},- </h3>
                <div>
                <span className='fw-bold text-ungu sub-title-sm'>{this.state.transaksiIN}</span> <span className='sub-title-sm'>transaksi</span>
                </div>
              </div>
            </div>
            
            <div className='col-6'>
              <div className='card p-4'>
                <div className='icons-wrapper mb-2'>
                  <i className="bi bi-cash-stack"></i>
                </div>
                <span className='sub-title-sm'>Pengeluaran</span>
                <h3 className='fw-bold'>Rp.{this.state.pengeluaranUang},- </h3>
                <div>
                <span className='fw-bold text-ungu sub-title-sm'>{this.state.transaksiOUT}</span> <span className='sub-title-sm'>transaksi</span>
                </div>
              </div>
            </div>
          </div>

          <div className='row mt-4'>
            <div className='col-12 justify-content-between d-flex'>
              <h4>Ringkasan transaksi</h4>
               <div className='wrapper-button d-flex '>
                <ModalCreate action={this.tambahItem} category="IN" variant='button btn-ungu px-3 py-2 me-2' text="Pemasukan" icons="bi bi-plus-circle" modalHeading="Tambahkan Pemasukan"/> 
                <ModalCreate action={this.tambahItem} category="OUT" variant='button btn-pink px-3 py-2' text="Pengeluaran" icons="bi bi-plus-circle" modalHeading="Tambahkan Pengeluaran"/> 
               </div>
            </div>
          </div>

          <div className='row mt-5'> 
            {this.state.Summary < 1 ? <Alert/> : this.state.Summary.map((value,index)=> {
              return (
                <div className='col-12 justify-content-between align-items-center d-flex mb-2' key={index}>
                  <div className='d-flex align-items-center'> 
                    <div className={value.category === "IN" ? "icons-wrapper-in" : "icons-wrapper-out"}>
                      {value.category === "IN" ? 
                      <i className="bi bi-wallet2"></i> :
                      <i className="bi bi-bag-dash"></i>                  
                      }
                    </div>
                    <div className='transaction d-block ms-3 d-flex flex-column'>
                      <h6>{value.deskripsi}</h6>
                      <span className='sub-title-sm'>{value.tanggal}</span>
                    </div>
                  </div>
                  <h6 className={value.category === "IN" ? "text-money-in" : "text-money-out"}>Rp. {value.nominal}</h6>
                </div>
              )
            })}
          </div>
        </div>
      </>
    )
  }
}

class Alert extends React.Component{
  // constructor(){
  //   super();
  // }

  render(){
    return(
      <h6>Data Masih Kosong</h6>
    )
  }
}

export default App;
