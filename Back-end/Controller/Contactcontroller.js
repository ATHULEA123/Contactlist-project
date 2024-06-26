const asyncHandler = require("express-async-handler");
const service = require("../services/contactservice");
const Contactvalidation = require("../config/contactvalidation");
// const contactModel = require("../Model/contactmodel");

const createcontact = asyncHandler(async (req, res) => {
  //postdata
  try {
    console.log("con", req.body);

    const { error } = Contactvalidation.validate(req.body);

    if (error) {
      return res.status(422).json({ message: "All ARE MANDATORY" });
    }

    const contact = await service.contactCreate(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteData = asyncHandler(async (req, res) => {
  //delete
  try {
    const id = req.params.id;
    console.log(id);
    const deleteDatas = await service.deleteContact(id);
    res.status(200).json(deleteDatas);
  } catch (error) {
    res.status(400).json({ message: "error in deleting data" });
  }
});



// const getcontact = asyncHandler(async (req, res) => {
//   try {
//     const contactlist = await service.getcontact();
//     res.status(200).json(contactlist);
//   } catch (error) {
//     res.status(400).json({ message: "error in fetching data" });
//   }
// });


// async function getAll(req, res) {
//   try {
//       const contacts = await service.getAll(req.query);
//       res.json(contacts);
//   } catch (error) {
//       res.status(500).json({ message: error.message });
//   }
 const getContacts = asyncHandler(async (req, res) => {
  const { searchTerm, page = 1, limit = 10 } = req.query;
  try {
    const contactList = await service.getcontact(searchTerm, parseInt(page), parseInt(limit));
    res.status(200).json(contactList);
  } catch (error) {
    console.error('Error in fetching contacts:', error);
    res.status(400).json({ message: "Error in fetching data" });
  }
});




//UPDATECOTACT

const updatingcontact = asyncHandler(async (req, res) => {
  try {
    const Id = req.params.id;

    const updatedData = {
      ...req.body,
    };

    const updatedata = await service.updatecontact(Id, updatedData);
    return res.status(200).json(updatedata);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = { createcontact, deleteData, getContacts, updatingcontact};
