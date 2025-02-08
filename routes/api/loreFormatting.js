const ColorCodeHex = {
    DEFAULT: "000000",
    BLACK: "000000",
    DARK_BLUE: "0000aa",
    DARK_GREEN: "00aa00",
    DARK_AQUA: "00aaaa",
    DARK_RED: "aa0000",
    DARK_PURPLE: "aa00aa",
    GOLD: "ffaa00",
    GRAY: "aaaaaa",
    DARK_GRAY: "555555",
    BLUE: "5555ff",
    GREEN: "55ff55",
    AQUA: "55ffff",
    RED: "ff5555",
    LIGHT_PURPLE: "ff55ff",
    YELLOW: "ffff55",
    WHITE: "ffffff",
    MINECOOIN_GOLD: "ffaa00"
};

const MinecraftColorCodeToEnum = {
    "§0": ColorCodeHex.BLACK,
    "§1": ColorCodeHex.DARK_BLUE,
    "§2": ColorCodeHex.DARK_GREEN,
    "§3": ColorCodeHex.DARK_AQUA,
    "§4": ColorCodeHex.DARK_RED,
    "§5": ColorCodeHex.DARK_PURPLE,
    "§6": ColorCodeHex.GOLD,
    "§7": ColorCodeHex.GRAY,
    "§8": ColorCodeHex.DARK_GRAY,
    "§9": ColorCodeHex.BLUE,
    "§a": ColorCodeHex.GREEN,
    "§b": ColorCodeHex.AQUA,
    "§c": ColorCodeHex.RED,
    "§d": ColorCodeHex.LIGHT_PURPLE,
    "§e": ColorCodeHex.YELLOW,
    "§f": ColorCodeHex.WHITE,
    "§g": ColorCodeHex.MINECOOIN_GOLD
};

// object that represents formatting via CSS styling
class FormattedString {
    constructor() {
        this.content = "";
        this.colorCodeHex = ColorCodeHex.DEFAULT;
        this.isUnderline = false;
        this.isBold = false;
        this.isItalic = false;
        this.isStrikethrough = false;
        this.isCursed = false;
        this.isNewline = false;
    }

    clone() {
        return Object.assign(new FormattedString(), this);
    }
}

function assignColorCodeHex(code, formattedString) {
    if (MinecraftColorCodeToEnum[code]) {
        formattedString.colorCodeHex = MinecraftColorCodeToEnum[code];
    }
}

function assignFormatCode(code, formattedString) {
    switch (code) {
        case "§u":
            formattedString.isUnderline = true;
            break;
        case "§l":
            formattedString.isBold = true;
            break;
        case "§o":
            formattedString.isItalic = true;
            break;
        case "§m":
            formattedString.isStrikethrough = true;
            break;
        case "§k":
            formattedString.isCursed = true;
            break;
        case "§r":
            break;
        default:
            break;
    }
}

// convert a singular line of lore to an object that represents formatting via CSS styling
function fromString(s) {
    if (s == null) return [];

    const res = [];
    let currFormattedString = new FormattedString();
    let currString = "";
    let i = 0;

    while (i < s.length) {
        if (s[i] === '\n') {
            if (currString !== "") {
                currFormattedString.content = currString;
                res.push(currFormattedString);
                currFormattedString = currFormattedString.clone();
                currString = "";
            }
            res.push(new FormattedString());
            res[res.length - 1].isNewline = true;
        } else if (s[i] === "§" && i + 1 < s.length) {
            const code = "§" + s[i + 1];
            i++;

            if ((MinecraftColorCodeToEnum[code] || code === "§r") && currString !== "") {
                currFormattedString.content = currString;
                res.push(currFormattedString);
                currFormattedString = new FormattedString();
                currString = "";
                assignColorCodeHex(code, currFormattedString);
            } else {
                assignColorCodeHex(code, currFormattedString);
                assignFormatCode(code, currFormattedString);
            }
        } else {
            currString += s[i];
        }
        i++;
    }

    if (currString !== "") {
        currFormattedString.content = currString;
        res.push(currFormattedString);
    }

    return res;
}


exports.formatLoreString = function (loreString) {
    return fromString(loreString).map(part => {
        if (part.isNewline) return "<br>";
        let styles = [];
        if (part.colorCodeHex) styles.push(`color: #${part.colorCodeHex}`);
        if (part.isBold) styles.push("font-weight: bold");
        if (part.isItalic) styles.push("font-style: italic");
        if (part.isUnderline) styles.push("text-decoration: underline");
        if (part.isStrikethrough) styles.push("text-decoration: line-through");

        return `<span style="${styles.join('; ')}">${part.content}</span>`;
    }).join("")
} 
