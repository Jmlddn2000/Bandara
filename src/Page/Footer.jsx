import React from "react";
import logo from "../../Asset/image 2.png";
import {BsTelephone, BsPeople} from 'react-icons/bs'

export default function Footer() {
  return (
<div className="py-5">
  <div className="row">
    <div className="col-12 col-md-5 align-self-center">
      <img src={logo} className="mx-auto d-block" alt="" />
    </div>
    <div className="col-12 col-md-3 mt-4 mt-md-0">
      <h3 className="text-white">Kontak Kami</h3>
      <br />
      <br />
      <p className="text-white">
        JL. Marsma. R. Iswahyudi,<br /> Sepinggan Balikpapan Selatan Balikpapan,<br />
        76115 Kalimantan Timur - Indonesia
      </p>

      <p className="text-white">
        Telpon : +62 (0) 542 7577000
        <br />
        Fax    : +62 (0) 542 766832
      </p>

      <p className="text-white">
        Copyright © 2023 PT Angkasa Pura I. All Rights Reserved.
      </p>
    </div>
    <div className="col-6 col-md-2 mt-4 mt-md-0">
      <div className=" mx-auto d-block">
        <BsTelephone size={50} className="text-white" />
        <p className="text-white ">HOTLINE KAMI <br />172</p>
        
      </div>
    </div>
    <div className="col-6 col-md-2 mt-4 mt-md-0">
      <div className=" mx-auto d-block">
        <BsPeople size={50} className="text-white" />
        <div>
        <p className="text-white ">KIRIM MASUKKAN <br /> cc172@ap1.co.id</p>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}