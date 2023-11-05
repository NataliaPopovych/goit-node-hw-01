const { nanoid } = require("nanoid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("db", "contacts.json");

// function returns the list of all contacts
async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}
// function returns contact by id
async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
}
// function removes contact and returns this removing contact
async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [deletedContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deletedContact;
}

// function adds new contact and returns it
async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
