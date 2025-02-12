import { Request, Response } from "express";
import { AppDataSource } from "../config";
import { Branch } from "../entity/branch.entity";
import { Company } from "../entity/company.entity";

const branchRepository = AppDataSource.getRepository(Branch);
const companyRepository = AppDataSource.getRepository(Company);

export const getBranch = async (req: Request, res: Response) => {
    try {
        const branch = await branchRepository.find({ relations: ["company"] });
        return res.status(200).json({ message: "Success", branch });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
};



export const createBranch = async (req: Request, res: Response) => {
    try {
        console.log("Received request:", req.body); // Log incoming request

        const branchRepository = AppDataSource.getRepository(Branch);
        const companyRepository = AppDataSource.getRepository(Company);
        const { name, address, company_id } = req.body;

        console.log("Finding company with ID:", company_id);
        const company = await companyRepository.findOne({ where: { id: company_id } });

        if (!company) {
            console.log("Company not found!");
            return res.status(404).json({ message: "Company not found" });
        }

        console.log("Creating new branch...");
        const branch = await branchRepository.save({ name, address, company });

        console.log("Branch created successfully:", branch);
        return res.status(201).json({ message: "Branch created successfully", branch });

    } catch (err) {
        console.error("Error creating branch:", err);
        return res.status(500).json({ message: "Internal server error!" });
    }
};


export const updateBranch = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await branchRepository.update(id, req.body);
        return res.status(200).json({ message: "Branch updated" });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
};

export const deleteBranch = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await branchRepository.delete(id);
        return res.status(200).json({ message: "Branch deleted" });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
};
