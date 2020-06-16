import request from 'src/utils/request'
/**
 * Fetch single page
 * @param id : page id
 * @returns {*}
 */

export const getSinglePage = (id, lang) => request.get(`/wp/v2/pages/${id}?lang=${lang}`)
