const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require("./british-only.js")


class Translator {
    translateAmericanToBritish(american) {
        let markedAmerican = american;
        Object.keys(americanToBritishSpelling).forEach((item) => {
            american = american.replace(
                new RegExp(`(?<![A-Za-z-])${item}(?![A-Za-z-])`, "gi"),
                (match) => {
                    if (match[0] === match[0].toUpperCase()) {
                        return americanToBritishSpelling[item][0].toUpperCase() + americanToBritishSpelling[item].slice(1);
                    } else {
                        return americanToBritishSpelling[item][0].toLowerCase() + americanToBritishSpelling[item].slice(1);
                    }
                }
            );
            markedAmerican = markedAmerican.replace(
                new RegExp(`(?<![A-Za-z-])${item}(?![A-Za-z-])`, "gi"),
                (match) => {
                    if (match[0] === match[0].toUpperCase()) {
                        return "<span class=\"highlight\">" + americanToBritishSpelling[item][0].toUpperCase() + americanToBritishSpelling[item].slice(1) + "</span>";
                    } else {
                        return "<span class=\"highlight\">" + americanToBritishSpelling[item][0].toLowerCase() + americanToBritishSpelling[item].slice(1) + "</span>";
                    }
                }
            );
        });
        Object.keys(americanOnly).forEach((item) => {
            american = american.replace(
                new RegExp(`(?<![A-Za-z-])${item}(?![A-Za-z-])`, "gi"),
                (match) => americanOnly[item]
            );
            markedAmerican = markedAmerican.replace(
                new RegExp(`(?<![A-Za-z-])${item}(?![A-Za-z-])`, "gi"),
                (match) => "<span class=\"highlight\">" + americanOnly[item] + "</span>"
            );
        });
        Object.keys(americanToBritishTitles).forEach((item) => {
            american = american.replace(
                new RegExp(`(?<![A-Za-z-])${item.slice(0, -1)}\.(?![A-Za-z-])`, "g"),
                (match) => americanToBritishTitles[item]
            );
            markedAmerican = markedAmerican.replace(
                new RegExp(`(?<![A-Za-z-])${item.slice(0, -1)}\.(?![A-Za-z-])`, "g"),
                (match) => "<span class=\"highlight\">" + americanToBritishTitles[item] + "</span>"
            );
        });
        american = american.replace(
            new RegExp(`\\d?[0123456789]:\\d\\d`, "gi"),
            (match) => match.replace(":", ".")
        );
        markedAmerican = markedAmerican.replace(
            new RegExp(`\\d?[0123456789]:\\d\\d`, "gi"),
            (match) => "<span class=\"highlight\">" + match.replace(":", ".") + "</span>"
        );
        return [american, markedAmerican];
    }

    translateBritishToAmerican(british) {
        let markedBritish = british;
        Object.keys(americanToBritishSpelling).forEach((item) => {
            british = british.replace(
                new RegExp(`(?<![A-Za-z-])${americanToBritishSpelling[item]}(?![A-Za-z-])`, "gi"),
                (match, index) => {
                    if (match[0] === match[0].toUpperCase()) {
                        return item[0].toUpperCase() + item.slice(1);
                    } else {
                        return item[0].toLowerCase() + item.slice(1);
                    }
                }
            );
            markedBritish = markedBritish.replace(
                new RegExp(`(?<![A-Za-z-])${americanToBritishSpelling[item]}(?![A-Za-z-])`, "gi"),
                (match, index) => {
                    if (match[0] === match[0].toUpperCase()) {
                        return "<span class=\"highlight\">" + item[0].toUpperCase() + item.slice(1) + "</span>";
                    } else {
                        return "<span class=\"highlight\">" + item[0].toLowerCase() + item.slice(1) + "</span>";
                    }
                }
            );
        });
        Object.keys(britishOnly).forEach((item) => {
            british = british.replace(
                new RegExp(`(?<![A-Za-z-])${item}(?![A-Za-z-])`, "gi"),
                (match, index) => britishOnly[item]
            );
            markedBritish = markedBritish.replace(
                new RegExp(`(?<![A-Za-z-])${item}(?![A-Za-z-])`, "gi"),
                (match, index) => "<span class=\"highlight\">" + britishOnly[item] + "</span>"
            );
        });
        Object.keys(americanToBritishTitles).forEach((item) => {
            british = british.replace(
                new RegExp(`(?<![A-Za-z-])${americanToBritishTitles[item]}(?![A-Za-z-\\.])`, "g"),
                (match, index) => item
            );
            markedBritish = markedBritish.replace(
                new RegExp(`(?<![A-Za-z-])${americanToBritishTitles[item]}(?![A-Za-z-\\.])`, "g"),
                (match, index) => "<span class=\"highlight\">" + item + "</span>"
            );
        });
        british = british.replace(
            new RegExp(`\\d?[0123456789].\\d\\d`, "g"),
            (match, index) => match.replace(".", ":")
        );
        markedBritish = markedBritish.replace(
            new RegExp(`\\d?[0123456789].\\d\\d`, "g"),
            (match, index) => "<span class=\"highlight\">" + match.replace(".", ":") + "</span>"
        );
        return [british, markedBritish];
    }
}


module.exports = Translator;