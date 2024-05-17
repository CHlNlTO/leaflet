"use client";

import { useEffect, useState } from "react";

export interface Data {
  message: string;
}

export default function Home() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    console.log("Fetching data...");
    fetch("http://127.0.0.1:5000/api/data")
      .then((response) => response.json())
      .then((data: Data) => setData(data))
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <div>
      <h1>Next.js and Flask</h1>
      {data ? <p>{data.message}</p> : <p>Loading...</p>}
    </div>
  );
}
