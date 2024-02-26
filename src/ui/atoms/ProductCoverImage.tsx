import Image from "next/image";

type ProductCoverImageProps = {
	src: string;
	alt: string;
	width?: number;
	height?: number;
};

export const ProductCoverImage = ({
	src,
	alt,
	width = 320,
	height = 320,
}: ProductCoverImageProps) => {
	return (
		<div className="aspect-square overflow-hidden rounded-md border bg-slate-50 hover:bg-slate-100">
			<Image
				height={height}
				width={width}
				src={src}
				alt={alt}
				className="h-full w-full object-cover object-center p-4 transition-transform hover:scale-105"
			/>
		</div>
	);
};
