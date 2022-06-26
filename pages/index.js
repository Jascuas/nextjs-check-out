
import { BaseLayout } from "@components/layout"

export default function Home() {

  return (
    <>
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm mx-auto my-32">
        <h2 className="pb-6 text-2xl font-bold text-slate-700">Realizar Pago</h2>
        <form>
          <div className="form-group mb-6">
            <label className="form-label inline-block mb-2 text-gray-700 text-sm">Importe a pagar en EUR</label>
            <input
              type="text"
              pattern="^[0-9]+(\,[0-9][0-9]?)?$"
              className="form-controlblock w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="amount"
              aria-describedby="amountToPay"
              placeholder="56,06" />
          </div>
          <div className="form-group mb-6">
            <label className="form-label inline-block mb-2 text-gray-700 text-sm">Concepto</label>
            <input
              type="text"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="concept"
              placeholder="Compra de XXXXX" />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 w-full bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
            Crear pago
          </button>
        </form>
      </div>
    </>
  )
}



Home.Layout = BaseLayout