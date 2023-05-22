
const yargs = require("yargs");
const {hideBin} = require("yargs/helpers")

const contactsService = require("./db/contacts.js");

const  invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contactsService.listContacts();
      console.log(allContacts);
      break;

    case "get":
      const oneContact = await contactsService.getContactById(id);
      console.log(oneContact);
      break;

    case "add":
      const newContact = await contactsService.addContact({
        name,
        phone,
        email,
      });
      console.log(newContact);
      break;

    case "remove":
      const removeContact = await contactsService.removeContact(id);
      console.log(removeContact);
      break;

    case "update":
      const updateContacts = await contactsService.updateContacts(id, {name, email, phone});
      console.log(updateContacts);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const arr = hideBin(process.argv);
const { argv } = yargs(arr);
invokeAction(argv);