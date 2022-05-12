import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import {
	Heading,
	Spinner,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Input,
	Button,
	Image,
	Flex,
	Box,
} from '@chakra-ui/react'
import Masonry from 'react-masonry-css'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'

const searchImage = async ({ page = 1, query = 'female' }) => {
	const client_id = 'YzB-US8BfDu1ZymAvYvLOeX9T1Zn8h1tgDNoERPHbUo'

	const { data } = await axios.get('https://api.unsplash.com/search/photos', {
		params: {
			page,
			query,
			client_id,
		},
	})

	const { results } = data

	if (results.length < 10) setHasMore(false)

	return results.map((image) => image.urls.small)
}

const SearchForm = ({ page, setImages, query, setQuery }) => {
	const handleSubmit = async (e) => {
		e.preventDefault()

		const images = await searchImage({ query, page })
		setImages(images)
	}

	const handleChange = (e) => {
		const { value } = e.target
		setQuery(value)
	}

	return (
		<FormControl as='form' onSubmit={handleSubmit} maxW='40rem' mx='auto'>
			<Input
				isRequired
				placeholder='Search Photos'
				onChange={handleChange}
				mb='.5rem'
			/>

			<Button type='submit' w='100%'>
				Search
			</Button>
		</FormControl>
	)
}

const Images = ({ images }) => {
	const breakpointColumnsObj = {
		default: 3,
		1500: 2,
		800: 1,
	}

	const columnClassName = 'my-masonry-grid_column'

	const selector = `& .${columnClassName}`

	const gutterSpace = '30px'

	const masonryStyles = {
		ml: `-${gutterSpace}`,
	}

	masonryStyles[selector] = {
		pl: gutterSpace,
		backgroundClip: 'padding-box',
	}

	return (
		<Flex
			as={Masonry}
			columnClassName={columnClassName}
			breakpointCols={breakpointColumnsObj}
			sx={masonryStyles}
			mt='2rem'
		>
			{images.map((image) => {
				return <Image alt='' w='100%' mb={gutterSpace} src={image} key={nanoid()} />
			})}
		</Flex>
	)
}

const fetchNextImages =
	({ page, query, setImages, setPage, setHasMore }) =>
	async () => {
		const images = await searchImage({ page, query })

		setPage((prev) => prev + 1)

		setImages((prev) => prev.concat(images))

		if (images.length < 10) setHasMore(false)
	}

const Loader = () => (
	<Flex justifyContent='center' py='2rem'>
		<Spinner size='xl' />
	</Flex>
)

const Home = () => {
	const [images, setImages] = useState([])

	const [query, setQuery] = useState('')
	const [page, setPage] = useState(1)
	const [hasMore, setHasMore] = useState(true)

	const searchFormProps = {
		query,
		setQuery,
		setImages,
	}

	return (
		<Box w='90%' m='0 auto'>
			<Heading align='center' py='10' fontSize='5xl'>
				UnLash
			</Heading>

			<SearchForm {...searchFormProps} />

			<InfiniteScroll
				dataLength={images.length}
				hasMore={hasMore}
				next={fetchNextImages({ page, query, setImages, setPage, setHasMore })}
				loader={<Loader />}
			>
				<Images images={images} />
			</InfiniteScroll>
		</Box>
	)
}

export default Home
