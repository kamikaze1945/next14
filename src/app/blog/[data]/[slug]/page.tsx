export default function Test2Page({
	params: { data, slug },
}: {
	params: { data: string, slug: string};
}) {
	return (
		<>
			<h1 className="text-4xl  font-bold">Test2</h1>
			<p className="text-lg">
				####
				{data} / {slug}
				#### Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Donec auctor, nunc nec
			</p>
		</>
	);
}
