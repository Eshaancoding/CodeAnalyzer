function max_value (array) {
    var value = array[0]
    for (var i = 0; i < array.length; i++) {
        if (array[i] > value) {
            value = array[i]
        }
    }
    return value
}

function visualize (variables) {
    let visualizerDiv = document.getElementsByClassName("Visualizer")[0]
    // first clear everything in visualizerDiv
    visualizerDiv.innerHTML = ""
    offset = 0
    for (var index in variables) { 
        let variable = variables[index]
        let content = NaN
        try {
            content = eval(variable)
        } 
        catch (e) {
            console.error("Retrieving variable error: " + e  + " Variable: " + variable)
        }
        if (content == undefined) {
            content = "undefined"
        }
        if (typeof(content) == "number") {
            let numberDiv = document.createElement("div")
            numberDiv.className = "VisualObject"
            numberDiv.innerHTML = "<br><br><span style='font-size: 30px; color: white'>" + variable + "</span><br><br><br><br><span style='font-size: 40px; color: rgb(100, 100, 255)'>" + content + "</span>"
            numberDiv.style.minWidth = "150px";
            numberDiv.style.left = offset + 50 + "px"
            visualizerDiv.appendChild(numberDiv)
            offset = parseInt(numberDiv.offsetWidth) + parseInt(numberDiv.style.left) 
        }
        else if (typeof(content) == "object") {
            let objectDiv = document.createElement("div")
            objectDiv.className = "VisualObject"
            objectDiv.innerHTML = "<br><br><span style='font-size: 30px; color: white'>" + variable + "</span"

            // draw graph
            let max_val = max_value(content)
            for (var i = 0; i < content.length; i++) {
                let lineDiv = document.createElement("div")
                lineDiv.style.backgroundColor = "white"
                lineDiv.style.color = "black"
                lineDiv.style.width = "30px"
                lineDiv.style.height = 56 * (content[i] / max_val) + "%"
                lineDiv.style.position = "absolute"
                lineDiv.style.bottom = "20px"
                lineDiv.style.left = 20 + 35*i + "px"
                lineDiv.innerHTML = content[i] 
                objectDiv.appendChild(lineDiv)
            }
            objectDiv.style.left = offset + 50 + "px"
            objectDiv.style.width = 10 + 35*(content.length-1) + "px"
            visualizerDiv.appendChild(objectDiv)
            offset = parseInt(objectDiv.offsetWidth) + parseInt(objectDiv.style.left) 
        }
        else if (typeof(content) == "string") {
            let stringDiv = document.createElement("div")
            stringDiv.className = "VisualObject"
            stringDiv.innerHTML = "<br><br><span style='font-size: 30px; color: white'>" + variable + "</span><br><br><br><br><span style='font-size: 40px; color: green'>" + content + "</span>"
            stringDiv.style.minWidth = "150px";

            stringDiv.style.left = offset + 50 + "px"
            visualizerDiv.appendChild(stringDiv)
            offset = parseInt(stringDiv.offsetWidth) + parseInt(stringDiv.style.left)        
        }
        else if (typeof(content) == "boolean") {
            let booleanDiv = document.createElement("div")
            booleanDiv.className = "VisualObject"
            color = "rgb(255,0 ,0)"
            if (content == true) {
                color = "rgb(0, 255, 0)"
            }
            booleanDiv.innerHTML = "<br><br><span style='font-size: 30px; color: white'>" + variable + "</span><br><br><br><br><span style='font-size: 40px; color:"+color+"'>" + content + "</span>"
            booleanDiv.style.minWidth = "150px";

            booleanDiv.style.left = offset + 50 + "px"
            visualizerDiv.appendChild(booleanDiv)
            offset = parseInt(booleanDiv.offsetWidth) + parseInt(booleanDiv.style.left)
        }
    }

}