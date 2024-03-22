export async function GET(request: NextRequest): Promise<Response> {
	return new Response(
		JSON.stringify({
			message: "Hello from the API",
		}),
		{
			headers: {
				"content-type": "application/json",
			},
		},
	);
}
