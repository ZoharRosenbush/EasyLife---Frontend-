import { useEffect, useState } from 'react'

import { transactionService } from '../../services/transaction.service.js'
import { eventBusService } from '../../services/eventBusService.js'
import { socketService } from '../../services/socket.service.js'

import Spinner624 from '../../assets/svgs/Spinner624.svg'
import { AddEdit } from '../../cmps/AddEdit.jsx'
import { PaginationBtns } from '../../cmps/PaginationBtns.jsx'
import { TransactionList } from '../../cmps/transaction-app/TransactionList.jsx'

export const TransactionPage = () => {

    const [transactions, setTransactions] = useState(null)
    const [currPage, setPage] = useState(0)
    const [pageAmount, setPageAmount] = useState(1)
    const [isAddingMode, toggleAdding] = useState(false)


    useEffect(() => {
        socketService.off('transaction was updated')
        socketService.on('transaction was updated', loadTransactionsInfo)
        return () => {
            socketService.off('transaction was updated')
        }
    }, [])

    useEffect(() => {
        loadTransactionsInfo()
    }, [currPage])

    const loadTransactionsInfo = async () => {
        try {
            const { transactions, pageAmount } = await transactionService.query(currPage)
            setPageAmount(pageAmount)
            setTransactions(transactions)
        } catch (err) {
            eventBusService.emit('user-msg', { txt: 'Failed to load transactions. Please check you internet connection', type: 'danger' })
        }

    }

    const removeTransaction = async (transactionId) => {

        try {
            await transactionService.remove(transactionId)
            const updatedTransactions = transactions.filter((transaction) => transaction._id !== transactionId)
            setTransactions(updatedTransactions)
            eventBusService.emit('user-msg', { txt: 'Transaction removed successfully', type: 'succsess' })

        } catch (err) {
            eventBusService.emit('user-msg', { txt: 'Failed to load transactions. Please check you internet connection', type: 'danger' })
        }

    }

    const saveTransaction = async (transactionToSave) => {

        try {
            const savedTransaction = await transactionService.save(transactionToSave)
            const updatedTransactions = [savedTransaction, ...transactions]
            setTransactions(updatedTransactions)
            eventBusService.emit('user-msg', { txt: 'Transaction saved successfully', type: 'succsess' })
        } catch (err) {
            eventBusService.emit('user-msg', { txt: 'Failed to load transactions. Please check you internet connection', type: 'danger' })
        }
    }

    const onToggleAdding = () => {
        toggleAdding(!isAddingMode)
    }


    return (
        <section className='transaction-page'>
            <header className='flex column align-center'>
                <h1>Store Transactions</h1>
                {!isAddingMode && <button className='primary-btn' onClick={onToggleAdding}>Add transaction</button>}
            </header>
            {isAddingMode && <AddEdit saveTransaction={saveTransaction} onToggleAdding={onToggleAdding} />}
            {!transactions && <img src={Spinner624} alt='Loading...' />}
            {!transactions?.length && <h1>No transactions to show.</h1>}
            {transactions?.length && <>
                <TransactionList removeTransaction={removeTransaction}
                    transactions={transactions} />
                <PaginationBtns pageAmount={pageAmount} currPage={currPage} setPage={setPage} />
            </>
            }
        </section>
    )
}


