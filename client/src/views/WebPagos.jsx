import "chart.js/auto";
import { Line } from "react-chartjs-2";
const WebPagos = () => {
  return (
    <div className="container">
      <div className="py-8 basis-8/12">
        <div className=" flex justify-around ">
          <div className="bordered p-8 px-12 rounded-xl">
            <p className="font-bold">Monto Retirable</p>
            <p className="text-center text-6xl font-bold">686</p>
          </div>
          <div className="bordered p-8 px-12 rounded-xl">
            <p className="font-bold">Pendiente de pago</p>
            <p className="text-center text-6xl font-bold">459</p>
          </div>
        </div>

        <div className=" bordered w-[70%] mx-auto p-2 m-8">
          <div className="chart-container centered lg:h-72 h-96 w-full">
            <Line
              data={{
                labels: [
                  " ",
                  "Enero",
                  "Febrero",
                  "Marzo",
                  "Abril",
                  "Mayo",
                  "Junio",
                ],
                datasets: [
                  {
                    label: "Historial de ventas mensuales",
                    data: [0, 300, 400, 250, 400, 450, 500],
                    backgroundColor: "rgba(83, 245, 166, 0.8)",
                    borderColor: "rgba(83, 245, 166, 0.8)",
                    color: "rgba(83, 245, 166, 0.8)",
                  },
                ],
              }}
            />
          </div>
        </div>

        <div className=" bordered w-[70%] mx-auto p-2 m-8 flex ">
          <div className="flex flex-col basis-1/3">
            <p className="text-center font-bold py-4">Introducir retiro</p>
            <input
              className="border-solid border-2 border-primario p-2 px-3 rounded-md"
              type="number"
            />
          </div>
          <div className="flex flex-col basis-2/3 ">
            <p className="text-center py-4 font-bold">Métodos de pago</p>

            <div className="flex justify-around">
              <button className="font-bold border-solid  border-2 border-primario p-2 px-8 rounded-md ">
                Crypto
              </button>
              <button className="font-bold border-solid  border-2 border-primario p-2 px-8 rounded-md">
                Banco
              </button>
              <button className="font-bold border-solid  border-2 border-primario bg-primario p-2 px-8 rounded-md text-white">
                Solicitar
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* 
      <div className="flex basis-4/12">
        <div>
          <h2 className="text-center text-xl font-bold">
            Historial de retiros
          </h2>
        </div>
      </div> */}
    </div>
  );
};

export default WebPagos;
