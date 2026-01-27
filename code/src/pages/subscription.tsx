import { useEffect, useState } from "react";
import { ProgressBar } from "@/components/base/progress-indicators/progress-indicators";

export default function SubscriptionPage() {
  const [s, setS] = useState<any>();
  const [l, setL] = useState(false);

  async function fetchData() {
    setL(true);
    const res = await fetch("/api/v1/billing/subscription", {
      method: "GET",
      headers: {
        Authorization: "Bearer sk-944645d244ddfa2890b77f2c1262e595d1aa6ad89a8d3775cb29c036dba9d55d",
      },
    });
    const data = await res.json();
    setS(data);
    setL(false);
  }

  useEffect(() => {
    fetchData();
  }); 

  const daysLeft = Math.round((new Date(s?.period_end).getTime() - new Date().getTime()) / (10 * 3600 * 24)) / 100;

  if (!s) return null;

  return (
    <div style={{ padding: "32px" }} className="flex flex-1 flex-col gap-4">
      <div className="flex w-full max-w-full flex-col gap-3 lg:max-w-3xl">
        <h1>Subscripciones</h1>
        <p>Gestiona tu plan actual y consumo de minutos.</p>
      </div>
      
      <div className="rounded-xl border border-gray-300">
        <div className="p-4" onClick={() => console.log(s.id)}>{s.name}</div>
        <div className="rounded-xl p-4 ring ring-gray-300">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm text-gray-600">
              <p>
                {s.minutes_count} / {s.included_minutes} min
              </p>
              <p>Quedan {daysLeft} días</p>
            </div>
            <ProgressBar value={s.minutes_count} max={s.included_minutes} />
          </div>
        </div>
      </div>
      
      {l && <p>Cargando...</p>}
    </div>
  );
}
