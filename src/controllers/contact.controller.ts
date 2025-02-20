import { Request, Response } from "express";
import { AppDataSource } from "../config";
import { Contact } from "../entity/contact.entity";

export const createContact = async (req: Request, res: Response) => {
    const contactRepository = AppDataSource.getRepository(Contact);
       // const brandId = req.body.brandId ?? ""; 

    try {
        const { branchId, phone_number, email} = req.body;

        // Validate required fields
        if ( !branchId || !phone_number || !email ) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Create a new contact
        const contact = new Contact();
        contact.branch_id = branchId;
        contact.phone_number = phone_number;
        contact.email = email;
        

        // If branchId exists and is needed
        // if (branchId) {
        //     contact.branch = { id: branchId } as any; // Assuming branch is an entity
        // }

        await contactRepository.save(contact);

        return res.status(201).json({ success: true, message: "Contact created successfully", contact });
    } catch (err) {
        console.error("Error creating contact:", err);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
};


export const getContact = async (req: Request, res: Response) => {
    const activityRepository = AppDataSource.getRepository(Contact);
    // const userId = req.user?.id ?? ""

    try {
        const contacts = await activityRepository.find({
            // where: { user: {id: userId} },
            select: {
              id: true,
              branch_id:true,
              phone_number: true,
              email: true,
             
            },
          });
          
        console.log(contacts)
        return res.status(200).json({ message: "Success", contacts });
  
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: 'Internal server error!' });
    }
  };


export const getContactById = async (req: Request, res: Response) => {
    const activityRepository = AppDataSource.getRepository(Contact);
    const { id } = req.params; 

    try {
        
        const contact = await activityRepository.findOne({
            where: { id }, 
            select: {
                id: true,
                branch_id: true,
                phone_number: true,
                email: true,
            },
        });
        
        if (!contact) {
            return res.status(404).json({ success: false, message: "Contact not found" });
        }

        return res.status(200).json({ success: true, message: "Success", contact });
  
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
};
