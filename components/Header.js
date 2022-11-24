import React from 'react';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import {
	BellIcon,
	ChatIcon,
	ChevronDownIcon,
	HomeIcon,
	UserGroupIcon,
	ViewGridIcon,
} from '@heroicons/react/solid';

import {
	SearchIcon,
	FlagIcon,
	PlayIcon,
	ShoppingCartIcon,
} from '@heroicons/react/outline';
import HeaderIcon from './HeaderIcon';

function Header() {
	const { data: session } = useSession();
	return (
		<div className="sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md">
			{/* left */}
			<div className="flex items-center">
				<Image
					src={'https://links.papareact.com/5me'}
					width={40}
					height={40}
					layout={'fixed'}
				/>
				<div className="flex ml-2 items-center rounded-full bg-gray-100 p-2">
					<SearchIcon className="h-6 text-gray-600" />
					<input
						className="hidden md:inline-flex ml-2 items-center bg-transparent placeholder-gray-500 outline-none flex-shrink"
						type={'text'}
						placeholder={'Search Facebook'}
					/>
				</div>
			</div>
			{/* center */}
			<div className="flex justify-center flex-grow">
				<div className="flex space-x-6 md:space-x-2">
					<HeaderIcon active Icon={HomeIcon} />
					<HeaderIcon Icon={FlagIcon} />
					<HeaderIcon Icon={PlayIcon} />
					<HeaderIcon Icon={ShoppingCartIcon} />
					<HeaderIcon Icon={UserGroupIcon} />
				</div>
			</div>
			{/* right */}
			<div className="flex items-center sm:space-x-2 justify-end">
				<Image
					onClick={signOut}
					className="rounded-full cursor-pointer"
					src={session.user.image}
					height={'40'}
					width={'40'}
					layout="fixed"
				/>
				<p className="whitespace-nowrap font-semibold pr-3 ">Josh Wenner</p>
				<ViewGridIcon className="icon" />
				<ChatIcon className="icon" />
				<BellIcon className="icon" />
				<ChevronDownIcon className="icon" />
			</div>
		</div>
	);
}

export default Header;
