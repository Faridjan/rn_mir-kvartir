import React from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import TextHtml from 'src/components/TextHtml'

import { timeAgo } from 'src/utils/time'

const CommentItem = ({ data }) => {
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
					<Image source={{ uri: data.reviewer_avatar_urls['96'] }} style={styles.avatar} />
					<View style={styles.center}>
						<Text style={{ fontWeight: '600' }}>{data.reviewer}</Text>
						{/* <Rating size={12} startingValue={data.rating} readonly /> */}
					</View>
				</View>

				<Text colorThird style={styles.textCreateAt}>
					{timeAgo(data.date_created)}
				</Text>
			</View>
			<TextHtml value={data.review} />
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
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	center: {
		paddingLeft: 9,
		paddingRight: 9,
	},
})

export default CommentItem
