const { log } = require("console");
const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid")


const contactsPath = path.join(__dirname, "contacts.json");
const updateContact = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));


const listContacts = async() => {
  const data = await fs.readFile(contactsPath)
  return JSON.parse(data);
}

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  return result;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContact(contacts);
  return result;
}

const addContact= async (data) => {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    ...data,
  }
  contacts.push(newContact);
  await updateContact(contacts);
  return newContact;
}


const updateContacts = async (id, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);
    if (index === -1) {
      return null;
    }
  contacts[index] = { id, ...data };
  await updateContact(contacts);
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContacts,
};
