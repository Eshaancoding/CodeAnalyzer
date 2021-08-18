function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function insert_str(str, index, add) {
    return_str = str.slice(0, index)
    return_str += add
    return_str += str.slice(index)
    return return_str
}

function remove_str(str, index) {
    return_str = str.slice(0, index)
    return_str += str.slice(index + 1)
    return return_str
}

function insert(array, index, str) {
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

function remove_element(array, index) {
    return_array = []
    for (var i = 0; i < index; i++) {
        return_array.push(array[i])
    }
    for (var i = index + 1; i < array.length; i++) {
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

function show_tutorial() {
    document.getElementsByClassName("main")[0].style.opacity = "0.4"
    document.getElementsByClassName("main")[0].style.pointerEvents = "none"
    document.getElementsByClassName("Tutorial")[0].style.opacity = "1"
    document.getElementsByClassName("Tutorial")[0].style.pointerEvents = "all"
    document.getElementsByClassName("Tutorial")[0].style.display = "block"
}

function hide_tutorial() {
    document.getElementsByClassName("Tutorial")[0].style.opacity = "0"
    document.getElementsByClassName("Tutorial")[0].style.pointerEvents = "none"
    document.getElementsByClassName("main")[0].style.opacity = "1"
    document.getElementsByClassName("main")[0].style.pointerEvents = "all"
    document.getElementsByClassName("Tutorial")[0].style.display = "none"
}

lines = [""]
let editor = document.getElementsByClassName("Editor")[0]
var cursor = document.getElementsByClassName("Cursor")[0]
let textArea = document.getElementsByClassName("EditorText")[0]
let errorDiv = document.getElementsByClassName("Error")[0]
textArea.addEventListener("focusin", function () {
    cursor.style.display = "block"
})
textArea.addEventListener("focusout", function () {
    cursor.style.display = "none"
})
cursor.style.left = 51 + "px"
cursor.style.top = 28 + "px"
cursorX = 0
cursorY = 0

function colorcode(lines) {
    text = ""
    in_quotes = false;
    for (var f = 0; f < lines.length; f++) {
        line = lines[f]
        for (var i = 0; i < line.length; i++) {
            if (line[i] == "(" || line[i] == "[" || line[i] == "{" || line[i] == ")" || line[i] == "]" || line[i] == "}" && !in_quotes) {
                text += "<span style='color:yellow;'>" + line[i] + "</span>"
            }
            else if (line[i] == "=" && !in_quotes) {
                text += "<span style='color: lightgreen'>=</span>"
            }
            else if (isNumeric(line[i]) && !in_quotes) {
                text += "<span style='color: rgb(72, 121, 255)'>" + line[i] + "</span>"
            }
            // function
            else if (line[i] == "f" && line[i + 1] == "u" && line[i + 2] == "n" && line[i + 3] == "c" && line[i + 4] == "t" && line[i + 5] == "i" && line[i + 6] == "o" && line[i + 7] == "n" && i < line.length - 7 && !in_quotes) {
                text += "<span style='color: rgb(72, 121, 255)'>function</span>"
                i += 7
            }
            // return
            else if (line[i] == "r" && line[i + 1] == "e" && line[i + 2] == "t" && line[i + 3] == "u" && line[i + 4] == "r" && line[i + 5] == "n" && i < line.length - 5 && !in_quotes) {
                text += "<span style='color: rgb(72, 121, 255)'>return</span>"
                i += 5
            }
            // if
            else if (line[i] == "i" && line[i + 1] == "f" && line[i + 2] == " " && i < line.length - 2 && !in_quotes) {
                text += "<span style='color: rgb(72, 121, 255)'>if&nbsp</span>"
                i += 2
            }
            // else
            else if (line[i] == "e" && line[i + 1] == "l" && line[i + 2] == "s" && line[i + 3] == "e" && i < line.length - 3 && !in_quotes) {
                text += "<span style='color: rgb(72, 121, 255)'>else</span>"
                i += 3
            }
            // true 
            else if (line[i] == "t" && line[i + 1] == "r" && line[i + 2] == "u" && line[i + 3] == "e" && i < line.length - 3 && !in_quotes) {
                text += "<span style='color: cyan'>true</span>"
                i += 3
            }
            // false
            else if (line[i] == "f" && line[i + 1] == "a" && line[i + 2] == "l" && line[i + 3] == "s" && line[i + 4] == "e" && i < line.length - 4 && !in_quotes) {
                text += "<span style='color: cyan'>false</span>"
                i += 4
            }
            // for
            else if (line[i] == "f" && line[i + 1] == "o" && line[i + 2] == "r" && i < line.length - 2 && !in_quotes) {
                text += "<span style='color: rgb(72, 121, 255)'>for</span>"
                i += 2
            }
            // visualize
            else if (line[i] == "v" && line[i + 1] == "i" && line[i + 2] == "s" && line[i + 3] == "u" && line[i + 4] == "a" && line[i + 5] == "l" && line[i + 6] == "i" && line[i + 7] == "z" && line[i + 8] == "e" && i < line.length - 8 && !in_quotes) {
                text += "<span style='color: cyan'>visualize</span>"
                i += 8
            }
            // while
            else if (line[i] == "w" && line[i + 1] == "h" && line[i + 2] == "i" && line[i + 3] == "l" && line[i + 4] == "e" && i < line.length - 4 && !in_quotes) {
                text += "<span style='color: rgb(72, 121, 255)'>while</span>"
                i += 4
            }
            // var
            else if (line[i] == "v" && line[i + 1] == "a" && line[i + 2] == "r" && i < line.length - 2 && !in_quotes) {
                text += "<span style='color: rgb(72, 121, 255)'>var</span>"
                i += 2
            }
            // let
            else if (line[i] == "l" && line[i + 1] == "e" && line[i + 2] == "t" && i < line.length - 2 && !in_quotes) {
                text += "<span style='color: rgb(72, 121, 255)'>let</span>"
                i += 2
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

function textEditor(event, lines_to_set = []) {
    if (is_running) {
        return
    }

    if (lines_to_set.length != 0) {
        lines = lines_to_set
        cursorY = lines.length - 1
        cursorX = lines[cursorY].length
        cursor.style.left = 51 + getTextWidth(lines[cursorY].slice(0, cursorX), "normal 14pt CodeFont") + "px"
        cursor.style.top = 28 + 24 * cursorY + "px"
        result = colorcode(lines)
        textArea.innerHTML = result
        if (lines.length > editor.getElementsByClassName("LineNumbering").length) {
            for (i = editor.getElementsByClassName("LineNumbering").length; i < lines.length; i++) {
                let lineNumbering = document.createElement("p")
                lineNumbering.className = "LineNumbering"
                lineNumbering.innerHTML = i + 1
                lineNumbering.style.top = 10 + 24 * i + "px"
                editor.appendChild(lineNumbering)
            }
        } else {
            let line_length = editor.getElementsByClassName("LineNumbering").length
            for (i = lines.length; i < line_length; i++) {
                let array = editor.getElementsByClassName("LineNumbering")
                editor.removeChild(array[array.length - 1])
            }
        }
        return
    }

    errorDiv.style.display = "none"

    let key = event.key
    var evt = event || window.event
    if (evt.keyCode === 9) {
        evt.preventDefault()
        lines[cursorY] = insert_str(lines[cursorY], cursorX, "    ")
        cursorX += 4
    }
    else if (key == "Backspace") {
        if (cursorX == 0 && cursorY > 0) {
            cursorX = lines[cursorY - 1].length
            lines[cursorY - 1] += lines[cursorY]
            lines = remove_element(lines, cursorY)
            var array = editor.getElementsByClassName("LineNumbering")
            editor.removeChild(array[array.length - 1])
            cursorY -= 1
        } else if (cursorX > 0) {
            cursorX -= 1
            lines[cursorY] = remove_str(lines[cursorY], cursorX)
        }
    }
    else if (key == "Delete") {
        if (cursorX < lines[cursorY].length) {
            lines[cursorY] = remove_str(lines[cursorY], cursorX)
        }
    }
    else if (key == "Enter") {
        let lineNumbering = document.createElement("p")
        lineNumbering.className = "LineNumbering"
        lineNumbering.innerHTML = editor.getElementsByClassName("LineNumbering").length + 1
        lineNumbering.style.top = 10 + 24 * editor.getElementsByClassName("LineNumbering").length + "px"
        editor.appendChild(lineNumbering)
        lines = insert(lines, cursorY + 1, lines[cursorY].slice(cursorX))
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
        if (lines[cursorY].length > 0) {
            cursorX = Math.floor((cursorX / lines[cursorY].length) * lines[cursorY - 1].length)
        } else {
            cursorX = 0
        }
        cursorY -= 1
    }
    else if (key == "ArrowDown" && cursorY < lines.length - 1) {
        if (lines[cursorY].length > 0) {
            cursorX = Math.floor((cursorX / lines[cursorY].length) * lines[cursorY + 1].length)
        } else {
            cursorX = 0
        }
        cursorY += 1
    }
    else if (key != "Meta" && key != "Shift" && key.slice(0, 5) != "Arrow" && key != "Control") {
        lines[cursorY] = insert_str(lines[cursorY], cursorX, key)
        cursorX += 1
    }
    cursor.style.left = 51 + getTextWidth(lines[cursorY].slice(0, cursorX), "normal 14pt CodeFont") + "px"
    cursor.style.top = 28 + 24 * cursorY + "px"
    result = colorcode(lines)
    textArea.innerHTML = result
}

function mergeSort(array) {
    const half = array.length / 2

    // Base case or terminating case
    if (array.length < 2) {
        return array
    }

    const left = array.splice(0, half)
    return merge(mergeSort(left), mergeSort(array))
}

function merge(left, right) {
    let arr = []
    // Break out of loop if any one of the array gets empty
    while (left.length && right.length) {
        // Pick the smaller among the smallest element of left and right sub arrays 
        if (left[0] < right[0]) {
            arr.push(left.shift())
        } else {
            arr.push(right.shift())
        }
    }

    // Concatenating the leftover elements
    // (in case we didn't go through the entire left or right array)
    return [...arr, ...left, ...right]
}