
/**
 * Global navigation handler to redirect users to the Contact Us page.
 * Uses SPA-style navigation to avoid page reloads.
 * 
 * @param {Event} e - The click event object
 */
export const navigateToContact = (e) => {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    window.history.pushState({}, '', '/contact');
    window.dispatchEvent(new Event('popstate'));
    window.scrollTo(0, 0);
};
