import Cookies from 'js-cookie'

const QUERY = 'query'

const setQuery = (value) => Cookies.set(QUERY, value)
const getQuery = (value) => Cookies.get(QUERY) || ''

export { setQuery, getQuery }
