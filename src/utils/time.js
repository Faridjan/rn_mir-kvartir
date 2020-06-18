import moment from 'moment'

export const timeAgo = (date = new Date()) => {
	return moment(date).locale('ru').fromNow()
}

export const getTimeDate = (date = new Date()) => {
	return moment(date).locale('ru').format('DD/MM/YYYY [at] hh:mma')
}
