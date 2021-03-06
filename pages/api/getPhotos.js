import pexels from '../../utils/pexels'

const handler = async (req, res) => {
	const {
		query: { query, page },
		method,
	} = req

	if (!query || !page) return res.send('no page')

	if (method !== 'GET') return res.send('no page')

	const result = await pexels.photos.search({ query, page })

	const photos = result.photos.map((photo) => photo.src.large)

	return res.send(photos)
}

export default handler
