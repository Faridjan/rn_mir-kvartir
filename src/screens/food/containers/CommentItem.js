import React from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'

import TextHtml from 'src/components/TextHtml'
import Rating from 'src/components/Rating'

import { timeAgo } from 'src/utils/time'

const CommentItem = ({ data }) => {
	const avatar = data.reviewer_avatar_urls
		? data.reviewer_avatar_urls['96']
		: data.author_avatar_urls['96']
	const author = data.reviewer ? data.reviewer : data.author_name
	const date = data.date_created ? data.date_created : data.date
	const content = data.review ? data.review : data.content.rendered

	return (
		<View
			style={[
				styles.container,
				{
					borderColor: '#ccc',
				},
			]}
		>
			<View style={styles.row}>
				<View style={{ flexDirection: 'row' }}>
					<Image source={{ uri: avatar }} style={styles.avatar} />
					<View style={styles.center}>
						<Text style={{ fontWeight: '600' }}>{author}</Text>
						{data.rating || data.acf.rating ? (
							<Rating size={12} startingValue={data.rating} readonly />
						) : null}
					</View>
				</View>

				<Text colorThird style={styles.textCreateAt}>
					{timeAgo(date)}
				</Text>
			</View>
			<TextHtml value={content} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 16,
		borderBottomWidth: 1,
	},
	textCreateAt: {
		fontSize: 9,
		lineHeight: 12,
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
	},
	row: {
		marginLeft: 0,
		marginRight: 0,
		marginBottom: 16,
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
	},
	center: {
		paddingLeft: 9,
		paddingRight: 9,
	},
})

export default CommentItem
