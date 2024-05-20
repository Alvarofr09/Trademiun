// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { defaults } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

import { useUserContext } from "../context/UserContext";
import { getUserInfo, getUserSignals, userApi } from "../api/APIRoutes";
import { useParams } from "react-router-dom";
import Signal from "../components/ui/Signal";
import Modal from "../components/Modal";
import GroupForm from "../components/GroupForm/GroupForm";
// import UserForm from "../components/UserForm/UserForm";
// import Img from "../components/ui/CloudinaryImg";

const chartData = [
  { label: "Enero", value: 65 },
  { label: "Febrero", value: -59 },
  { label: "Marzo", value: 80 },
  { label: "Abril", value: -81 },
  { label: "Mayo", value: 56 },
  { label: "Junio", value: -55 },
  { label: "Julio", value: -60 },
  { label: "Agosto", value: 100 },
];

const chartConfig = {
  type: "bar",
  data: {
    labels: chartData.map((data) => data.label),
    datasets: [
      {
        label: "Ganacias",
        data: chartData.map((data) => data.value),
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // Este caso ocurre en la primera renderización, donde no hay área del gráfico todavía
            return null;
          }

          // Crear gradiente
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );

          if (context.raw >= 0) {
            // Gradiente de gris a verde para valores positivos
            gradient.addColorStop(0, "#30BC30"); // Verde
            gradient.addColorStop(1, "#F0F0F0"); // Gris
          } else {
            // Gradiente de gris a rojo para valores negativos
            gradient.addColorStop(0, "#F0F0F0"); // Gris
            gradient.addColorStop(1, "#CF2D2D"); // Rojo
          }

          return gradient;
        },
        borderWidth: 1,
      },
    ],
  },
};

defaults.maintainAspectRatio = false;
defaults.responsive = true;
export default function UserDetails() {
  const { id } = useParams();
  const { user } = useUserContext();
  const [userData, setUserData] = useState(null);
  const [signals, setSignals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  // const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let userDataResponse;
      if (id != user.id) {
        // Si el ID de los parámetros es diferente al ID del usuario logueado, realiza una petición para obtener los datos del usuario correspondiente al ID de los parámetros
        userDataResponse = await userApi.get(`${getUserInfo}/${id}`);
      } else {
        userDataResponse = { data: user }; // Usa los datos del usuario logueado
      }
      setUserData(userDataResponse.data);

      // Obtiene las señales del usuario (ya sea el logueado o el usuario obtenido por ID)
      const signalsResponse = await userApi.get(
        `${getUserSignals}/${userDataResponse.data.id}`
      );
      setSignals(signalsResponse.data);
    }

    fetchData();
  }, [id, user]);

  const showGroupForm = () => {
    setShowModal(true); // Mostrar el modal al activar la función
  };

  const closeModal = () => {
    setShowModal(false); // Cerrar el modal
  };

  return (
    <main className="h-screen centered bg-white">
      {userData && (
        <section className="basis-8/12 border-x-2 gap-11  border-black h-screen user-info centered flex-col ">
          <div className="bordered basis-1/3 centered gap-16 py-5 px-12 w-[90%] mx-auto">
            <div className="user-image basis-1/4">
              <img
                className="avatar-image"
                src={userData.image}
                alt={`Avatar de ${userData.username}`}
              />
            </div>
            <div className="user-details basis-2/4 lg:text-xl text-3xl">
              {!isEdit && (
                <p>
                  <strong>Usuario: </strong>
                  {userData.username}
                </p>
              )}

              <p>
                <strong>Email: </strong>
                {userData.email}
              </p>
              <p>
                <strong>Seguidores: </strong>
                {userData.seguidores}
              </p>
            </div>

            <div className="user-options basis-1/4 centered flex-col gap-4">
              <button
                className="btn-dark"
                onClick={() => alert("Editar Perfil")}
              >
                Editar Perfil
              </button>
              <button className="btn-dark" onClick={showGroupForm}>
                Crear Grupo
              </button>
            </div>
          </div>
          <div className="bordered basis-1/3 w-[90%] mx-auto">
            <div className="chart-container centered lg:h-72 h-96 w-full">
              <Bar data={chartConfig.data} className="h-full w-full" />
            </div>
          </div>
          <div className="bordered basis-1/3 centered gap-6 lg:text-xl text-2xl lg:py-6 lg:px-8 py-16 px-20  w-[90%] mx-auto">
            <ul className="w-1/2">
              <li>
                <strong>Señales: </strong>
                120
              </li>
              <li>
                <strong>Aciertos: </strong>
                80/120
              </li>
              <li>
                <strong>Ganancia promedio: </strong>
                45 pips
              </li>
              <li>
                <strong>Perdida promedio: </strong>6 pips
              </li>
            </ul>
            <ul className="w-1/2">
              <li>
                <strong>Duración promedio: </strong>4 horas
              </li>
              <li>
                <strong>Riesgo promedio: </strong>
                1.6 %
              </li>
              <li>
                <strong>Sesión promedio: </strong>
                Asia
              </li>
              <li>
                <strong>Total rentabilidad: </strong>
                {/* {user.rentabilidad} % */}
                54%
              </li>
            </ul>
          </div>
        </section>
      )}

      <article className="trades centered overflow-y-scroll scrollbar-custom flex-col basis-4/12 h-full  ">
        <div className="basis-1/12 centered h-full mt-10">
          <h2 className="titulo">Ultimos Trades</h2>
        </div>
        <div className="basis-11/12 w-full h-full">
          {signals.length === 0 ? (
            <h3 className="mt-10 text-xl centered">No hay trades</h3>
          ) : (
            signals.map((signal) => {
              return <Signal key={signal.id} signal={signal} />;
            })
          )}
        </div>
      </article>

      {showModal && (
        <Modal closeModal={closeModal} isImg={false} title="Crear Grupo">
          <GroupForm />
        </Modal>
      )}
    </main>
  );
}
