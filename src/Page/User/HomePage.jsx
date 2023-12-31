import React from 'react';
import Headers from './Headers';
import '../../Asset/style.css'; 
import Logo from '../../Asset/logo.png';
import Footer from './Footer';

export default function HomePage() {

    const barang = [{
        id : 1,
        img: Logo,
        kategoti : "Elektronik",
        keterangan : "ditemukan tempat duduk bording pesawat",
    },
    {
        id : 2,
        img: Logo,
        kategoti : "Elektronik",
        keterangan : "ditemukan tempat duduk bording pesawat",
    },{
        id : 3,
        img: Logo,
        kategoti : "Elektronik",
        keterangan : "ditemukan tempat duduk bording pesawat",
    },
    {
        id : 4,
        img: Logo,
        kategoti : "Elektronik",
        keterangan : "ditemukan tempat duduk bording pesawat",
    },
]
  return (
    <div>
      <Headers />

      <div className="bgdasboard text-center">
        <h1 className="title text-white pb-5 fw-bold">Temukan <span className="text-warning">Barangmu</span></h1>
        <h5 className="text-white">Cari barangmu yang hilang, Kami akan membantumu mencari barangmu yang <br />hilang dan mengabarikannya ke kamu</h5>

        <button className="buttonTitle bg-warning text-white px-3 rounded border-0 py-2 mt-4 fw-bold" >Cari Barangmu</button>
        

      <div className="cardTitle position-absolute">
          <div className="  cardSection">
            <div class="card" style={{width: "100%"}}>
          <div className="container row">
                <div class="col-6 card-body">
                    <h5 class="card-title">Laporkan Barang hilang</h5>
                    {/* <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
                    <p class="card-text">Anda kehilangan barang? laporakan segera ke petugas kami, kami akan berupaya mencari barang anda.
                    Note : Jika Barang Tidak di temukan pada list barang setelah 1x24 jam, silahkan click di bawah ini</p>
                    <a href="#">disini.</a>
                </div>
                <div class="col-6 card-body">
                    <h5 class="card-title">Cari Barang Hilang</h5>
                    <p class="card-text">Semua informasi barang yang hilang yang telah ditemukan tersedia di dalam web ini. cari barang anda yang hilang di website ini dan klaim kepemilikan barang anda.</p>
                </div>
                </div>
                </div>
               </div>

          </div>
        {/* </div> */}

        <h1 className='text-dark'>jamal</h1>
        <h1>jamal</h1>
      </div>

        <div className="listBarang  ">
            <div className='bgdasboard  '>
            <h1 className=" text-center text-white pb-5 fw-bold pt-3">Penemuan <span className="text-warning">Barang Hilang</span>  Terbaru</h1>
                <div className='d-flex justify-content-center '>
                    {barang.map((item) => {
                        return(
                            <div className="card mx-3 rounded" style={{width: "18rem"}}>
                                <img src={item.img} className='p-5' alt="" />
                                <div className="card-body">
                                    <h5 className="card-title">{item.kategoti}</h5>
                                    <p className="card-text">{item.keterangan}</p>
                                    <a href="#" className="btn btn-primary w-100 text-white fw-bold">Klaim Barang</a>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className='pb-5'>
                    <button className='bg-warning text-white border-0 d-flex justify-content-center mt-3 rounded py-2 px-4 mx-auto'>
                        lihat semua 
                    </button>
                </div>

            </div>
        </div>

        <div className='bg-dark'>
            <Footer />
        </div>
    </div>
  );
}
