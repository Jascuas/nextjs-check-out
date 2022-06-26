import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { BaseLayout } from "@components/layout"
import { fetcher } from "@utils/fetcher";
const axios = require('axios').default;

export default function Summary() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currencies, setCurrencies] = useState(null);
  
    useEffect(() => {
        const query = router.query;
        const amount = query.amount;
        console.log(query)
      if (isLoading) {
            fetcher("/currencies", "GET").then((data) => {
                console.log(data)
                if (data) {
                    console.log(data)
                    setCurrencies(data)
                    setIsLoading(false)
                    setError(null);
                } else {
                    setError("There was an error getting the dates");
                }
  
            })
      }
    }, [isLoading])

    return (
        <>
            <div className="grid grid-cols-2 gap-4 py-40">
                <h2 className=" mb-3 text-base font-bold text-slate-700">Resumen del pedido</h2>
                <h2 className=" mb-3 text-base font-bold text-slate-700">Realizar el pago</h2>
                <div className="rounded-lg shadow-lg bg-slate-100 ">
                    <div className="py-3 px-6 border-b border-gray-300 flex flex-row justify-between font-semibold">
                        <div>
                            Importe:
                        </div>
                        <div>
                            59,06 EUR
                        </div>
                    </div>
                    <div className="py-3 px-6 border-b border-gray-300 flex flex-row justify-between font-semibold text-sm">
                        <div>
                            Moneda seleccionada:
                        </div>
                        <div>
                            BTC
                        </div>
                    </div>
                    <div className="py-3 px-6 border-b border-gray-300 text-sm">
                        <div className="flex flex-row justify-between ">
                            <div className="font-semibold">
                                Comercio:
                            </div>
                            <div>
                                Comercio de pruebas de Semega
                            </div>
                        </div>
                        <div className="flex flex-row justify-between mt-2">
                            <div className="font-semibold">
                                Fecha:
                            </div>
                            <div>
                                21/01/2022 08:52
                            </div>
                        </div>

                    </div>
                    <div className="py-3 px-6 flex flex-row justify-between text-sm">
                        <div className="font-semibold">
                            Concepto:
                        </div>
                        <div>
                            Viajes & Ocio
                        </div>
                    </div>
                </div>
                <select className="w-full h-12 py-3 px-6 rounded-lg shadow-lg bg-slate-100 font-semibold">
                    <option>BTC</option>
                    <option>ETH</option>
                    <option>ADA</option>
                </select>
                {/* <div className="rounded-lg shadow-lg bg-slate-100 text-center">
                    <div className="py-3 px-6">TIMER</div>
                    <div className="my-5 flex space-x-2 justify-center">
                        <button
                            type="button"
                            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                            Pagar con metamask
                        </button>
                    </div>
                    <div className="py-5 text-xs">
                        <div>
                            Enviar 0,0034 BTC
                        </div>
                        <div className="py-3">
                            0x71C7656EC7ab88b098defB751B7401B5f6d8976F
                        </div>
                        <div>
                            Etiqueta de destino: 255716461
                        </div>
                    </div>

                </div> */}
            </div>
        </>
    )
}



Summary.Layout = BaseLayout