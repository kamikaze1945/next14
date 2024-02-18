import Image from "next/image";

export const ProductCoverImage = ({
	src,
	alt,
}: {
	src: string;
	alt: string;
}) => {
	return (
		<div className="oferflow-hidden aspect-square rounded-md border bg-slate-50 hover:bg-slate-100">
			<Image
				height={320}
				width={320}
				src={src}
				alt={alt}
				className="h-full w-full object-cover object-center p-4 transition-transform hover:scale-105"
			/>
		</div>
	);
};
