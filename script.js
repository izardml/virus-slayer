// 5 80 5 80 5 80 5 80 5

var centerLine, line1, line2, line3, line4
var dNote, fNote, jNote, kNote
var dBtn, fBtn, jBtn, kBtn

function startGame() {
    myGameArea.start()

    centerLine = new component(10, 720, 'skyblue', 635, 0)

    line1 = new component(10, 720, 'skyblue', 455, 0)
    line2 = new component(10, 720, 'skyblue', 545, 0)
    line3 = new component(10, 720, 'skyblue', 725, 0)
    line4 = new component(10, 720, 'skyblue', 815, 0)

    dNote = new component(50, 50, 'red', 480, 0)
    fNote = new component(50, 50, 'red', 570, 0)
    jNote = new component(50, 50, 'red', 660, 0)
    kNote = new component(50, 50, 'red', 750, 0)

    dBtn = new component(80, 150, 'rgba(255, 255, 255, 0.5)', 465, 570)
    fBtn = new component(80, 150, 'rgba(255, 255, 255, 0.5)', 555, 570)
    jBtn = new component(80, 150, 'rgba(255, 255, 255, 0.5)', 645, 570)
    kBtn = new component(80, 150, 'rgba(255, 255, 255, 0.5)', 735, 570)
}

var myGameArea = {
    canvas: document.createElement('canvas'),
    start: function() {
        this.canvas.width = 1280
        this.canvas.height = 720
        this.context = this.canvas.getContext('2d')
        document.body.insertBefore(this.canvas, document.body.childNodes[0])
        this.interval = setInterval(updateGameArea, 10)
        window.addEventListener('keydown', function(e) {
            myGameArea.key = e.keyCode
        })
        window.addEventListener('keyup', function(e) {
            myGameArea.key = false
        })
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    stop: function() {
        clearInterval(this.interval)
    }
}

function component(width, height, color, x, y) {
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.update = function() {
        ctx = myGameArea.context
        ctx.fillStyle = color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x
        var myright = this.x + (this.width)
        var mytop = this.y
        var mybottom = this.y + (this.height)
        var otherleft = otherobj.x
        var otherright = otherobj.x + (otherobj.width)
        var othertop = otherobj.y
        var otherbottom = otherobj.y + (otherobj.height)
        var crash = true
        if((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false
        }
        return crash
    }
}

function updateGameArea() {
    if((dNote.crashWith(dBtn)) || (fNote.crashWith(fBtn)) || (jNote.crashWith(jBtn)) || (kNote.crashWith(kBtn))) {
        myGameArea.stop()
    }
    myGameArea.clear()

    centerLine.update()
    line1.update()
    line2.update()
    line3.update()
    line4.update()

    dNote.y++
    fNote.y++
    jNote.y++
    kNote.y++

    if(myGameArea.key && myGameArea.key == 68) { dNote.y += myGameArea.canvas.height }
    if(myGameArea.key && myGameArea.key == 70) { fNote.y += myGameArea.canvas.height }
    if(myGameArea.key && myGameArea.key == 74) { jNote.y += myGameArea.canvas.height }
    if(myGameArea.key && myGameArea.key == 75) { kNote.y += myGameArea.canvas.height }

    dNote.update()
    fNote.update()
    jNote.update()
    kNote.update()

    dBtn.update()
    fBtn.update()
    jBtn.update()
    kBtn.update()
}