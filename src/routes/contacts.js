const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const { Contact } = require("../models");

const router = express.Router();

// GET - /api/contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// GET - /api/contacts/:contactsId
router.get("/:contactId", async (req, res) => {
  try {
    const targetContact = await Contact.findById(req.params.contactId);
    if (!targetContact) {
      res.status(404).json({
        message: "Not found",
      });
      return;
    }
    res.json(targetContact);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// POST - api/contacts
router.post("/", async (req, res) => {
  try {
    const newContact = await Contact.create(req.body);
    res.json(newContact);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// DELETE - DELETE api/contacts/:contactId
router.delete("/:contactId", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.contactId);
    res.json({
      message: "Contact deleted successfully"
    })
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// PUT - /api/contacts/:contactId
router.put("/:contactId", async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedContact);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// PATCH - /api/contacts/:contactId/favorite
router.patch("/:contactId/favorite", async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);

    if (req.body.favorite === undefined || typeof req.body.favorite !== 'boolean') {
      return res.status(400).json({
        message: "Missing field favorite",
      });
    }

    if (contact) {
      const updatedContact = await Contact.findByIdAndUpdate(
        contactId,
        {
          favorite: req.body.favorite,
        },
        {
          new: true,
        }
      );
      res.json(updatedContact);
    } else {
      res.status(404).json({
        message: "Not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;