import React from 'react'
import { FormControl, Input, Button } from '@chakra-ui/react'

import searchImage from '../utils/searchImage'
import { setQuery } from '../utils/cookies'

const SearchForm = ({ page, setImages, setHasMore, setPage }) => {
	const handleSubmit = async (e) => {
		e.preventDefault()

		const images = await searchImage({ setPage, page, setHasMore })
		setImages(images)
	}

	const handleChange = (e) => setQuery(e.target.value)

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

export default SearchForm
