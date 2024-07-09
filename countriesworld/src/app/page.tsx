"use client";
import Card from "@/components/card";
import { Root2 } from "@/interface/rootInterface";
import { getAllCountrie } from "@/service/countrieService";
import { useEffect, useState } from "react";

export default function App() {
  const [listCountries, setListCountries] = useState<Root2[]>();

  useEffect(() => {
    const get = async () => {
      const rs = await getAllCountrie();
      setListCountries(rs);
    };

    get();
  }, []);

  return (
    <main className="bg-slate-300  ">
      <section className="flex flex-row justify-center gap-8  flex-wrap py-6">
        {listCountries?.map((countrie, index) => {
       
          return (
            <Card
              key={index}
              countrie={countrie.name.common}
              image={countrie.flags.png}
            />
          );
        })}
      </section>
    </main>
  );
}
