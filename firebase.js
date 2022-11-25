import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDQV_XWbj9TbRyTYowKUcKkiMfLdG7GW4g',
	authDomain: 'meta-clone-dde44.firebaseapp.com',
	projectId: 'meta-clone-dde44',
	storageBucket: 'meta-clone-dde44.appspot.com',
	messagingSenderId: '387136470179',
	appId: '1:387136470179:web:0aef1a938a10a6e3d49316',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
