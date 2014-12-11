function withBoxUnlocked(body) {

    if (box.locked === true) {
        box.unlock()
    };
    try {
        body
    } finally {
        box.lock()
    };

}

withBoxUnlocked(function() {
    box.content.push("gold piece");
});

try {
    withBoxUnlocked(function() {
        throw new Error("Pirates on the horizon! Abort!");
    });
} catch (e) {
    console.log("Error raised:", e);
}
console.log(box.locked);
// → true
