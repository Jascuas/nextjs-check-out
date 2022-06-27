import { useState } from "react";
import Link from "next/link";

import { BaseLayout } from "@components/layout"

export default function Home() {
  const [amount, setAmount] = useState();
  const [concept, setConcept] = useState();

  function getAmount(value) {
    setAmount(value)
  }

  function getConcept(value) {
    setConcept(value)
  }


  return (
    <>
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm mx-auto my-32">
        <h2 className="pb-6 text-2xl font-bold text-slate-700">Realizar Pago</h2>
        <form>
          <div className="form-group mb-6">
            <label className="form-label inline-block mb-2 text-gray-700 text-sm">Importe a pagar en EUR</label>
            <input
              onChange={e => getAmount(e.target.value)}
              type="text"
              className="form-controlblock w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="amount"
              aria-describedby="amountToPay"
              placeholder="56,06" />
          </div>
          <div className="form-group mb-6">
            <label className="form-label inline-block mb-2 text-gray-700 text-sm">Concepto</label>
            <input
              onChange={e => getConcept(e.target.value)}
              type="text"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="concept"
              placeholder="Compra de XXXXX" />
          </div>

          <Link href={{
            pathname: "/summary",
            query: { "amount": amount, "concept": concept },
          }} as={"/summary"}>
            <a
              className="text-center block text-white bg-blue-600 hover:bg-blue-700 px-6 py-2.5 w-full border rounded-md font-medium shadow-md">
              Crear pago
            </a>
          </Link>

        </form>
      </div>
    </>
  )
}



Home.Layout = BaseLayout