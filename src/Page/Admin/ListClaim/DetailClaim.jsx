import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { BsFillPersonFill } from "react-icons/bs";
import { AdminDefault } from "../AdminDefault";
import { getDetailClaim } from "../../../Hooks/Admin/ItemClaim";
import Loading from "../../Componen/Loading"
import { Link } from "react-router-dom";

const Detail = () => {
  const location = useLocation();
  const { from } = location.state;
  const [comment, setComment] = useState("")
  const [showComment, setShowComment] = useState([]);
  const [image64, setImage64] = useState("")
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(false);
  const routeParams = useParams();
  const itemFoundId = routeParams["id"];
  const [namaTempat, setNamaTempat] = useState("");
  const [tgl, setTgl] = useState("");
  const [tolak, setTolak] = useState(false);
  const idItemClaim = from.id;
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  

  useEffect(()=>{

  },[comment])
  useEffect(()=>{
    const fetchData = async()=>{
      getDetailClaim({id:routeParams["id"]})
      .then((e)=>{
        setItem(e.data);
      })
      .catch((err)=>{
        if(err.response.status ==401){
          navigate("/admin");
        }
      });
    }
    fetchData();
  },[])

  const getComment = async ()=>{
    const token = Cookies.get("token");
    axios
      .get(`${BASE_URL}/Admin/Item-Comment?itemClaimId=${idItemClaim}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "image/jpeg",
        },
      })
      .then((res) => {
        setShowComment(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getComment();
  }, []);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    const data = {
      itemClaimId: idItemClaim,
      value : comment,
      imageBase64 : image64 
  };
  console.log(data)
  const res = await axios.post(`${BASE_URL}/Admin/Item-Comment`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  getComment();
  setComment("");
  setImage64("");
  setImage64("");


  console.log(res)
}

const tolakHandle = async () => {
  if(tolak === ""){
    alert("Data tidak boleh kosong")
    return
  }
  console.log(tolak)
  setLoading(true)
  try {
    const token = Cookies.get('token');
    const response = await axios.post(
      `${BASE_URL}/Admin/Item-Claim/${idItemClaim}/reject`,
      {
        rejectReason: tolak,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('Tolak response:', response.data);
    setLoading(false)

  } catch (error) {
    console.error('Tolak error:', error);

  }
};

const terimaHandle = async () => {
  if(namaTempat === "" || tgl === ""){
    alert("Data tidak boleh kosong")
    return
  }
  console.log(namaTempat, tgl)
  setLoading(true)
  try {
    const token = Cookies.get('token');
    const response = await axios.post(
      `${BASE_URL}/Admin/Item-Claim/${idItemClaim}/approve`,
      {
        claimLocation: namaTempat,
        claimDate: tgl
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('Claim Di teirma', response.data);
    setLoading(false)

  } catch (error) {
    console.error('Tolak error:', error);

  }
};

  return (
    <>
    {loading ? (<Loading />) : (
    <AdminDefault 
    title={"Detail Claim"}
    body={
      <>
          {item==null?<></>:<>
          
          <div className={"row table overflow-hidden min-h-80 "}> 
            <div className="col-md-6">
              <div className="row">
                <div className="col-12">
                  <h6>Detail Barang</h6>
                </div>
              </div>
              <div className="row">
                <div className="col-3">Nama Barang</div>
                <div className="col-9">{item.name}</div>
              </div>
              <div className="row">
                <div className="col-3">Status</div>
                <div className="col-9">{item.status}</div>
              </div>
              <div className="row">
                <div className="col-3">Gambar</div>
                <div className="col-9"><img src={item.image} alt="image item" /></div>
              </div>
            </div>
            <div className="col-md-6">
              <h6>Keterangan Klaim</h6>
              <div className="row">
                <div className="col-3">
                  Nomor Identitas
                </div>
                <div className="col-9">
                  {item.identityNumber}
                </div>
                <div className="col-3">
                  Deskripsi
                </div>
                <div className="col-9">
                  {item.proofDescription}
                </div>
                <div className="col-3">
                  Deskripsi Gambar
                </div>
                <div className="col-9">
                  <img src={item.proofImage}/>
                </div>
              </div>
            </div>
            <div className="col-12 ms-2 card">
              {showComment.length > 0?
              <div>
                
                <h6>Keterangan Tambahan</h6>  
              </div>:<></>}
                {showComment.map((item, index) => {
                  return (
                    <div key={index} className=" border mb-2  w-50">
                      <div className=" ">
                      <span className="fw-bold text-dark">From: {item.userName} ({item.userStatus})</span>
                      <p className="ps-5">{item.value}</p>
                      </div>
                      <div className="float-end   me-2 rounded">
                      {image64 ? (
                        <>
                    <Link
                    className="col-12  text-dark bg-secondary border p-1 rounded text-decoration-none"
                    to={"/admin/ShowImage"}
                    state={{ from: image64  }}>
                    Show image
                  </Link>
                        
                        </>
                      ) : (null)}</div>
                    </div>
                  );
                })}
              </div>

            <div >
              <form onSubmit={handleSubmitComment}>
                <div className="mb-3">
                  <label htmlFor="comment" className="form-label fw-bold text-dark">
                    Keterangan Tambahan
                  </label>
                  <textarea
                    className="form-control"
                    id="comment"
                    rows="3"
                    onChange={(e) => setComment(e.target.value)} required
                  ></textarea>
                </div>

                <div className="d-flex">
                  <input type="file" 
                  className="form-control"
                  onChange={handleFileInputChange} />
                </div>
                <button 
                className="bg-primary text-white float-start ms-2 px-4"
                type="submit"
                >
                  Submit
                </button>
                </form>
            </div>

          </div>
          {item.status === "Confirmation" ? (
            <div className="float-end top"> 
            {/* <button className="btn btn-success me-1 text-white me-5 px-5" onClick={terimaHandle}>Terima</button> */}
            {/* start tombol terima */}
            <button type="button" class="btn btn-success me-1 text-white me-5 px-5" data-bs-toggle="modal" data-bs-target="#Terima">
              Terima
            </button>
            <div class="modal fade" id="Terima" tabindex="-1" aria-labelledby="TerimaLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="TerimaLabel">Terima Item</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    {/* Form filter */}
                    <div className="mb-3">
                      <label htmlFor="namaBarang" className="form-label">Nama Tempat</label>
                      <input required type="text" className="form-control" id="namaBarang" onChange={(e)=>{setNamaTempat(e.target.value)}} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="tgl" className="form-label">Tanggal Ditemukan</label>
                      <input required type="date" className="form-control" id="tgl"  onChange={(e)=>{setTgl(e.target.value)}} />
                    </div>
                    {/* End of Form filter */}
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary text-white" data-bs-dismiss="modal" onClick={terimaHandle}>Terima</button>
                  </div>
                </div>
              </div>
            </div>
            {/* end tombol terima */}
            {/* start tombol tolak */}

            <button type="button" class="btn btn-danger px-5  me-1 text-white" data-bs-toggle="modal" data-bs-target="#Tolak">
              Tolak
            </button>
            <div class="modal fade" id="Tolak" tabindex="-1" aria-labelledby="TolakLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="TolakLabel">Tolak Item</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    {/* Form filter */}
                    <div className="mb-3">
                      <label htmlFor="namaBarang" className="form-label">rejectReason</label>
                      <input required type="text" className="form-control" id="namaBarang" onChange={(e)=>{setTolak(e.target.value)}} />
                    </div>
                    {/* End of Form filter */}
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary text-white" data-bs-dismiss="modal" onClick={tolakHandle}>Tolak</button>
                  </div>
                </div>
              </div>
            </div>
            {/* end tombol tolak */}
            </div>):(null)}
          </>}
            
        </>
      }
    />

  )}
  </>
  );
}
export default Detail;