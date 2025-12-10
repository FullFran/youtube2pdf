import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad | YouTube2PDF",
  description: "Política de privacidad de YouTube2PDF. Conoce cómo protegemos tus datos.",
};

const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen bg-slate-950">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
          Volver al inicio
        </Link>

        <article className="prose prose-invert prose-purple max-w-none">
          <h1 className="text-4xl font-bold text-white mb-2">
            Política de Privacidad de YouTube2PDF
          </h1>
          <p className="text-gray-400 text-sm mb-8">
            Última actualización: 10 de diciembre de 2025
          </p>

          <p className="text-gray-300 text-lg mb-8">
            Bienvenido a <strong className="text-white">YouTube2PDF</strong>. Respetamos su privacidad y protegemos sus datos.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">1. Información que recopilamos</h2>
            <p className="text-gray-300 mb-4">Al usar nuestra aplicación, podemos recopilar:</p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>Su <strong className="text-white">nombre y correo electrónico</strong>, si inicia sesión con <strong className="text-white">Google OAuth</strong>.</li>
              <li>Datos técnicos como dirección IP y tipo de navegador.</li>
              <li>Información de uso sobre las conversiones realizadas.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">2. Cómo usamos su información</h2>
            <p className="text-gray-300 mb-4">Usamos sus datos para:</p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>Permitir el acceso mediante <strong className="text-white">Google OAuth</strong>.</li>
              <li>Convertir videos de <strong className="text-white">YouTube a PDF</strong>.</li>
              <li>Mejorar nuestros servicios y cumplir con requisitos legales.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">3. Google OAuth y API de YouTube</h2>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>Solo accedemos a su <strong className="text-white">correo electrónico y nombre</strong>, si otorga permisos.</li>
              <li>No almacenamos ni compartimos datos obtenidos de <strong className="text-white">YouTube</strong>.</li>
              <li>
                Cumplimos con las <strong className="text-white">políticas de Google</strong> (
                <a 
                  href="https://developers.google.com/terms/api-services-user-data-policy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 underline"
                >
                  ver aquí
                </a>).
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">4. Compartición de datos</h2>
            <p className="text-gray-300 mb-4">No compartimos su información con terceros, excepto cuando:</p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>Es necesario para el funcionamiento del servicio.</li>
              <li>Lo exige la ley.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">5. Seguridad de la información</h2>
            <p className="text-gray-300">
              Protegemos sus datos con medidas de seguridad técnicas y organizativas apropiadas, 
              pero ningún sistema es 100% seguro.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">6. Sus derechos</h2>
            <p className="text-gray-300 mb-4">Puede:</p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li><strong className="text-white">Acceder, modificar o eliminar</strong> su información.</li>
              <li>
                <strong className="text-white">Revocar el acceso</strong> a su cuenta en Google (
                <a 
                  href="https://myaccount.google.com/permissions" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 underline"
                >
                  aquí
                </a>).
              </li>
            </ul>
            <p className="text-gray-300 mt-4">
              Para consultas, contáctenos en{" "}
              <a 
                href="mailto:contacto@youtube2pdf.com" 
                className="text-purple-400 hover:text-purple-300 underline"
              >
                contacto@youtube2pdf.com
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">7. Cambios en esta política</h2>
            <p className="text-gray-300">
              Podemos actualizar esta política y notificaremos cualquier cambio importante 
              a través de nuestra plataforma o por correo electrónico.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
