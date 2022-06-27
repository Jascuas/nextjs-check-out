import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { BaseLayout } from "@components/layout"
import { Button } from "@components/common";
import { fetcher } from "@utils/fetcher";
import { useWeb3 } from '../hooks/useWeb3'

export default function Summary() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currencies, setCurrencies] = useState(null);
    const [order, setOrder] = useState(null)
    const [orderCreated, setOrderCreated] = useState(null)
    const { web3, ethers, account, connect } = useWeb3();
    console.log(account)
    useEffect(() => {
        const query = router.query;
        setOrder(query)
        if (isLoading) {
            fetcher("/currencies", "GET").then((data) => {
                if (data) {
                    setCurrencies(data)
                    setIsLoading(false)
                    setError(null);
                } else {
                    setError("There was an error getting the currencies");
                    console.log("ERROR GET")
                }

            })
        }
    }, [isLoading])

    function getCurrency(value) {
        let obj = order;
        obj = { ...obj, "currency": value }
        setOrder(obj)
    }

    function sendOrder() {
        let body = { expected_output_amount: order.amount, input_currency: "ETH_TEST", notes: order.concept }

        console.log(body)
        setOrderCreated({ identifier: "cc80e0b5-f779-4094-be65-fcee4b5bd041", reference: "", address: "0x619e5218354Ec8A29C17B958421a4DBe179b22cA", input_currency: "RopstenETH", expected_input_amount: "0.065" })

        // fetcher("/orders", "POST", body).then((data) => {
        //     if (data) {
        //         console.log(data)
        //         setOrderCreated(data)

        //     } else {
        //         setError("There was an error posting the order");
        //         console.log("ERROR POST")
        //     }

        // })
    }

    async function sendTrx() {
        const signer = web3.getSigner();
        const transactionHash = await signer.sendTransaction({
            to: orderCreated.address,
            value: ethers.utils.parseEther(orderCreated.expected_input_amount)
        })
        console.log('transactionHash is ' + transactionHash);
    }

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
                            {order?.amount} EUR
                        </div>
                    </div>

                    {order?.currency &&
                        < div className="py-3 px-6 border-b border-gray-300 flex flex-row justify-between font-semibold text-sm">
                            <div>
                                Moneda seleccionada:
                            </div>
                            <div>
                                {order?.currency}
                            </div>
                        </div>
                    }
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
                            {order?.concept}
                        </div>
                    </div>
                </div>
                {!orderCreated &&
                    <>
                        <select className="w-full h-12 py-3 px-6 rounded-lg shadow-lg bg-slate-100 font-semibold" onChange={e => { e.preventDefault(); getCurrency(e.target.value) }}>
                            {
                                currencies?.map(currency => {
                                    return <option key={currency.symbol} value={currency.symbol} >{currency.name}</option>
                                })
                            }
                        </select>
                        <div className="my-5 flex space-x-2 justify-center">
                            <button
                                onClick={sendOrder}
                                type="button"
                                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                Seleccionar Moneda
                            </button>
                        </div>
                    </>
                }
                {orderCreated &&
                    <div className="rounded-lg shadow-lg bg-slate-100 text-center">
                        <div className="py-3 px-6">TIMER</div>
                        <div className="my-5 flex space-x-2 justify-center">
                            {account ?
                                <Button
                                    onClick={sendTrx}>
                                    Pagar con metamask
                                </Button>
                                :
                                <Button
                                    onClick={connect}>
                                    Connect
                                </Button>
                            }
                        </div>
                        <div className="py-5 text-xs">
                            <div>
                                Enviar: <span className="font-bold text-base">{orderCreated?.expected_input_amount} {orderCreated?.input_currency}</span>
                            </div>
                            <div className="py-3">
                                0x71C7656EC7ab88b098defB751B7401B5f6d8976F
                            </div>
                            <div>
                                Etiqueta de destino: 255716461
                            </div>
                        </div>

                    </div>
                }
            </div>
        </>
    )
}



Summary.Layout = BaseLayout