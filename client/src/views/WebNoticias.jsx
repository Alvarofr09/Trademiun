import SideBar from "../components/SideBar";

const WebNoticias = () => {
  return (
    <div className="flex">
      <div className="basis-2/12">
        <SideBar />
      </div>
      <div className="basis-6/12 px-24 flex flex-col ">
        <>
          <h1 className="text-center text-3xl font-bold py-8">Noticias</h1>
          <iframe
            className="w-full"
            src="https://sslecal2.investing.com?columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous&features=datepicker,timezone&countries=25,32,6,37,72,22,17,39,14,10,35,43,56,36,110,11,26,12,4,5&calType=week&timeZone=58&lang=1"
            width={650}
            // 650
            height={650}
          />
        </>
      </div>

      <div className="basis-4/12 py-8 mx-auto pr-8 "></div>
    </div>
  );
};

export default WebNoticias;
