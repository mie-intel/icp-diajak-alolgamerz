let logString = "";

export function log(string, delim = "\n") {
    logString += string + delim;
}

export function getLog() {
    return logString;
}