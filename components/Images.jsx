import React from 'react'
import { nanoid } from 'nanoid'
import { Image, Flex } from '@chakra-ui/react'
import Masonry from 'react-masonry-css'

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

export default Images
