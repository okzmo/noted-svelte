export const captureScreenshot = async () => {
	const state = {
		dom: document.documentElement.innerHTML,
		styles: getComputedStyles(),
		scroll: window.scrollY
	};
};
