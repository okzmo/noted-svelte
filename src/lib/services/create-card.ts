interface CreateCardProps {
	config: {
		apiKey: string;
		boardId: string;
	};
	card_title: string;
	card_description: string;
	selectionCoords: {
		x: number;
		y: number;
		width: number;
		height: number;
	};
	name: string;
}

export const CreateACard = async ({
	config,
	card_title,
	card_description,
	selectionCoords,
	name
}: CreateCardProps) => {
	const formData = new FormData();
	formData.append('boardId', config.boardId);
	formData.append('name', name);
	formData.append('card_title', card_title);
	formData.append('card_description', card_description);
	formData.append('location', location.href);
	formData.append('selectionCoords', JSON.stringify(selectionCoords));
	formData.append('viewportHeight', window.innerHeight.toString());
	formData.append('viewportWidth', window.innerWidth.toString());

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
