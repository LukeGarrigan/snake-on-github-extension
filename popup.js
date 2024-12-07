console.log('This is a popup!');

const nodes = window.parent.document.querySelectorAll('[data-date]')
console.log(nodes);
setInterval(() => {
    for (const node of nodes) {
        console.log('Setting node', Math.random() * 4 + 1);
        node.setAttribute('data-level', Math.random() * 4 + 1);
    }
}, 100);