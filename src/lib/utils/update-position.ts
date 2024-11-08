export function updatePosition(targetEl: HTMLElement, clickX: number, clickY: number) {
	const rect = targetEl.getBoundingClientRect();

	return { x: rect.left + clickX, y: rect.top + clickY };
}
