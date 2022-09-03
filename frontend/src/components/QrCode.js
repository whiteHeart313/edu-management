import React from "react";
import  QRCode from "react-qr-code";


export default function QrCode(){
    const [id,setId]= React.useState("no-studint")
return(
    <QRCode value={id} />
    )
}