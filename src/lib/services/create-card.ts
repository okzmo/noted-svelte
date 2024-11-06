interface CreateCardProps {
	config: {
		apiKey: string;
		boardId: string;
	};
	card_title: string;
	card_description: string;
	name: string;
}

export const CreateACard = async ({
	config,
	card_title,
	card_description,
	name
}: CreateCardProps) => {
	const formData = new FormData();
	formData.append('boardId', config.boardId);
	formData.append('name', name);
	formData.append('card_title', card_title);
	formData.append('card_description', card_description);
	formData.append('location', location.href);

	const res = await fetch('http://localhost:8000/create-card', {
		method: 'POST',
		headers: {
			'x-notion-key': config.apiKey
		},
		body: formData
	});

	const data = await res.json();

	if (!res.ok) {
		console.log(data);
		throw new Error('Failed to create card');
	}

	return data;
};
