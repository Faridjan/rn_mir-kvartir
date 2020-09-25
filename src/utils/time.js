import moment from 'moment'
require('moment/locale/ru.js')

export const timeAgo = (date = new Date()) => {
	moment.locale('ru')
	return moment(date).fromNow()
}

export const getTimeDate = (date = new Date()) => {
	moment.locale('ru')
	return moment(date).format('DD/MM/YYYY [at] hh:mma')
}
