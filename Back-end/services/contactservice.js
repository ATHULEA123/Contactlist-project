const contactModel = require("../Model/contactmodel");

const contactCreate = async (data) => {
  const { salutation, firstname, lastname, phone, gender, email } = data;

  return await contactModel.create({
    salutation,
    firstname,
    lastname,
    phone,
    gender,
    email,
  });
};

// delete
async function deleteContact(id) {
  console.log(id);
  try {
    const deleteContct = await contactModel.findByIdAndDelete(id);

    if (!deleteContct) {
      throw new Error("Employee Not found");
    }
    return deleteContct;
  } catch {
    throw new Error("Error in deleting Employee");
  }
}


const getcontact = async (searchTerm, page, limit) => {
  try {
    const skip = (page - 1) * limit;
    const pipeline = [];

    if (searchTerm) {
      pipeline.push({
        $match: {
          $or: [
            { salutation: { $regex: searchTerm, $options: "i" } },
            { firstname: { $regex: searchTerm, $options: "i" } },
            { lastname: { $regex: searchTerm, $options: "i" } },
            { email: { $regex: searchTerm, $options: "i" } },
            { gender: { $regex: searchTerm, $options: "i" } },
            { phone: { $regex: searchTerm, $options: "i" } },
          ],
        },
      });
    }

    pipeline.push(
      { $sort: { createdAt: -1 } }, // Sort by creation date
      { $skip: skip },
      { $limit: limit }
    );

   
    const aggregatePipeline = [
      { $facet: {
          contacts: pipeline,
          totalCount: [{ $count: "total" }],
        }
      }
    ];

    const results = await contactModel.aggregate(aggregatePipeline);

   
    const contacts = results[0].contacts;
    const totalContacts = results[0].totalCount[0].total;

    // const totalContacts = results[0].totalCount.length > 0 ? results[0].totalCount[0].total : 0;

    return {
      contacts,
      totalPages: Math.ceil(totalContacts / limit),
      currentPage: page,
      totalItems: totalContacts,
    };
  } catch (err) {
    console.error("Error in getContacts:", err);
    throw new Error("Error in fetching data");
  }
};

//UPADATE CONTACT

async function updatecontact(id, data) {
  try {
    const updatedata = await contactModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedata) {
      console.log("error in update");
    }
    return updatedata;
  } catch (error) {
    throw new Error("error in updating contact");
  }
}

module.exports = { contactCreate, deleteContact, getcontact, updatecontact };
