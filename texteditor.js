function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function insert_str (str, index, add) {
    return_str = str.slice(0,index)
    return_str += add 
    return_str += str.slice(index)
    return return_str
}

function remove_str (str, index) {
    return_str = str.slice(0,index)
    return_str += str.slice(index+1)
    return return_str
}

function insert (array, index, str) {
    return_array = []
    for (var i = 0; i < index; i++) {
        return_array.push(array[i])
    }
    return_array.push(str)
    for (var i = index; i < array.length; i++) {
        return_array.push(array[i])
    }
    return return_array
}

function remove_element (array, index) {
    return_array = []
    for (var i = 0; i < index; i++) {
        return_array.push(array[i])
    }
    for (var i = index+1; i < array.length; i++) {
        return_array.push(array[i])
    }
    return return_array
}

function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}

lines = [""]
let editor = document.getElementsByClassName("Editor")[0]
var cursor = document.getElementsByClassName("Cursor")[0]
let textArea = document.getElementsByClassName("EditorText")[0]
textArea.addEventListener("focusin", function() {
    cursor.style.display = "block"
})
textArea.addEventListener("focusout", function() {
    cursor.style.display = "none"
})
cursor.style.left = 51 + "px"
cursor.style.top = 28 + "px"
cursorX = 0 
cursorY = 0

function colorcode (lines) {
    text = ""
    in_quotes = false;
    for (var f = 0; f < lines.length; f++) {
        line = lines[f]
        for (var i = 0; i < line.length; i++) {
            if (line[i] == "(" || line[i] == "[" || line[i] == "{" || line[i] == ")" || line[i] == "]" || line[i] == "}" && !in_quotes) {
                text += "<span style='color:yellow;'>" + line[i] + "</span>"
            }
            else if (line[i] == "="  && !in_quotes) {
                text += "<span style='color: lightgreen'>=</span>"
            } 
            else if (isNumeric(line[i]) && !in_quotes) {
                text += "<span style='color: rgb(72, 121, 255)'>"+line[i]+"</span>"
            }
            else if (line[i] == "d" && line[i+1] == "e" && line[i+2] == "f" && i < line.length - 2 && !in_quotes) {
                text += "<span style='color: rgb(72, 121, 255)'>def</span>"
                i += 2
            }
            // function
            else if (line[i] == "f" && line[i+1] == "u" && line[i+2] == "n" && line[i+3] == "c" && line[i+4] == "t" && line[i+5] == "i" && line[i+6] == "o" && line[i+7] == "n" && i < line.length - 7 && !in_quotes) {
                text += "<span style='color: rgb(72, 121, 255)'>function</span>"
                i += 7
            }
            // return
            else if (line[i] == "r" && line[i+1] == "e" && line[i+2] == "t" && line[i+3] == "u" && line[i+4] == "r" && line[i+5] == "n" && i < line.length - 5 && !in_quotes) {
                text += "<span style='color: rgb(72, 121, 255)'>return</span>"
                i += 5
            }
            // if
            else if (line[i] == "i" && line[i+1] == "f" && i < line.length - 1 && !in_quotes) {
                text += "<span style='color: rgb(72, 121, 255)'>if</span>"
                i += 1
            }
            // else
            else if (line[i] == "e" && line[i+1] == "l" && line[i+2] == "s" && line[i+3] == "e" && i < line.length - 3 && !in_quotes) {
                text += "<span style='color: rgb(72, 121, 255)'>else</span>"
                i += 3
            }
            // true 
            else if (line[i] == "t" && line[i+1] == "r" && line[i+2] == "u" && line[i+3] == "e" && i < line.length - 3 && !in_quotes) {
                text += "<span style='color: cyan'>true</span>"
                i += 3
            }
            // false
            else if (line[i] == "f" && line[i+1] == "a" && line[i+2] == "l" && line[i+3] == "s" && line[i+4] == "e" && i < line.length - 4 && !in_quotes) {
                text += "<span style='color: cyan'>false</span>"
                i += 4
            }
            else if (line[i] == "\"") {
                if (!in_quotes) {
                    in_quotes = true
                    text += "<span style='color: green'>\""
                } else {
                    in_quotes = false
                    text += "\"</span>"
                }
            }
            else if (line[i] == " ") {
                text += "&nbsp"
            }
            else {
                text += line[i]
            }
        }
        text += "<br>"
    }
    return text
}

function textEditor(event) {
    let key = event.key
    var evt = event || window.event
    if ( evt.keyCode === 9 ) {
        evt.preventDefault()
        lines[cursorY] = insert_str(lines[cursorY], cursorX, "    ")
        cursorX += 4
    }
    else if (key == "Backspace") {
        if (cursorX == 0 && lines.length > 1) {
            cursorX = lines[cursorY-1].length
            lines[cursorY-1] += lines[cursorY]
            lines = remove_element(lines, cursorY)
            var array = editor.getElementsByClassName("LineNumbering")
            editor.removeChild(array[array.length-1])
            cursorY -= 1 
        } else if (cursorX > 0) {
            cursorX -= 1
            lines[cursorY] = remove_str(lines[cursorY],cursorX)
        } 
    }
    else if (key == "Delete") {
        if (cursorX < lines[cursorY].length) {
            lines[cursorY] = remove_str(lines[cursorY],cursorX)
        }
    }
    else if (key == "Enter") {
        let lineNumbering = document.createElement("p")
        lineNumbering.className = "LineNumbering"
        lineNumbering.innerHTML = lines.length+1
        lineNumbering.style.top = 10 + 24*lines.length + "px"
        editor.appendChild(lineNumbering)
        lines = insert(lines, cursorY+1, lines[cursorY].slice(cursorX))
        lines[cursorY] = lines[cursorY].slice(0, cursorX)
        cursorY += 1
        cursorX = 0
    }
    else if (key == "ArrowLeft" && cursorX > 0) {
        cursorX -= 1
    }
    else if (key == "ArrowRight" && cursorX < lines[cursorY].length) {
        cursorX += 1
    }
    else if (key == "ArrowUp" && cursorY > 0) {
        if (lines[cursorY].length > 0)  {
            cursorX = Math.floor((cursorX / lines[cursorY].length)*lines[cursorY-1].length)
        } else {
            cursorX = 0
        }
        cursorY -= 1
    }
    else if (key == "ArrowDown" && cursorY < lines.length - 1) {
        if (lines[cursorY].length > 0) {
            cursorX = Math.floor((cursorX / lines[cursorY].length)*lines[cursorY+1].length)
        } else {
            cursorX = 0
        }
        cursorY += 1
    }
    else if (key != "Meta" && key != "Shift" && key.slice(0,5) != "Arrow" && key != "Control") {
        lines[cursorY] = insert_str(lines[cursorY],cursorX,key)
        cursorX += 1
    } 
    cursor.style.left = 51 + getTextWidth(lines[cursorY].slice(0,cursorX), "normal 14pt CodeFont") + "px"
    cursor.style.top = 28 + 24*cursorY + "px"
    result = colorcode(lines)
    textArea.innerHTML = result
    compile();
}

// TODO:
 
// enable UI for multiple visualize()
// enable user to not show variable
// Samples
// show error animation
// enable copy & paste code
// blllinking cursor