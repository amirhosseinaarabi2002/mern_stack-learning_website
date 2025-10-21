const contactModel = require("./../../models/contact");
const nodemailer = require("nodemailer");

exports.getAll = async (req, res) => {
  const contacts = await contactModel.find({});
  return res.json(contacts);
};

exports.create = async (req, res) => {
  const { name, email, phone, body } = req.body;

  const contact = await contactModel.create({
    name,
    email,
    phone,
    body,
    answer: 0,
  });

  return res.status(201).json(contact);
};

exports.remove = async (req, res) => {
  // Validate ...
  const deletedContact = await contactModel.findOneAndRemove({
    _id: req.params.id,
  });

  if (!deletedContact) {
    return res.status(404).json({ message: "Contact not found !!" });
  }

  return res.json(deletedContact);
};

exports.answer = async (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "amirhosseinaarabi2002@gmail.com",
      pass: "pifu rvnx akns yccu",
    },
  });

  const mailOptions = {
    from: "amirhosseinaarabi2002@gmail.com",
    to: req.body.email,
    subject: "the response from amir",
    text: req.body.answer,
  };

  transporter.sendMail(mailOptions, async (err, info) => {
    if (err) {
      return res.json(err);
    } else {

      const contact = await contactModel.findOneAndUpdate({email: req.body.email}, {answer: 1})
      return res.json({
        message: "email sent!", contact
      });
    }
  });
};
