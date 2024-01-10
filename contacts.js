const { readFile, writeFile } = require("fs/promises");
const path = require("path");

const contactsPath = path.join('./db/contacts.json', "contacts.json");