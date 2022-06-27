import { toast } from 'react-toastify'

export const withToast = (promise) => {
  toast.promise(
    promise,
    {
      pending: {
        render(){
          return (
            <div className="p-6 py-2">
              <p className="mb-2">
                La transacción se esta procesando...
              </p>
              <p>
                Unos segundos más...
              </p>
            </div>
          )
        }
      },
      success: {
        render({data}){
          return (
            <div>
              <p className="font-bold">Tx: {data.transactionHash.slice(0, 20)}...</p>
              <p>
                El proceso termino satisfactoriamente 🚀.
              </p>
              <a
                href={`https://ropsten.etherscan.io/tx/${data.transactionHash}`}
                target="_blank"
              >
                <i className="text-indigo-600 underline">Ver detalles de la transacción</i>
              </a>
            </div>
          )
        },
        // other options
        icon: "✔️",
      },
      error: {
        render({data}){
          // When the promise reject, data will contains the error
          return <div>{data.message ?? "Transaction has failed 🤯"}</div>
        }
      }
    },
    {
      closeButton: true
    }
  )
}