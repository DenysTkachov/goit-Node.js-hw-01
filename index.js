


import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} from "./contacts.js";

import yargs from "yargs";
const argv = yargs(process.argv.slice(2)).argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.log("List of contacts:", await listContacts());
      break;

    case "get":
      console.log("Contact by ID:", await getContactById(id));
      break;

    case "add":
      console.log("Added contact:", await addContact(name, email, phone));
      break;

    case "remove":
      console.log("Removed contact:", await removeContact(id));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

(async () => {
  await invokeAction(argv);
})();


