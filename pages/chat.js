
import { useState } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Bienvenido/a. Soy su asistente personal de inversiones, gestión patrimonial y productividad. Para diseñar su plan personalizado, por favor indíqueme:

1. ¿Cuál es su objetivo principal?
2. ¿Cuál es su capital disponible inicial?
3. ¿Qué horizonte de tiempo maneja para sus inversiones?
4. ¿Qué nivel de riesgo está dispuesto a asumir?
5. ¿Qué tipos de instrumentos le interesan?
6. ¿Desea estructurar su organización personal diaria/semanal?
7. ¿Cuál es su edad actual?
8. ¿Qué nivel de conocimiento financiero considera tener?` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const updatedMessages = [...messages, { role: 'user', content: input }];
    setMessages(updatedMessages);
    setLoading(true);

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: updatedMessages })
    });
    const data = await response.json();
    setMessages([...updatedMessages, { role: 'assistant', content: data.result }]);
    setInput('');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Asistente Financiero</h1>
      <div className="w-full max-w-2xl border rounded bg-white p-4 mb-4 space-y-2 overflow-y-auto max-h-[70vh]">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
            <p className="inline-block p-2 rounded bg-gray-200">{msg.content}</p>
          </div>
        ))}
        {loading && <p className="text-gray-400">Pensando...</p>}
      </div>
      <div className="flex w-full max-w-2xl">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-grow px-4 py-2 border rounded-l"
          placeholder="Escriba su mensaje..."
        />
        <button onClick={sendMessage} className="bg-black text-white px-4 py-2 rounded-r hover:bg-gray-800">Enviar</button>
      </div>
      <p className="text-xs text-gray-500 mt-4">
        Asistencia educativa y estratégica. No constituye asesoría financiera personalizada.
      </p>
    </div>
  );
}
