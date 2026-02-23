const db = require("../db"); // your database connection

// PUBLIC — active services only
exports.getServices = (req, res) => {
  // For now, return dummy data (array of objects)
  const services = [
    {
      id: 1,
      name: "Dental Cleaning",
      description: "Professional teeth cleaning",
      image: "cleaning.jpg",

    },
    {
      id: 2,
      name: "Tooth Extraction",
      description: "Safe and painless extraction",
      image: "extraction.jpg",
     
    },
    {
      id: 3,
      name: "Teeth Whitening",
      description: "Brighten your smile",
      image: "whitening.jpg",
   
    }
  ];

  res.json(services); // React expects an array, not a string
};

// You can keep these placeholders for now
exports.getAllServices = (req, res) => res.send("getAllServices works");
exports.addService = (req, res) => res.send("addService works");
exports.updateService = (req, res) => res.send("updateService works");
exports.deleteService = (req, res) => res.send("deleteService works");
