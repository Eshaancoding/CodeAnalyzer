function show_error (contents) {
    errorDiv.innerHTML = "<br>" + contents
    errorDiv.style.display = "block"
    set_run(false)
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
var submitDiv = document.getElementsByClassName("Run")[0]
var is_running = false

function add_to_array (array, value, set) {
    array[value] = set 
}

function set_run (bool) {
    if (bool == true) {
        is_running = true
        submitDiv.innerHTML = "<br>Running..."
        submitDiv.style.backgroundColor = "gray"
    } else {
        is_running = false
        submitDiv.innerHTML = "<br>Run"
        submitDiv.style.backgroundColor = "green"
    }
}

function compile () {
    if (is_running == false) {
        set_run(true)
    } else {
        return
    }
    // reset linenumbering background
    for (var i = 0; i < document.getElementsByClassName("linenumbering").length; i++) {
        document.getElementsByClassName("linenumbering")[i].style.backgroundColor = "transparent"
    }
    if (waitId != -1) {
        clearTimeout(waitId)
        errorDiv.style.display = "none"
        waitId = -1
    }
    var code = "async function start () {var variables_for_visualizer = {}; "
    var invalid_variable = ""
    var variables = []
    for (var i = 0; i < lines.length; i++) {
        let line = String(lines[i])
        // determine variables
        if (line.trim() == "") {
            continue
        } 
        if (line[line.length - 1] == ";") {
            // remove semicolon, we automatically place it
            line = remove_str(line, line.length - 1)
        }

        // append code 
        if (line.replace(/ /g,'') == "visualize()") {
            code += "await visualize(variables_for_visualizer, "+i+"); "
        }
        else if (line.trim().startsWith("for")) {
            code += line + " "
            line = line.trim().substring(line.trim().indexOf("(") + 1, line.trim().indexOf(";"))
        }
        else if (line.indexOf("}") != -1) {
            code += line
        }
        else {
            code += line + "; "
        }
        
        // search for variables in line
        if (line.trim().startsWith("if")) {
            continue
        }

        if (line.replace(/ /g,'').indexOf("=") != -1) {
            end = line.trim().search("=")
            if (line.trim().indexOf("var") != -1) {
                start = line.trim().indexOf("var") + 3
            }
            else if (line.trim().indexOf("let") != -1) {
                start = line.trim().indexOf("let") + 3
            } 
            else if (line.indexOf("+=") != -1) {
                start = 0 
                end = line.trim().indexOf("+=")
            }
            else if (line.indexOf("-=") != -1) {
                start = 0 
                end = line.trim().indexOf("-=")
            }
            else if (line.indexOf("*=") != -1) {
                start = 0 
                end = line.trim().indexOf("*=")
            }
            else if (line.indexOf("/=") != -1) {
                start = 0 
                end = line.trim().indexOf("/=")
            }
            else if ((line.trim().indexOf("(") != -1 && line.trim().indexOf(")") != -1) || (line.trim().indexOf("[") != -1 && line.trim().indexOf("]") != -1) || line.trim().substring(0, line.trim().search("=")).trim() in variables){
                start = 0
            }
            else {
                show_error("global variables are not allowed")
                return
            }
            var var_name = line.trim().substring(start, end).trim()
            code += "add_to_array(variables_for_visualizer, '"+var_name+"', "+var_name+"); "
            variables[var_name] = 0
        }   
    }
    if (invalid_variable != "") {
        show_error("Please use a different variable other than " + invalid_variable)
        return
    }
    code += "set_run(false); } start().catch(show_error)"

    try {
        console.log("code: " + code)
        eval(code) // run the code
    } 
    catch (e) {
        console.log("code: " + code)  
        show_error(e)
    }
}
function bblSort(arr){
     
    for(var i = 0; i < arr.length; i++){
        
      // Last i elements are already in place  
      for(var j = 0; j < ( arr.length - i -1 ); j++){
          
        // Checking if the item at present iteration 
        // is greater than the next iteration
        if(arr[j] > arr[j+1]){
            
          // If the condition is true then swap them
          var temp = arr[j]
          arr[j] = arr[j + 1]
          arr[j+1] = temp
        }
      }
    }
    // Print the sorted array
    console.log(arr);
   }