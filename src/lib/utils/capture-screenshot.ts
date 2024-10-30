export const captureScreenshot = async () => {
	const stream = await navigator.mediaDevices.getDisplayMedia({
		video: {
			displaySurface: 'browser',
			width: window.innerWidth,
			height: window.innerHeight
		}
	});

	const video = document.createElement('video');
	video.srcObject = stream;
	await video.play();

	const canvas = document.createElement('canvas');
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;

	const ctx = canvas.getContext('2d')!;
	ctx.drawImage(video, 0, 0);

	stream.getTracks().forEach((track) => track.stop());

	const dataUrl = canvas.toDataURL('image/png');
	const image = new Image();
	image.src = dataUrl;
	document.body.appendChild(image);

	return dataUrl;
};

function getBackgroundColor(): string {
	const bodyColor = getComputedStyle(document.body).backgroundColor;
	const rootColor = getComputedStyle(document.documentElement).backgroundColor;

	const isTransparent = (color: string) => {
		const rgba = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)/);
		return rgba && (rgba[4] === '0' || rgba[4] === '0.0');
	};

	if (bodyColor && !isTransparent(bodyColor)) {
		return bodyColor;
	}

	if (rootColor && !isTransparent(rootColor)) {
		return rootColor;
	}

	return '#ffffff';
}
