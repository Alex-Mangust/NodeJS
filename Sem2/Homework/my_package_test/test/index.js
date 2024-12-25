const createElement = (tag, className = null, style = null) => {
    if (typeof tag !== 'string' || !/^[a-zA-Z][\w-]*$/.test(tag)) {
        console.error('Invalid tag name:', tag);
        return null;
    }
    let element;
    try {
        element = document.createElement(tag);
    } catch (error) {
        console.error('Error creating element:', error);
        return null;
    }

    if (className !== null) {
        element.classList.add(className);
    }
    if (typeof style === "object" && style !== null) {
        Object.keys(style).forEach(key => {
            element.style[key] = style[key];
        });
    }
    return element;
}

export { createElement };
