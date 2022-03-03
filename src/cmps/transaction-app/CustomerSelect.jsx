import { useState, useEffect } from 'react'

import { customerService } from '../../services/customer.service.js'
import { eventBusService } from '../../services/eventBusService.js'

export const CustomerSelect = ({selectedCustomer, setCustomer}) => {

    const [customers, setCustomers] = useState([])

    useEffect(() => {
        loadCustomers()
    },[])

    const onUpdateSelect = ({ target }) => {
        const customerId = target.value
        const selectedCustomer = customers.find((customer) => customer._id === customerId)
        setCustomer({ ...selectedCustomer })
    }

    const loadCustomers = async () => {
        try {
            const miniCustomers = await customerService.getMiniCustomers()
            setCustomers(miniCustomers)
        } catch (err) {
            eventBusService.emit('user-msg', { txt: 'Failed to load customers. Please check you internet connection', type: 'danger' })
        }
    }
    
    const selectValue = selectedCustomer ? selectedCustomer._id : ''
    return <select required value={selectValue} className='primary-select' onChange={onUpdateSelect}>
        {!selectedCustomer && <option> Select customer</option>}
        {customers.map((customer) => {
            return <option key={customer._id} value={customer._id} >{customer.fullname} {customer._id}</option>
        })}
    </select>
}