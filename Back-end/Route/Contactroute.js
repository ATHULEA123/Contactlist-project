const express = require("express");
const router = express.Router();

const {createcontact,deleteData,getContacts, updatingcontact} = require("../Controller/Contactcontroller")

router.route("/contact").post(createcontact);
router.route("/contact").get(getContacts);
router.route("/contact/:id").delete(deleteData)
router.route("/contact/:id").put(updatingcontact)

// router.route("/contact").get(getAll)

module.exports = router;