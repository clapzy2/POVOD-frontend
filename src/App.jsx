import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function App() {
  const [ping, setPing] = useState(null);
  const [health, setHealth] = useState(null);
  const [dbTime, setDbTime] = useState(null);
  const [error, setError] = useState(null);

  async function loadBackendStatus() {
    try {
      setError(null);

      const [pingResponse, healthResponse] = await Promise.all([
        fetch(`${API_URL}/api/ping`),
        fetch(`${API_URL}/health`),
      ]);

      const pingData = await pingResponse.json();
      const healthData = await healthResponse.json();

      setPing(pingData);
      setHealth(healthData);

      if (healthData.database_enabled) {
        const dbResponse = await fetch(`${API_URL}/api/db/time`);
        const dbData = await dbResponse.json();
        setDbTime(dbData);
      } else {
        setDbTime(null);
      }
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadBackendStatus();
  }, []);

  return (
    <div style={{ fontFamily: "system-ui", padding: "2rem" }}>
      <h1>Hackathon Frontend</h1>

      <p>Если вы это видите — CI/CD и деплой работают.</p>
      <p>Ниже минимальная проверка связи frontend с backend.</p>

      <button onClick={loadBackendStatus}>
        Проверить backend ещё раз
      </button>

      <h2>Backend URL</h2>
      <pre>{API_URL}</pre>

      <h2>/api/ping</h2>
      <pre>{ping ? JSON.stringify(ping, null, 2) : "Загрузка..."}</pre>

      <h2>/health</h2>
      <pre>{health ? JSON.stringify(health, null, 2) : "Загрузка..."}</pre>

      <h2>/api/db/time</h2>
      <pre>
        {dbTime
          ? JSON.stringify(dbTime, null, 2)
          : "БД выключена или не проверялась"}
      </pre>

      {error && (
        <>
          <h2>Ошибка</h2>
          <pre style={{ color: "crimson" }}>{error}</pre>
        </>
      )}
    </div>
  );
}

export default App;
