
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (password === 'federico') {
      router.push('/chat');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-4xl font-bold mb-4">Agente Financiero Premium FH</h1>
      <p className="mb-6 text-gray-400">Acceso exclusivo. Ingrese su contraseña para continuar.</p>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        className="px-4 py-2 rounded text-black w-64 mb-4"
      />
      <button onClick={handleLogin} className="bg-white text-black px-6 py-2 rounded hover:bg-gray-300 transition">
        Ingresar
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
