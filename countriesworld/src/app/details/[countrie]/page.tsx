"use client";
import { IoMdArrowRoundBack } from "react-icons/io";
import { GiModernCity } from "react-icons/gi";
import { RiRoadMapFill } from "react-icons/ri";
import { PiUsersFourFill } from "react-icons/pi";
import DetailCountrie from "@/components/detailCountrie";
import Card from "@/components/card";
import { useSearchParams } from "next/navigation";
import { getAllBorders, getBordersCountries } from "@/service/countrieService";
import { useEffect, useState } from "react";
import { Root2 } from "@/interface/rootInterface";
import Link from "next/link";

const Details = ({ params }: { params: { countrie: string } }) => {
  const [countrieBorders, setCountriesBorders] = useState<Root2[]>();
  const [infoCountrie, setInfoCountrie] = useState<Root2>();

  /**
   * Recupera paises que são vizinhos de fronteiras
   */
  const getBorders = async () => {

    const rs = await getBordersCountries(params.countrie);
    const borders = await getAllBorders(rs[0].borders);

    setInfoCountrie(rs[0]);
    setCountriesBorders(borders);
  };

  /**
   * Recupera o parametro flag(bandeira)
   * @returns
   */
  const flag = () => {
    const searchParams = useSearchParams();
    const flag = searchParams.get("flag");

    return flag;
  };

  useEffect(() => {
    (async () => {
      await getBorders();
    })();
  }, []);

  return (
    <section className="bg-slate-300 h-full lg:px-40 md:px-28">
      <div>
        <h3 className="text-center font-bold text-[54px] py-4">
          {params.countrie}
        </h3>
      </div>

      <div>
        <Link href={"/"} className=" flex flex-row items-center py-4">
          <IoMdArrowRoundBack size={20} color="blue" />
          <span>Voltar</span>
        </Link>
      </div>

      <aside className="flex justify-center">
        <div className=" md:flex flex-row px-8 items-center justify-center gap-48 bg-slate-50 w-full  py-8 rounded-2xl ">
          <div>
            <DetailCountrie
              value={infoCountrie?.capital[0] || "sem informação"}
              icon={<GiModernCity size={14} color="blue" />}
              field="Capital"
            />
            <DetailCountrie
              value={infoCountrie?.subregion || "sem informação"}
              icon={<RiRoadMapFill size={14} color="blue" />}
              field="Continente"
            />
            <DetailCountrie
              value={infoCountrie?.population.toString() || "0"}
              icon={<PiUsersFourFill size={14} color="blue" />}
              field="População"
            />
          </div>

          <div className="md:w-[250px] w-full pt-2">
            <img
              className="h-max rounded-xl"
              src={`${flag()}`}
              alt="bandeira"
            />
          </div>
        </div>
      </aside>

      <aside className="py-5 my-4">
        <p className="text-xl">Paises que fazem fronteira</p>

        <div>
          <section className="flex flex-row  gap-8  flex-wrap my-6 ">
            {countrieBorders?.length != 0 ? (
              countrieBorders?.map((item) => {
                return (
                  <Card
                    image={item.flags.png}
                    countrie={item.name.common}
                    key={item.cca3}
                  />
                );
              })
            ) : (
              <span>Nenhum Pais de referencia</span>
            )}
          </section>
        </div>
      </aside>
    </section>
  );
};

export default Details;
