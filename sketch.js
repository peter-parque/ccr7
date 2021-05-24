let font;
let transcript;
let authors = ["special", "mountAinmAn", "bateau"];
let messages = [];
let time = -1;  // in seconds

// cursor
let x = 0;
let y = 20;

function preload() {
    font = loadFont('SourceCodePro-Regular.ttf');
    transcript = loadStrings('transcript.txt');
}

function setup() {
    createCanvas(800,800);
    background('black');
    textSize(14);
    textFont(font);

    for (entry of transcript) {
        let splitLine = entry.split('#');
        let wipe = (splitLine[2] == 'Y') ? true : false;
        message = new Message(
            parseInt(splitLine[0]), 
            parseFloat(splitLine[1]), 
            wipe, 
            splitLine[3]
        );
        messages.push(message);
    }
    noLoop();
}

async function draw() {
    for (message of messages) {
        await new Promise(r => setTimeout(r, message.delay*1500));
        message.print();
    }
}

class Message {
    constructor(author, delay, wipe, message) {
        this.author = author;
        this.delay = delay;
        this.wipe = wipe;
        this.message = message;
    }

    print() {
        if (this.wipe) {
            background('black');
            x = 0;
            y = 20;
        }

        let username;
        let userWidth;

        switch(this.author) {
            case 0:  // special text
                textStyle(BOLD);
                fill(color('#00ff41'));  // matrix green
                text(this.message, x, y);
                y += 15;
                break;
            case 1:  // person 1
                // printing username
                username = authors[1] + ": ";
                userWidth = textWidth(username);
                textStyle(BOLD);
                fill(color('#a9dde2'));
                text(username, x, y);
                x += userWidth;

                // printing message
                textStyle(NORMAL);
                fill(color('white'));
                text(this.message, x, y);
                x = 0;
                y += 15
                break;
            case 2:  // person 2
                // printing username
                username = authors[2] + ": ";
                userWidth = textWidth(username);
                textStyle(BOLD);
                fill(color('#c1ac6d'));
                text(username, x, y);
                x += userWidth;

                // printing message
                textStyle(NORMAL);
                fill(color('white'));
                text(this.message, x, y);
                x = 0;
                y += 15
                break;

        }
    }
}
