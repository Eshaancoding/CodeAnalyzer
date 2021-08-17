function show_error (contents) {
    errorDiv.innerHTML = "<br>" + contents["type"] + " Error at line " + contents["line"] + ": " + contents["message"]
    errorDiv.style.display = "block"
}

function count_str (str, search) {
    var count = 0
    for (var i = 0; i < str.length; i++) {
        if (str[i] == search) {
            count++
        }
    }
    return count
}

var waitId = -1
let errorDiv = document.getElementsByClassName("Error")[0]

function add_to_array (array, value) {
    if (array.indexOf(value) == -1) {
        array.push(value)
    }
}

function compile () {
    if (waitId != -1) {
        clearTimeout(waitId)
        errorDiv.style.display = "none"
        waitId = -1
    }
    var code = "variables = []; "
    for (var i = 0; i < lines.length; i++) {
        let line = String(lines[i])
        // determine variables
        if (line.trim() == "") {
            continue
        } 
        
        // append code 
        if (line.replace(/ /g,'') == "visualize()") {
            code += "visualize(variables); "
        }
        else if (line.trim().startsWith("for")) {
            code += line + " "
            line = line.trim().substring(line.trim().indexOf("(") + 1, line.trim().indexOf(";"))
        }
        else {
            code += line + "; "
        }
        
        // search for variables in line
        if (line.trim().startsWith("if")) {
            continue
        }

        if (line.replace(/ /g,'').search("=") != -1) {
            var var_name = line.trim().substring(0, line.search("=")).trim()
            code += "add_to_array(variables, '"+var_name+"'); "
        }   
    }
    try {
        console.log("Code: " + code) 
        eval(code) // run the code
    } 
    catch (e) {
        waitId = setTimeout(function () {
            show_error(e)
        }, 2000)
    }
}