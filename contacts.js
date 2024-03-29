import { readFile, writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function readContactsFile() {
  try {
    const data = await readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function writeContactsFile(contacts) {
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf-8");
}

async function listContacts() {
  const contacts = await readContactsFile();
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await readContactsFile();
  const contact = contacts.find(({ id }) => id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await readContactsFile();
  const index = contacts.findIndex(({ id }) => id === contactId);

  if (index === -1) {
    return null;
  }

  const [removedContact] = contacts.splice(index, 1);
  await writeContactsFile(contacts);

  return removedContact;
}

async function addContact(name, email, phone) {
  const contacts = await readContactsFile();
  const newContact = { id: Date.now(), name, email, phone };
  contacts.push(newContact);
  await writeContactsFile(contacts);

  return newContact;
}

export { listContacts, getContactById, removeContact, addContact };

