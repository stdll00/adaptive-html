import {
    toArray
} from './utilityHelper';
import {
    cardTypes,
    isContainer
} from './adaptiveCardFilter';

function setOptions(obj, options) {
    Object.keys(options || {})
        .forEach(optionKey => {
            obj[optionKey] = options[optionKey];
        });
}

export function createCard(elements) {
    var card = {
        type: cardTypes.adaptiveCard,
        body: [],
        actions: [],
        version: '1.0'
    };
    var body = toArray(elements);
    if (Array.isArray(elements) &&
        elements.length === 1 &&
        isContainer(elements[0])) {
        body = toArray(unwrap(elements[0]));
    }
    card.body = body;
    return card;
}

export function createTextBlock(text, options) {
    var textBlock = {
        type: cardTypes.textBlock,
        text: text || '',
        wrap: true
    };
    setOptions(textBlock, options);
    return textBlock;
}

export function createHeadingTextBlock(text, depth) {
    var weight = 'bolder';
    var size = 'default';
    switch (depth) {
        case 1:
            size = 'extraLarge';
            break;
        case 2:
            size = 'large';
            break;
        case 3:
            size = 'medium';
            break;
        case 4:
            size = 'medium';
            weight = 'default';
            break;
        case 5:
            size = 'default';
            break;
        case 6:
            size = 'small';
            break;
    }
    return createTextBlock(text, {
        size,
        weight
    });
}

export function createImage(url, options) {
    var image = {
        type: cardTypes.image,
        url: url
    };
    setOptions(image, options);
    return image;
}

// Wrap adaptive card elements in a container
export function wrap(elements, options) {
    elements = toArray(elements);
    /* Don't wrap only a container in a container */
    if (elements.length === 1 &&
        isContainer(elements[0])) {
        return elements[0];
    }
    let container = {
        type: cardTypes.container,
        items: elements
    };
    setOptions(container, options);
    return container;
}

// Returns the list of elements within a container
// If the item passed in is not a container, it is simply returned
export function unwrap(container) {
    if (!isContainer(container)) {
        return toArray(container);
    }
    return (container.items || []); 
}

export default {
    createHeadingTextBlock,
    createTextBlock,
    createImage,
    createCard,
    wrap,
    unwrap
};