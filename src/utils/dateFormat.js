const monthList = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export const monthFormat = (monthIndex) => {
  if (monthIndex) {
    const month = monthList[Number(monthIndex) - 1]
    return month
  }
  return ''
}

const dayNumberNeedFormat = [1, 2, 3, 21, 22, 23, 31]

// From timestamp utc to usable object
export const dateFormat = (dateString) => {
  if (dateString) {
    const date = new Date(dateString)
    const year = date.getUTCFullYear()
    const monthIndex = date.getUTCMonth()
    const month = monthList[monthIndex]
    const day = date.getUTCDate()
    let dayFormat = day
    if (dayNumberNeedFormat.includes(dayFormat)) {
      if (dayFormat === 1 || dayFormat === 21 || dayFormat === 31) {
        dayFormat = `${dayFormat}st`
      }
      if (dayFormat === 2 || dayFormat === 22) {
        dayFormat = `${dayFormat}nd`
      }
      if (dayFormat === 3 || dayFormat === 23) {
        dayFormat = `${dayFormat}rd`
      }
    } else {
      dayFormat = `${dayFormat}th`
    }
    if (month && day && year) {
      return `${month} ${dayFormat} / ${year}`
    }
  }
  return ''
}

export const localDateFormat = (dateString) => {
  if (dateString) {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const monthIndex = date.getMonth()
    const month = monthList[monthIndex]
    const day = date.getDate()
    let dayFormat = day
    if (dayNumberNeedFormat.includes(dayFormat)) {
      if (dayFormat === 1 || dayFormat === 21 || dayFormat === 31) {
        dayFormat = `${dayFormat}st`
      }
      if (dayFormat === 2 || dayFormat === 22) {
        dayFormat = `${dayFormat}nd`
      }
      if (dayFormat === 3 || dayFormat === 23) {
        dayFormat = `${dayFormat}rd`
      }
    } else {
      dayFormat = `${dayFormat}th`
    }
    if (month && day && year) {
      return `${month} ${dayFormat} / ${year}`
    }
  }
  return ''
}

export const timeFormat = (dateString) => {
  if (dateString) {
    const date = new Date(dateString)
    const hour = date.getUTCHours()
    const minute = date.getUTCMinutes()
    const second = date.getUTCSeconds()
    return `${hour}:${minute}:${second} ${hour > 12 ? 'PM' : 'AM'}`
  }
  return ''
}

export const standardDateFormat = (dateString) => {
  if (dateString) {
    const date = new Date(dateString)
    const year = date.getUTCFullYear()
    const monthIndex = date.getUTCMonth()
    const dayIndex = date.getUTCDate()
    const month = `0${monthIndex + 1}`.slice(-2)
    const day = `0${dayIndex}`.slice(-2)
    if (month && day && year) {
      return `${year}-${month}-${day}`
    }
  }
  return ''
}

export const localStandardDateFormat = (dateString) => {
  if (dateString) {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const monthIndex = date.getMonth()
    const dayIndex = date.getDate()
    const month = `0${monthIndex + 1}`.slice(-2)
    const day = `0${dayIndex}`.slice(-2)
    if (month && day && year) {
      return `${year}-${month}-${day}`
    }
  }
  return ''
}

export const periodFormat = (dateString) => {
  if (dateString) {
    const date = new Date(dateString)
    const year = date.getUTCFullYear()
    const monthIndex = date.getUTCMonth()
    const month = monthList[monthIndex]
    if (month && year) {
      return `${month} / ${year}`
    }
  }
  return ''
}

const dayToNumber = (day) => day.replace('st', '').replace('rd', '').replace('nd', '').replace('th', '')

export const monthToNumber = (month) => {
  if (!month) return null
  switch (month) {
    case 'Jan':
      return '1'
    case 'Feb':
      return '2'
    case 'Mar':
      return '3'
    case 'Apr':
      return '4'
    case 'May':
      return '5'
    case 'Jun':
      return '6'
    case 'Jul':
      return '7'
    case 'Aug':
      return '8'
    case 'Sep':
      return '9'
    case 'Oct':
      return '10'
    case 'Nov':
      return '11'
    case 'Dec':
      return '12'
    default:
      return null
  }
}

// From moment().format() to utc
export const toUTC = (dateString, dateType) => {
  if (dateString) {
    let date = new Date(dateString)
    if (typeof dateString === 'string' && dateString.includes(' / ')) {
      const monthIndex = monthToNumber(dateString.split(' / ')[0].split(' ')[0]) - 1
      const dayIndex = dayToNumber(dateString.split(' / ')[0].split(' ')[1])
      const yearIndex = dateString.split(' / ')[1]
      date = new Date(yearIndex, monthIndex, dayIndex)
    }
    const year = date.getFullYear()
    const monthIndex = date.getMonth()
    const dayIndex = date.getDate()
    const month = `0${monthIndex + 1}`.slice(-2)
    const day = `0${dayIndex}`.slice(-2)
    if (dateType === 'startDate') {
      return `${year}-${month}-${day}T00:00:00Z`
    }
    return `${year}-${month}-${day}T23:59:59Z`
  }
  return ''
}

export const isAfterOrEqual = (dateString1, dateString2) => {
  const date1Format = new Date(toUTC(dateString1))
  const date2Format = new Date(toUTC(dateString2))
  return date1Format >= date2Format
}

export const isAfter = (dateString1, dateString2) => {
  const date1Format = new Date(dateString1)
  const date2Format = new Date(dateString2)
  return date1Format > date2Format
}

export const isInRange = (dateString1, dateString2, dateString3) => {
  const date = new Date(dateString1)
  const startDate = new Date(dateString2)
  const endDate = new Date(dateString3)
  return date >= startDate && date <= endDate
}

export const pastOneMonth = (date) => {
  const currentDate = new Date(date)
  let pastOneMonthDate = new Date(date)
  const pastTime = currentDate.getDate() - 30
  pastOneMonthDate = new Date(pastOneMonthDate.setDate(pastTime))
  return pastOneMonthDate
}

export const monthToDate = (date) => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
  return firstDay
}

export const pastOneYear = (date) => {
  const currentDate = new Date(date)
  let pastOneYearDate = new Date(date)
  const pastTime = currentDate.getDate() - 366
  pastOneYearDate = new Date(pastOneYearDate.setDate(pastTime))
  return pastOneYearDate
}

export const thisMonthRange = () => {
  const date = new Date()
  const startDate = new Date(date.getFullYear(), date.getMonth(), 1)
  const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  return { startDate, endDate }
}

export const monthsForAYear = () => {
  const now = new Date()
  let monthIndex = now.getUTCMonth() + 1
  let yearIndex = now.getUTCFullYear()
  const monthArray = []
  for (let i = 0; i < 12; i += 1) {
    if (i === 0 || i === 11) {
      monthArray.push({
        month: monthIndex,
        year: yearIndex,
        monthFormat: `${monthFormat(monthIndex)}/${yearIndex}`,
      })
    } else {
      monthArray.push({ month: monthIndex, year: yearIndex, monthFormat: monthFormat(monthIndex) })
    }
    if (monthIndex === 1) {
      monthIndex = 12
      yearIndex -= 1
    } else {
      monthIndex -= 1
    }
  }
  const reverseMonthArray = monthArray.reverse()
  return reverseMonthArray
}

export const numberToMonth = (month) => {
  switch (month) {
    case '1':
      return 'Jan'
    case '2':
      return 'Feb'
    case '3':
      return 'Mar'
    case '4':
      return 'Apr'
    case '5':
      return 'May'
    case '6':
      return 'Jun'
    case '7':
      return 'Jul'
    case '8':
      return 'Aug'
    case '9':
      return 'Sep'
    case '10':
      return 'Oct'
    case '11':
      return 'Nov'
    case '12':
      return 'Dec'
    default:
      return null
  }
}

export const getFirstDayPrevMonth = (date) => {
  const currentDate = new Date(date)
  const firstDayPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
  return firstDayPrevMonth
}

export default {
  dateFormat,
  toUTC,
  isAfterOrEqual,
  isAfter,
  isInRange,
  pastOneMonth,
  pastOneYear,
  monthFormat,
  monthToDate,
  monthsForAYear,
  monthToNumber,
  numberToMonth,
  periodFormat,
  standardDateFormat,
  timeFormat,
  localStandardDateFormat,
  localDateFormat,
  getFirstDayPrevMonth,
}
