function apply_style(str) {
    //keywords without indentation

    str = str.replace(/^use\b/,keyword("use"))
    str = str.replace(/^type\b/,keyword("type"))
    str = str.replace(/^rule\b/,keyword("rule"))
    str = str.replace(/^return\b/,keyword("return"))
    str = str.replace(/^object\b/,keyword("object"))
    str = str.replace(/^module\b/,keyword("module"))
    str = str.replace(/^class\b/,keyword("class"))
    str = str.replace(/^alias\b/,keyword("alias"))
    str = str.replace(/^hide\b/,keyword("hide"))

    //keywords with indentation
    str = str.replace(/\bfrom\b/,keyword("from"))

    //imperative keywords
    str = str.replace(/\bvoid\b/,imperative("void"))
    str = str.replace(/\bnew\b/,imperative("new"))
    str = str.replace(/\bset\b/,imperative("set"))
    str = str.replace(/\blet\b/,imperative("let"))
    str = str.replace(/\bprint\b/,imperative("print"))
    str = str.replace(/\bread\b/,imperative("read"))
    str = str.replace(/\bwrite\b/,imperative("write"))
    str = str.replace(/\bapply\b/,imperative("apply"))
    str = str.replace(/\bbegin\b/,imperative("begin"))
    str = str.replace(/\bwait\b/,imperative("wait"))

    //data types keywords
    str = str.replace(/\bOrdinal\b/,types("Ordinal"))
    str = str.replace(/\bList\b/,types("List"))
    str = str.replace(/\bArray\b/,types("Array"))
    str = str.replace(/\bSet\b/,types("Set"))
    str = str.replace(/\bHash\b/,types("Hash"))

    // control flow keywords
    str = str.replace(/\bdo\b/,control("do"))
    str = str.replace(/\bdone\b/,control("done"))
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
    str = str.replace(/\bmiss\b/,control("miss"))
    str = str.replace(/\btry\b/,control("try"))
    str = str.replace(/\bfinal\b/,control("final"))
    str = str.replace(/\brepeat\b/,control("repeat"))
    str = str.replace(/\bother\b/,control("other"))
    str = str.replace(/\bthen\b/,control("then"))

    // interruption statements
    str = str.replace(/\bexpect\b/,interrupt("expect"))
    str = str.replace(/\bpass\b/,interrupt("pass"))
    str = str.replace(/\babort\b/,interrupt("abort"))
    str = str.replace(/\bexit\b/,interrupt("exit"))
    str = str.replace(/\bpanic\b/,interrupt("panic"))
    str = str.replace(/\bfail\b/,interrupt("fail"))
    str = str.replace(/\bretry\b/,interrupt("retry"))
    str = str.replace(/\braise\b/,interrupt("raise"))
    str = str.replace(/\bcontinue\b/,interrupt("continue"))
    str = str.replace(/\bstop\b/,interrupt("stop"))
    str = str.replace(/\bredo\b/,interrupt("redo"))
    str = str.replace(/\bnext\b/,interrupt("next"))

    //keyword operators
    str = str.replace(/\bas\b/,operator("as"))
    //symbol operators
    str = str.replace(/==/,operator("=="))
    str = str.replace(/:=/,operator(":="))
    str = str.replace(/\+=/,operator("+="))
    str = str.replace(/-=/,operator("-="))
    str = str.replace(/\/=/,operator("/="))
    str = str.replace(/\*=/,operator("*="))
    str = str.replace(/:=/,operator(":="))
    str = str.replace(/::/,operator("::"))
    str = str.replace(/<</,operator("<<"))
    str = str.replace(/>>/,operator(">>"))
    str = str.replace(/!=/,operator("!="))
    str = str.replace(/!≡/,operator("!≡"))
    //str = str.replace(/U\+/g,operator("U+"))
    //str = str.replace(/U\-/g,operator("U-"))
    str = str.replace(/∈/g,operator("∈"))
    str = str.replace(/≡/,operator("≡"))
    str = str.replace(/≥/,operator("≥"))
    str = str.replace(/≤/,operator("≤"))
    str = str.replace(/⊕/,operator("⊕"))
    str = str.replace(/≈/,operator("≈"))
    str = str.replace(/≠/,operator("≠"))

    //questionable
    str = str.replace(/\|/g,operator("|"))
    str = str.replace(/\&/g,operator("&"))
    str = str.replace(/\~/g,operator("~"))
    str = str.replace(/\+/g,operator("+"))
    str = str.replace(/\-/g,operator("-"))
    str = str.replace(/\*/g,operator("*"))
    //str = str.replace(/\=/g,operator("="))


    // System & built-in variables
    str = str.replace(/\bself\b/g,builtin("self"))

    return str
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
    return "<span class=\"comment\">" + str + "</span>"
}

function keyword(str) {
    return "<span class=\"keyword\">" + str + "</span>"
}

function imperative(str) {
    return "<span class=\"impera\">" + str + "</span>"
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

function builtin(str) {
    return "<span class=\"builtin\">"+ str + "</span>"
}
