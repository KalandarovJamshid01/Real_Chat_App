import "./message.css";

export default function Message({ own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          src="./../../../public/assets/person/1.jpeg"
          alt=""
          className="messageImg"
        />
        <p className="messageText">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur,
        </p>
      </div>
      <div className="messageBottom">1 hour ago</div>
    </div>
  );
}
