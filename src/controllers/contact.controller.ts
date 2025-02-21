import { Request, Response } from "express";
import { AppDataSource } from "../config";
import { Contact } from "../entity/contact.entity";
import { Branch } from "../entity/branch.entity";

export const createContact = async (req: Request, res: Response) => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const branchRepository = AppDataSource.getRepository(Branch);
  const { phone_number, email } = req.body;
  const branchID = req.params?.id;

  if (!phone_number || !email) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  try {
    const branchId = await branchRepository.findOne({
      where: { id: branchID },
    });
    console.log("------ ", branchId);

    if (!branchId) {
      return res
        .status(404)
        .json({ success: false, message: "No branch found in the database" });
    }

    const contact = new Contact();
    contact.branch = branchId;
    contact.phone_number = phone_number;
    contact.email = email;
    await contactRepository.save(contact);

    return res
      .status(201)
      .json({
        success: true,
        message: "Contact created successfully",
        contact,
      });
  } catch (err) {
    console.error("Error creating contact:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
};

export const getContact = async (req: Request, res: Response) => {
  const contactRepository = AppDataSource.getRepository(Contact);

  try {
    const contacts = await contactRepository.find({
      relations: ["branch"],
    });

    console.log(contacts);
    return res.status(200).json({ message: "Success", contacts });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
};

export const getContactById = async (req: Request, res: Response) => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const branchID = req.params?.id;

  try {
    const contact = await contactRepository.findOneBy({ id: branchID });

    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }

    return res.status(200).json({ success: true, message: "Success", contact });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
};

export const updateById = async (req: Request, res: Response) => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const { phone_number, email } = req.body;
  const branchID = req.params?.id;

  try {
    const contact = await contactRepository.findOneBy({ id: branchID });
    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }
    contact.phone_number = phone_number;
    contact.email = email;
    await contactRepository.save(contact);

    return res.status(200).json({ success: true, message: "Success", contact });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const branchID = req.params?.id;

  try {
    const contact = await contactRepository.findOneBy({ id: branchID });

    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }
    await contactRepository.remove(contact);

    return res.status(200).json({ message: "delete contact success" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
};
