import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { BaseLayout } from "@components/layout"
import { Button } from "@components/common";
import { fetcher } from "@utils/fetcher";
import { withToast } from "@utils/toast"
import { useWeb3 } from '../hooks/useWeb3'

export default function Summary() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [currencies, setCurrencies] = useState(null);
    const [order, setOrder] = useState(null)
    const [orderCreated, setOrderCreated] = useState(null)
    const { web3, ethers, account, connect } = useWeb3();
    const [sent, setSent] = useState(false);

    useEffect(() => {
        const query = router.query;
        setOrder(query)
        if (isLoading) {
            fetcher("/currencies", "GET").then((data) => {
                if (data) {
                    setCurrencies(data)
                    setIsLoading(false)
                } else {
                    console.log("ERROR GET")
                }

            })
        }
    }, [isLoading])

    function getCurrency(value) {
        let obj = order;
        obj = { ...obj, "currency": value }
        setOrder(obj)

        setOrderCreated({
            identifier: "cc80e0b5-f779-4094-be65-fcee4b5bd041",
            reference: "",
            address: "0x619e5218354Ec8A29C17B958421a4DBe179b22cA",
            input_currency: "RopstenETH",
            expected_input_amount: order.amount
        })
    }

    function sendOrder() {
        // let body = { expected_output_amount: order.amount, input_currency: "ETH_TEST", notes: order.concept }

        // console.log(body)
        // fetcher("/orders", "POST", body).then((data) => {
        //     if (data) {
        //         console.log(data)
        //         setOrderCreated(data)

        //     } else {
        //         console.log("ERROR POST")
        //     }

        // })
    }

    async function sendTrx() {
        const signer = web3.getSigner();
        const result = await signer.sendTransaction({
            to: orderCreated.address,
            value: ethers.utils.parseEther(orderCreated.expected_input_amount)
        })
        withToast(result.wait)
        setSent(true)
    }

    return (
        <>
            <div className="grid grid-cols-2 gap-4 py-40">
                <h2 className=" mb-3 text-base font-bold text-slate-700">Resumen del pedido</h2>
                <h2 className=" mb-3 text-base font-bold text-slate-700">Realizar el pago</h2>
                <div className="rounded-lg shadow-lg bg-slate-100 self-center">
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

                    </>
                }
                {orderCreated &&
                    <div className="rounded-lg shadow-lg bg-slate-100 text-center place-self-center">
                        {sent ?
                            <div className="flex space-x-2 justify-center">
                                <Link href={{ pathname: "/", }}>
                                    <a className="text-center block text-white bg-blue-600 hover:bg-blue-700 px-6 py-2.5 border rounded-md font-medium ">
                                        Realizar otro pago
                                    </a>
                                </Link>
                            </div>
                            :
                            <>
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
                                            Connectarse
                                        </Button>
                                    }
                                </div>
                                <div className="py-5 text-xs">
                                    <div>
                                        Enviar: <span className="font-bold text-base">{orderCreated?.expected_input_amount} {orderCreated?.input_currency}</span>
                                    </div>

                                </div>
                            </>
                        }


                    </div>
                }
            </div>
        </>
    )
}



Summary.Layout = BaseLayout