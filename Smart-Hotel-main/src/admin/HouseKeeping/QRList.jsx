import React from "react";
import { QRCodeSVG } from "qrcode.react";
import "./QRList.css";

const rooms = [
  "101", "102", "103", "104", "105", "106",
  "107", "108", "109", "110", "111", "112"
];

export default function QRList() {
  return (
    <div className="qrlist-page">
      <h2>Room QR-List</h2>
      <div className="qrlist-grid">
        {rooms.map(room => (
          <div className="qrlist-card" key={room}>
            <QRCodeSVG value={room} size={160} />
            <div className="qrlist-roomno">Room No.{room}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
