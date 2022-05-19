import axios from 'axios'

import { getQuery } from '../utils/cookies'

const searchImage = async ({ setPage, setHasMore, page = 1 }) => {
	const query = getQuery()

	if (!query) return []

	const { data } = await axios.get('/api/getPhotos', {
		params: { query, page },
	})

	setPage((prev) => prev + 1)

	if (data.length < 10) {
		setHasMore(false)
	} else {
		setHasMore(true)
	}

	return data
}

export default searchImage
