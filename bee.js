function apply_style(str) {
    //keywords without indentation
    str = str.replace(/\bload\b/,keyword("load"))
    str = str.replace(/\btype\b/,keyword("type"))
    str = str.replace(/\brule\b/,keyword("rule"))
    str = str.replace(/\breturn\b/,keyword("return"))
    str = str.replace(/\bobject\b/,keyword("object"))

    //colorize data types keywords
    str = str.replace(/\bOrdinal\b/,types("Ordinal"))
    str = str.replace(/\bList\b/,types("List"))
    str = str.replace(/\bArray\b/,types("Array"))
    str = str.replace(/\bSet\b/,types("Set"))
    str = str.replace(/\bHash\b/,types("Hash"))

    // control flow keywords
    str = str.replace(/\bdo\b/,control("do"))
    str = str.replace(/\bdone\b/,control("done"))
    str = str.replace(/\brepeat\b/,control("repeat"))
    str = str.replace(/\bif\b/,control("if"))
    str = str.replace(/\belse\b/,control("else"))
    str = str.replace(/\btask\b/,control("task"))
    str = str.replace(/\bwith\b/,control("with"))
    str = str.replace(/\bcycle\b/,control("cycle"))
    str = str.replace(/\bwhile\b/,control("while"))
    str = str.replace(/\bfor\b/,control("for"))
    str = str.replace(/\bmatch\b/,control("match"))
    str = str.replace(/\bwhen\b/,control("when"))
    str = str.replace(/\btrial\b/,control("trial"))
    str = str.replace(/\bcase\b/,control("case"))
    str = str.replace(/\bother\b/,control("other"))
    str = str.replace(/\bfinal\b/,control("final"))
    // interruption statements
    str = str.replace(/\bpass/,interrupt("pass"))
    str = str.replace(/\babort/,interrupt("abort"))
    str = str.replace(/\bfail/,interrupt("fail"))
    str = str.replace(/\bretry/,interrupt("retry"))
    str = str.replace(/\braise/,interrupt("raise"))
    str = str.replace(/\bapply/,interrupt("apply"))
    str = str.replace(/\bprint/,interrupt("print"))
    str = str.replace(/\bread/,interrupt("read"))

    //operators
    str = str.replace(/xxx/,operator("xxx"))

    return str
}


function line_span(str) {
    var span = document.createElement("span");
    return "<span class=\"line\">"+ str + "</span>"
}

function title(str) {
    return "<span class=\"title\">"+ str + "</span>"
}

function subtitle(str) {
    return "<span class=\"subtitle\">"+ str + "</span>"
}

function comments(str) {
    return "<span class=\"comment\">"+ str + "</span>"
}

function keyword(str) {
    return "<span class=\"keyword\">"+ str + "</span>"
}

function types(str) {
    return "<span class=\"type\">"+ str + "</span>"
}

function control(str) {
    return "<span class=\"control\">"+ str + "</span>"
}

function interrupt(str) {
    return "<span class=\"interrupt\">"+ str + "</span>"
}

function operator(str) {
    return "<span class=\"operator\">"+ str + "</span>"
}

function strings(str) {
    return "<span class=\"string\">"+ str + "</span>"
}

function bee_render() {
    const bee_code = document.getElementsByClassName("language-bee");
    if (typeof(bee_code) != "undefined") {
        let i = 0
        let t = ""
        let comment = ""
        let start_comments = false
        for (e of bee_code ) {
            if (e.tagName =="CODE") {
                lines = e.innerText.split("\n")
                // format each line
                for (line of lines) {
                    //check if line is empty
                    if (i == 0 && line =="") {
                        i += 1
                        continue
                    }
                    //check if start with comments
                    if (line.trim().substr(0,2)=="\+\-" || start_comments) {
                        start_comments = true
                        line = comments(line)
                    } else if (line.trim().substr(0,1)=="#") {
                        line = title(line)
                        start_comments = false
                    } else if (line.trim().substr(0,2)=="**") {
                        line = subtitle(line)
                        start_comments = false
                    } else {
                        //split away end comments //
                        parts = line.split("\-\-")
                        if (parts.length > 1) {
                            line = parts[0]
                            comment = "-- " + parts[1]
                        } else {
                            comment = ""
                        }
                        //avoid style in strings
                        if (line.search(/\"/) > 0) {
                            parts = line.split('"');
                            line  = ""; j = 0
                            for (part of parts) {
                                if (j == 1) {
                                    line  += strings('"' + part + '"')
                                    j = 0
                                } else {
                                    line  += apply_style(part)
                                    j = 1
                                }
                            }
                        } else {
                            line  = apply_style(line)
                        }
                        //reattach comments
                        if (comment!="") {
                            line = line + comments(comment)
                        }
                    }
                    //add new line if required
                    i += 1
                    if (i < lines.length || line!="") {
                       t += line_span(line)
                    }
                    //check if end of comments
                    if (line.search(/\-\+/)>0) {
                        start_comments = false
                    }
                }
                start_comments = false
                e.innerHTML = t;
                t = ""; i = 0
            }
            start_comments = false
        }
    } else {
      console.log("not_found")
    }
}