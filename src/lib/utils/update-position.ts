export function updatePosition(targetEl: HTMLElement, clickX: number, clickY: number) {
	const rect = targetEl.getBoundingClientRect();

	return { x: rect.left + clickX + window.scrollX, y: rect.top + clickY + window.scrollY };
}
