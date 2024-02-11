export default function Test2Page({
	params: { data },
}: {
	params: { data: string };
}) {
	return (
		<>
			<h1 className="text-4xl  font-bold">Test2</h1>
			<p className="text-lg">
				####
				{data}
				#### Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Donec auctor, nunc nec
			</p>
		</>
	);
}
