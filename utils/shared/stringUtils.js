export const capitilizeFirstLetter = (word) => {
    return word.length !== 0 ? `${word.charAt(0).toUpperCase()}${word.slice(1)}` : null;
} 