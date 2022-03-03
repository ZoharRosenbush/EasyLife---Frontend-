export const utilService = {
    makeId,
    getRandomIntInclusive,
    getDateByTimestamp,
    priceFormatter,
    getFormattedDate
}

function getFormattedDate(date) {
    const newDate = new Date(date)
    return newDate.toLocaleDateString('en-GB')
}

function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function getDateByTimestamp(timestamp) {
    const currYear = new Date().getFullYear()
    const dueYear = new Date(timestamp).getFullYear()
    let strDate = ''
    strDate += `${new Date(timestamp).toLocaleString('en-GB', { day: 'numeric' })} `
    strDate += `${new Date(timestamp).toLocaleString('en-GB', { month: 'short' })} at `
    if (dueYear !== currYear) {
        strDate += `${dueYear} `
    }
    strDate += `${new Date(timestamp).toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric', hour12: true }).toLocaleUpperCase()}`
    return strDate
}

function priceFormatter(currency, price) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: `${currency}`,
    });

    return formatter.format(price)
} 