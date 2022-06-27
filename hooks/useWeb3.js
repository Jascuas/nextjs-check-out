import { useEffect, useState, useMemo } from 'react'

import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers'

const createweb3State = ({ web3, provider, isLoading }) => {
    return {
        web3,
        provider,
        isLoading,
    }
}

export function useWeb3() {
    const [web3Api, setweb3Api] = useState(createweb3State({
        provider: null,
        web3: null,
        account: null,
        isLoading: true
    }));
    const [account, setAccount] = useState(0)

    const setListeners = provider => {
        provider.on('accountsChanged', handleAccountsChanged)
    }

    function handleAccountsChanged(accounts) {
        console.log(accounts)
        if (accounts.length === 0) {
            setAccount()
        } else if (accounts[0] !== account) {
            setAccount(accounts[0])
        }
    }

    useEffect(() => {
        const loadProvider = async () => {
            const provider = await detectEthereumProvider()
            if (provider) {
                const web3 = new ethers.providers.Web3Provider(provider)
                await web3.listAccounts().then(handleAccountsChanged)
                setListeners(provider)
                setweb3Api(createweb3State({
                    web3,
                    provider,
                    isLoading: false
                }))
            } else {
                setweb3Api((api) => ({ ...api, isLoading: false }))
                // if the provider is not detected, detectweb3Provider resolves to null
                console.log('Please install MetaMask!');
            }
        }
        loadProvider().catch(console.error)
    }, [account])

    const _web3Api = useMemo(() => {
        const { web3, provider, isLoading } = web3Api
        return {
            ...web3Api,
            requireInstall: !isLoading && !web3,
            ethers: ethers,
            account: account,
            connect: provider ?
                async () => {
                    try {
                        await provider.request({ method: "eth_requestAccounts" })
                    } catch {
                        //location.reload()
                        console.log("nope")
                    }
                } :
                () => console.error("Cannot connect to Metamask, try to reload your browser please.")
        }
    }, [web3Api])

    return _web3Api
}