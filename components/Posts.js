import React from 'react';
import {
	useCollection,
	useCollectionData,
} from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import '../firebase';
import { collection } from 'firebase/firestore';
import Post from './Post';
import { useSession } from 'next-auth/react';

function Posts({ posts }) {
	const [realtimePosts] = useCollection(collection(db, 'posts'), {
		snapshotListenOptions: { includeMetadataChanges: true },
	});
	const { data: session } = useSession();

	return (
		<div>
			{realtimePosts
				? realtimePosts?.docs.map((post) => (
						<Post
							key={post.id}
							name={post.data().message}
							email={post.data().email}
							timestamp={post.data().timestamp}
							image={session.user.image}
							postImage={post.data().postImage}
						/>
				  ))
				: posts?.map((post) => (
						<Post
							key={post.id}
							name={post.name}
							message={post.message}
							email={post.email}
							timestamp={post.timestamp}
							image={post.image}
							postImage={post.postImage}
						/>
				  ))}
		</div>
	);
}

export default Posts;
