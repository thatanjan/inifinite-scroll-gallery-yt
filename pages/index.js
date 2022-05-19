import React, { useState } from 'react'
import { Heading, Spinner, Flex, Box } from '@chakra-ui/react'
import InfiniteScroll from 'react-infinite-scroll-component'

import Images from '../components/Images'
import SearchForm from '../components/SearchForm'

import searchImage from '../utils/searchImage'
import { getQuery } from '../utils/cookies'

const fetchNextImages =
	({ page, setImages, setPage, setHasMore }) =>
	async () => {
		const images = await searchImage({
			setPage,
			page,
			query: getQuery(),
			setHasMore,
		})

		setImages((prev) => prev.concat(images))
	}

const Loader = () => (
	<Flex justifyContent='center' py='2rem'>
		<Spinner size='xl' />
	</Flex>
)

const EndMessage = () => (
	<Heading as='h3' fontSize='2xl' py='2rem' align='center'>
		No more images
	</Heading>
)

const Home = () => {
	const [images, setImages] = useState([])

	const [page, setPage] = useState(1)
	const [hasMore, setHasMore] = useState(false)

	const searchFormProps = {
		setImages,
		setPage,
		setHasMore,
	}

	return (
		<Box w='90%' m='0 auto'>
			<Heading align='center' py='10' fontSize='5xl'>
				Pixels
			</Heading>

			<SearchForm {...searchFormProps} />

			<InfiniteScroll
				dataLength={images.length}
				hasMore={hasMore}
				next={fetchNextImages({ page, setImages, setPage, setHasMore })}
				loader={<Loader />}
				endMessage={<EndMessage />}
			>
				<Images images={images} />
			</InfiniteScroll>
		</Box>
	)
}

export default Home
