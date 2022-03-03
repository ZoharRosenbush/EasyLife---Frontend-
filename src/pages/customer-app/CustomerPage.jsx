import { useEffect, useState } from 'react'

import { customerService } from '../../services/customer.service'
import { eventBusService } from '../../services/eventBusService.js'
import { socketService } from '../../services/socket.service.js'

import Spinner624 from '../../assets/svgs/Spinner624.svg'
import { CustomerList } from '../../cmps/customer-app/CustomerList.jsx'
import { PaginationBtns } from '../../cmps/PaginationBtns.jsx'
import { AddEdit } from '../../cmps/AddEdit.jsx'

export const CustomerPage = () => {
    const [customers, setCustomers] = useState(null)
    const [currPage, setPage] = useState(0)
    const [pageAmount, setPageAmount] = useState(1)
    const [isAddingMode, toggleAdding] = useState(false)

    useEffect(() => {
        socketService.off('customer was updated')
        socketService.on('customer was updated', loadCustomersInfo)
        return () => {
            socketService.off('customer was updated')
        }
    }, [])

    useEffect(() => {
        loadCustomersInfo()
    }, [currPage])


    const loadCustomersInfo = async () => {
        try {
            const { customers, pageAmount } = await customerService.query(currPage)
            setCustomers(customers)
            setPageAmount(pageAmount)
        } catch (err) {
            eventBusService.emit('user-msg', { txt: 'Failed to load customers. Please check you internet connection', type: 'danger' })
        }
    }

    const saveCustomer = async (customerToSave) => {

        try {
            const savedCustomer = await customerService.save(customerToSave)
            const updatedCustomers = [savedCustomer, ...customers]
            setCustomers(updatedCustomers)
            eventBusService.emit('user-msg', { txt: 'Customersaved successfully', type: 'succsess' })
        } catch (err) {
            eventBusService.emit('user-msg', { txt: 'Failed to load customers. Please check you internet connection', type: 'danger' })
        }
    }



    const removeCustomer = async (customerId) => {

        try {
            await customerService.remove(customerId)
            const updatedCustomers = customers.filter((customer) => customer._id !== customerId)
            setCustomers(updatedCustomers)
            eventBusService.emit('user-msg', { txt: 'Customer removed successfully', type: 'succsess' })

        } catch (err) {
            eventBusService.emit('user-msg', { txt: 'Failed to load customers. Please check you internet connection', type: 'danger' })
        }

    }

    const onToggleAdding = () => {
        toggleAdding(!isAddingMode)
    }



    return (<section className='customer-page flex column align-center'>
        <header className='flex column align-center'>
            <h1>Store Customers</h1>
            {!isAddingMode && <button className='primary-btn' onClick={onToggleAdding}>Add Customer</button>}
        </header>
        {isAddingMode && <AddEdit saveCustomer={saveCustomer} onToggleAdding={onToggleAdding} />}
        {!customers && <img src={Spinner624} alt='Loading...' />}
        {!customers?.length && <h1>No customers to show.</h1>}
        {customers?.length && <>
            <CustomerList customers={customers} removeCustomer={removeCustomer} />
            <PaginationBtns pageAmount={pageAmount} currPage={currPage} setPage={setPage} />
        </>}
    </section>)
}
