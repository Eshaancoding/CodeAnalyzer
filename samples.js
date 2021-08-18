let sample_element = document.getElementsByClassName("Samples")[0]
sample_element.style.pointerEvents = "none"
sample_element.style.display = "none"

function toggle_samples () {
    console.log(sample_element) 
    if (sample_element.style.pointerEvents == "none") {
        sample_element.style.pointerEvents = "all"
        sample_element.style.display = "block"
    }
    else if (sample_element.style.pointerEvents == "all") {
        sample_element.style.pointerEvents = "none"
        sample_element.style.display = "none"
    }
}


function set_sample (type) {
    if (type == "Functions") {
        textEditor(NaN, 
        [
            "function compare (a, b) {", 
            "   if (a == b) {",
            "       return true",
            "   }",
            "   else {",
            "       return false",
            "   }",
            "}",
            "let a = 6",
            "let b = 5",
            "result = compare(a, b)",
            "visualize()"
        ])
    }
    else if (type == "Insertation") {
        textEditor(NaN, 
        [
            "let input_array = [6,3,2,4,2]",
            "let n = input_array.length",
            "for (let i = 1; i < n; i++) {",
            "   let current = input_array[i]",
            "   let j = i - 1",
            "   while ((j > -1) && (current < input_array[j])) {",
            "       input_array[j+1] = input_array[j]",
            "       j--",
            "   }",
            "   input_array[j+1] = current",
            "   visualize()",
            "}"
        ])
    }
    else if (type == "Bubble") {
        textEditor(NaN, 
        [
            "let input_array = [6,3,2,4,2]",
            "for (var i = 0; i < input_array.length; i++) {",
            "   for (var j = 0; j < (input_array.length - i - 1); j++) {",
            "       if (input_array[j] > input_array[j+1]) {",
            "           var temp = input_array[j]",
            "           input_array[j] = input_array[j+1]",
            "           input_array[j+1] = temp",
            "           visualize()",
            "       }",
            "   }",
            "}"
        ])
    }
    else if (type == "Simple") {
        textEditor(NaN, 
        [
            "var x = 3", 
            "visualize()"
        ])
    }
    else if (type == "Loops") {
        textEditor(NaN,
        [
            "var i = 0",
            "for (var v = 0; v < 5; v++) {",
            "   i += v",
            "   visualize()",
            "}",
            "visualize()"
        ])
    }
}