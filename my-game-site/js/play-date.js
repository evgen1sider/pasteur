
function datePlay() {
    let stoped = false;
    let count = 0;
    while (!stoped) {
        count++;
        if(count === 100) {
            stoped = true;
        }
    }
    console.log(count)
}
datePlay();