import React, { useState, useEffect, useRef } from 'react'
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
	Typography,
} from '@chakra-ui/react'
import Masonry from 'react-masonry-css'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'

const searchImage = async ({ setPage, page = 1, query = 'female' }) => {
	const { data } = await axios.get('/api/getPhotos', { params: { query, page } })

	setPage((prev) => prev + 1)

	return data
}

const SearchForm = ({ page, setImages, query, setQuery, setPage }) => {
	const handleSubmit = async (e) => {
		e.preventDefault()

		const images = await searchImage({ setPage, query, page })
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
		const images = await searchImage({ setPage, page, query })

		setImages((prev) => prev.concat(images))

		if (images.length < 10) setHasMore(false)
	}

const Loader = () => (
	<Flex justifyContent='center' py='2rem'>
		<Spinner size='xl' />
	</Flex>
)

const EndMessage = () => (
	<Typography variant='h3'>No more images to show</Typography>
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
		setPage,
	}

	const ref = useRef(0)

	useEffect(() => {
		ref.current++
		console.log('rendered', ref.current)
	}, [query])

	return (
		<Box w='90%' m='0 auto'>
			<Heading align='center' py='10' fontSize='5xl'>
				Pixels
			</Heading>

			<SearchForm {...searchFormProps} />

			<InfiniteScroll
				dataLength={images.length}
				hasMore={hasMore}
				next={fetchNextImages({ page, query, setImages, setPage, setHasMore })}
				loader={<Loader />}
				endMessage={EndMessage}
			>
				<Images images={images} />
			</InfiniteScroll>
		</Box>
	)
}

export default Home
