const loremString = String.raw`[32] Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, 
explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia 
consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui 
dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius 
modi tempora inci[di]dunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, 
quis nostrum[d] exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi 
consequatur? [D]Quis autem vel eum i[r]ure reprehenderit, qui in ea voluptate velit esse, quam nihil 
molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?

[32] But I must explain to you how all this mistaken idea of reprobating pleasure and extolling pain arose. 
To do so, I will give you a complete account of the system, and expound the actual teachings of the great 
explorer of the truth, the master-builder of human happiness. No one rejects, dislikes or avoids pleasure 
itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally 
encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues 
or desires to obtain pain of itself, because it is pain, but occasionally circumstances occur in 
which toil and pain can procure him some great pleasure. To take a trivial
example, which of us ever undertakes laborious physical exercise, except to obtain 
some advantage from it? But who has any right to find fault with a man who chooses to enjoy a 
pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?

[33] At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum 
deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non 
provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum 
fuga. Et harum quidem reru[d]um facilis est e[r]t expedita distinctio. Nam libero tempore, cum soluta 
nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat facere possimus, 
omnis voluptas assumenda est, omnis dolor repellend[a]us. Temporibus autem quibusdam et aut officiis 
debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non 
recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores 
alias consequatur aut perferendis doloribus asperiores repellat.

[33] On the other hand, we denounce with righteous indignation and dislike men who are so beguiled 
and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee 
the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty 
through weakness of will, which is the same as saying through shrinking from toil and pain. These cases 
are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammeled 
and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and 
every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of 
business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise 
man therefore always holds in these matters to this principle of selection: he rejects pleasures to 
secure other greater pleasures, or else he endures pains to avoid worse pains.

`

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomChunkSize() {
    const randNum = Math.random() * 100;
    if (randNum > 75) { return 20 }
    else if (randNum > 50) { return 10 }
    return 2
}

async function typeText(screenText) {
    let m = 0;
    while (true) {
            const n = m;
            m += getRandomChunkSize();
            const c = loremString.substring(n, m);
            screenText.value += c;
            screenText.scrollTop = screenText.scrollHeight;
            await sleep(100);

            if (m > loremString.length) { break; }
    }
}

// For later use :)

async function brokenTypeText(screenText) {
    let m = 0;
    while (true) {
            const n = m;
            const c = loremString.substring(n);
            screenText.value += c;
            screenText.scrollTop = screenText.scrollHeight;
            await sleep(100);

            if (m > loremString.length) { break; }
    }
}

// Using boot style sheet for aesthetic
document.addEventListener('DOMContentLoaded', async () => {
    const bootScreen = document.createElement('div');
    bootScreen.id = "bootScreen";

    const screenText = document.createElement('textarea');
    screenText.spellcheck = false;
    screenText.id = "bootScreenText";
    bootScreen.append(screenText);

    document.body.append(bootScreen);
    await typeText(screenText);
    await sleep(500);
});