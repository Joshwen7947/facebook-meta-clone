import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { EmojiHappyIcon } from '@heroicons/react/outline';
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid';
import { db, storage } from '../firebase';
import { collection, serverTimestamp, addDoc } from 'firebase/firestore';
import { Collection } from 'heroicons-react';
import { ref, uploadString } from 'firebase/storage';

function InputBox() {
	const { data: session } = useSession();
	const [imageToPost, setImageToPost] = useState(null);

	const inputRef = useRef(null);
	const filePickerRef = useRef(null);

	const sendPost = (e) => {
		e.preventDefault();
		if (!inputRef.current.value) return;

		try {
			const docRef = addDoc(collection(db, 'posts'), {
				message: inputRef.current.value,
				name: session.user.name,
				email: session.user.email,
				image: session.user.image,
				timestamp: serverTimestamp(),
			});
			// .then((doc) => {
			// 	if (imageToPost) {
			// 		try {
			// 			const storageRef = ref(storage, `posts/${doc.id}`);
			// 			console.log(storageRef);
			// 			const uploadTask = storageRef.putString(imageToPost, 'data_url');
			// 			removeImage();
			// 			console.log(uploadTask);

			// 			uploadTask.on(
			// 				'state_change',
			// 				null,
			// 				(error) => console.error(error),
			// 				() => {
			// 					// When upload completes
			// 					storageRef
			// 						.ref(`posts`)
			// 						.child(doc.id)
			// 						.getDownloadURL()
			// 						.then((url) => {
			// 							docRef.addDoc(
			// 								Collection(db, 'posts')
			// 									.doc(doc.id)
			// 									.set(
			// 										{
			// 											postImage: url,
			// 										},
			// 										{ merge: true }
			// 									)
			// 							);
			// 						});
			// 				}
			// 			);
			// 		} catch {
			// 			console.log('ERROR');
			// 		}
			// 	}
			// });
			console.log(docRef.id);
		} catch (e) {
			console.log('ERROR ADDING DOC:', e);
		}

		inputRef.current.value = '';
	};

	const addImageToPost = (e) => {
		const reader = new FileReader();
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
		}

		reader.onload = (readerEvent) => {
			setImageToPost(readerEvent.target.result);
		};
	};

	const removeImage = () => {
		setImageToPost(null);
	};
	return (
		<div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
			<div className="flex space-x-4 items-center p-4">
				<Image
					className="rounded-full"
					src={session.user.image}
					width={40}
					height={40}
					layout="fixed"
				/>
				<form className="flex flex-1">
					<input
						className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
						type="text"
						ref={inputRef}
						placeholder={`What's on your mind, ${session.user.name}?`}
					/>
					<button hidden type="submit" onClick={sendPost}>
						Submit
					</button>
				</form>
				{imageToPost && (
					<div
						onClick={removeImage}
						className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
					>
						<img src={imageToPost} className="h-10 object-contain" alt="" />
						<p className="text-xs text-red-500 text-center">Remove</p>
					</div>
				)}
			</div>
			<div className="flex justify-evenly p-3 border-t">
				<div className="inputIcon">
					<VideoCameraIcon className="h-7 text-red-500" />
					<p className="text-xs sm:text-sm xl:text-base">Live Video</p>
				</div>
				<div
					onClick={() => filePickerRef.current.click()}
					className="inputIcon"
				>
					<CameraIcon className="h-7 text-green-400" />
					<p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
					<input
						ref={filePickerRef}
						onChange={addImageToPost}
						hidden
						type={'file'}
					/>
				</div>
				<div className="inputIcon">
					<EmojiHappyIcon className="h-7 text-yellow-300" />
					<p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
				</div>
			</div>
		</div>
	);
}

export default InputBox;
