import Image from "next/image";

export const Logo = () => {
	return (
		<div className="mt-2 justify-center space-x-4">
			<Image
				src="logo.svg"
				alt="Logo"
				width={40}
				height={40}
				className="cursor-pointer object-cover"
			/>
		</div>
	);
};
