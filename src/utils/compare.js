/* eslint-disable no-unused-vars */
import moment from 'moment'
import { statusOptions } from './static'
import { monthToNumber } from './dateFormat'

export const compareByStatus = (a, b) => {
  // order based on index Pending > Approved > Delined > Suspended > Closed
  const options = statusOptions.publisherStatus
  const rankA = options.indexOf(a)
  const rankB = options.indexOf(b)
  return rankA - rankB
}

export const compareByDate = (a, b, order) => {
  if (!a) {
    return 1
  }
  if (!b) {
    return -1
  }
  if (order === 'asc') {
    return moment(a).isAfter(b, 'day') ? 1 : -1
  }
  return moment(a).isAfter(b, 'day') ? -1 : 1
}

export const compareByPeriod = (a, b, order) => {
  // format has to be MMM / YYYY
  if (!a || !a.includes(' / ')) {
    return 1
  }

  if (!b || !b.includes(' / ')) {
    return -1
  }

  const monthNumberA = Number(monthToNumber(a.split(' / ')[0]))
  const yearNumberA = Number(a.split(' / ')[1])
  const monthNumberB = Number(monthToNumber(b.split(' / ')[0]))
  const yearNumberB = Number(b.split(' / ')[1])
  if (order === 'asc') {
    if (yearNumberA > yearNumberB) {
      return 1
    }
    if (yearNumberA === yearNumberB) {
      if (monthNumberA >= monthNumberB) {
        return 1
      }
      return -1
    }
    if (yearNumberA === yearNumberB) {
      if (monthNumberA >= monthNumberB) {
        return 1
      }
      return -1
    }
    return -1
  }
  // if order is desc
  if (yearNumberA > yearNumberB) {
    return -1
  }
  if (yearNumberA === yearNumberB) {
    if (monthNumberA >= monthNumberB) {
      return -1
    }
    return 1
  }
  if (yearNumberA === yearNumberB) {
    if (monthNumberA >= monthNumberB) {
      return -1
    }
    return 1
  }
  return 1
}

export const compareByString = (a, b, order) => {
  if (order === 'asc') {
    return a.toLowerCase() > b.toLowerCase() ? 1 : -1
  }
  return a.toLowerCase() > b.toLowerCase() ? -1 : 1
}

export const compareByNumber = (a, b, order) => {
  if (order === 'asc') {
    return Number(a) - Number(b) > 0 ? 1 : -1
  }
  return Number(b) - Number(a) > 0 ? 1 : -1
}

export const compareByNumberWithName = (a, b, order) => {
  const aNumber = a.split(' - ')[0]
  const bNumber = b.split(' - ')[0]
  if (order === 'asc') {
    return Number(aNumber) - Number(bNumber) > 0 ? 1 : -1
  }
  return Number(bNumber) - Number(aNumber) > 0 ? 1 : -1
}

export const compareByNumberString = (a, b, order) => {
  if (order === 'asc') {
    return Number(a.split(',')[0]) - Number(b.split(',')[0]) > 0 ? 1 : -1
  }
  return Number(b.split(',')[0]) - Number(a.split(',')[0]) > 0 ? 1 : -1
}

export const compareByNumberDollar = (a, b, order) => {
  if (order === 'asc') {
    return Number(a.replace('$', '')) - Number(b.replace('$', '')) > 0 ? 1 : -1
  }
  return Number(b.replace('$', '')) - Number(a.replace('$', '')) > 0 ? 1 : -1
}

export default {
  compareByStatus,
  compareByDate,
  compareByNumber,
  compareByNumberWithName,
  compareByNumberString,
  compareByNumberDollar,
  compareByPeriod,
}
