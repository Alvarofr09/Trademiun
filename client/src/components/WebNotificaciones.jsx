const WebNotificaciones = ({ nombre, notificacion, foto }) => {
  return (
    <div className="flex justify-start ml-12 2xl:ml-28  ">
      <div className="flex bg-fondoWebApp p-4 max-w-xs rounded-lg mb-2">
        <div className="basis-1/4 self-center">
          <img
            className="inline-block h-12 w-12 rounded-full ring-2 ring-transparent  "
            src={foto}
            alt="avatar"
          />
        </div>
        <div className="basis-3/4">
          <h6 className="font-bold">{nombre}</h6>
          <p>{notificacion}</p>
        </div>
      </div>
    </div>
  );
};

export default WebNotificaciones;
