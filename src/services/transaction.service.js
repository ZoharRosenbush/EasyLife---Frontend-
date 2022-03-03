import { httpService } from './http.service.js';
import { socketService } from './socket.service.js';

export const transactionService = {
    query,
    getById,
    save,
    remove,
    getEmptyTransaction
}

async function query(page) {

    const transactionsInfo = await httpService.get(`transaction/?page=${page}`);
    return transactionsInfo

}

async function getById(transactionId) {
    return await httpService.get(`transaction/${transactionId}`)

}

async function save(transactionToSave) {
    if (transactionToSave._id) {
        const savedTransaction = await httpService.put(`transaction/${transactionToSave._id}`, transactionToSave)
        socketService.emit('member updated transactions')
        return savedTransaction
    } else {

        const savedTransaction = await httpService.post('transaction/', transactionToSave)
        socketService.emit('member updated transactions')
        return savedTransaction
    }
}

async function remove(transactionId) {
    const removedId = await httpService.delete(`transaction/${transactionId}`)
    socketService.emit('member updated transactions')
    return removedId
}

function getEmptyTransaction() {
    return {
        customer_details: '',
        product: '',
        total_price: '',
        currency:'',
        date: Date.now()
    }
}