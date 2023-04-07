function debounce(func, wait) {
    let timeout;
    return () => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(func, wait)
    }
}

export const onType = (func) => debounce(() => {
    func()
}, 500);

// const searchField = document.querySelector('#searchField')
// searchField.addEventListener('keydown', onType)