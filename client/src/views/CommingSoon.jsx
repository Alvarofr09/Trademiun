export default function CommingSoon() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <img
        src="https://www.svgrepo.com/show/426192/cogs-settings.svg"
        alt="Logo"
        className="mb-8 h-40"
      />
      <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-center text-primario dark:text-white mb-4">
        Esta página está en construcción
      </h1>
      <p className="text-center text-tipografia dark:text-gray-300 text-lg md:text-xl lg:text-2xl mb-8">
        Estamos trabajando para mejorar la experiencia del usuario.
      </p>
      <div className="flex space-x-4">
        <a
          href="#"
          className="bg-primario hover:bg-gray-700 text-white font-bold py-3 px-6 rounded dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          Contactar
        </a>
      </div>
    </div>
  );
}
