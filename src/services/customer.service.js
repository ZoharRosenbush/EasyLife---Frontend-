import { httpService } from './http.service.js';
import { socketService } from './socket.service.js'

export const customerService = {
    query,
    getById,
    save,
    remove,
    getMiniCustomers,
    getEmptycustomer
}


async function query(page) {
    const customersInfo = await httpService.get(`customer/?page=${page}`);
    return customersInfo
}

async function getMiniCustomers() {
    const miniCustomers = await httpService.get(`customer/?ismini=true`);
    return miniCustomers
}


async function getById(customerId) {
    return await httpService.get(`customer/${customerId}`)
}


async function save(customerToSave) {

    if (customerToSave._id) {
        const savedCustomer = await httpService.put(`customer/${customerToSave._id}`, customerToSave)
        socketService.emit('member updated customers')
        return savedCustomer
    } else {
        const savedCustomer = await httpService.post('customer/', customerToSave)
        socketService.emit('member updated customers')
        return savedCustomer
    }
}

async function remove(customerId) {
    const removedId = await httpService.delete(`customer/${customerId}`)
    socketService.emit('member updated customers')
    return removedId
}

function getEmptycustomer() {
    return {
        fullname: '',
        email: '',
        gender: '',
        country: '',
        city: '',
        street: '',
        phone: '',
        cerdit_card_type: '',
        cerdit_card_number: '',
    }
}