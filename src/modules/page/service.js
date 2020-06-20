import request from 'src/utils/request'
/**
 * Fetch single page
 * @param id : page id
 * @returns {*}
 */

export const getSinglePage = (id, lang) => request.get(`/wp/v2/pages/${id}?lang=${lang}`)

export const getPageComments = (id) => request.get(`/wp/v2/comments?post=${id}`)

export const addPageComments = (data) => request.post(`/wp/v2/comments`, data)
