import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Header from '../components/Header';
import Login from '../components/Login';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Widgets from '../components/Widgets';
import { db } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';

export default function Home({ session, posts }) {
	if (!session) return <Login />;
	return (
		<div className="h-screen bg-gray-100 overflow-hidden">
			<Head>
				<title>Facebook 2.0</title>
			</Head>
			{/* header */}
			<Header />

			<main className="flex">
				{/* sidebar */}
				<Sidebar />
				{/* feed */}
				<Feed posts={posts} />
				{/* widgets */}
				<Widgets />
			</main>
		</div>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);
	// const posts = await useCollection(collection(db, 'posts'), {
	// 	snapshotListenOptions: { includeMetadataChanges: true },
	// })
	// 	.orderBy('timestamp', 'desc')
	// 	.get();
	// const posts = await db
	// 	.collection('posts')
	// 	.orderBy('timestamp', 'desc')
	// 	.get();

	// const docs = posts.docs.map((post) => ({
	// 	id: post.id,
	// 	...post.data(),
	// 	timestamp: null,
	// }));
	return {
		props: {
			session,
			// posts: docs,
		},
	};
}
