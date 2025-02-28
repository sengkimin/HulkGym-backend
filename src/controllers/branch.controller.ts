import { Request, Response } from "express";
import { AppDataSource } from "../config";
import { Branch } from "../entity/branch.entity";
import { Company } from "../entity/company.entity";

const branchRepository = AppDataSource.getRepository(Branch);
const companyRepository = AppDataSource.getRepository(Company);

export const getBranch = async (req: Request, res: Response) => {
    try {
        const branchRepository = AppDataSource.getRepository(Branch);
        const branches = await branchRepository.find({ relations: ["company"] });
        return res.status(200).json({ message: "Success", branches });
    } catch (err) {
        console.error("Error fetching branches:", err);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
};


export const createBranch = async (req: Request, res: Response) => {
    try {
        console.log("Received request:", req.body); 
        
        const { name, address, company_id , image } = req.body;
        const companyRepository = AppDataSource.getRepository(Company);
        const company = await companyRepository.findOne({ where: { id: company_id } });

        if (!company) {
            return res.status(404).json({ message: "Company not found!" });
        }
        console.log("Creating new branch...");
        const branchRepository = AppDataSource.getRepository(Branch);
        const branch = branchRepository.create({ name, address, company , image});
        await branchRepository.save(branch);

        console.log("Branch created successfully:", branch);
        return res.status(201).json({ message: "Branch created successfully", branch });
    } catch (err) {
        console.error("Error creating branch:", err);
        return res.status(500).json({ message: "Internal server error!" });
    }
};


export const updateBranch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const branchRepository = AppDataSource.getRepository(Branch);

    try {
        const branchId = /^[0-9a-fA-F-]{36}$/.test(id) ? id : Number(id);
        if (!branchId) return res.status(400).json({ message: "Invalid branch ID format" });

        const branch = await branchRepository.findOne({ where: { id: branchId as any }, relations: ["company"] });

        if (!branch) return res.status(404).json({ message: "Branch not found" });

        await branchRepository.update(branch.id, req.body);

        const updatedBranch = await branchRepository.findOne({ where: { id: branch.id }, relations: ["company"] });

        return res.status(200).json({ message: "Branch updated successfully", updatedBranch });
    } catch (err) {
        console.error("Error updating branch:", err);
        return res.status(500).json({ message: "Internal server error!" });
    }
};

export const deleteBranch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const branchRepository = AppDataSource.getRepository(Branch);

    try {
        const branchId = /^[0-9a-fA-F-]{36}$/.test(id) ? id : Number(id);
        if (!branchId) return res.status(400).json({ message: "Invalid branch ID format" });

        const branch = await branchRepository.findOne({ where: { id: branchId as any } });
        if (!branch) return res.status(404).json({ message: "Branch not found" });

        await branchRepository.delete(branch.id);

        return res.status(200).json({ message: "Branch deleted successfully" });
    } catch (err) {
        console.error("Error deleting branch:", err);
        return res.status(500).json({ message: "Internal server error!" });
    }
};


export const getBranchById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const branchRepository = AppDataSource.getRepository(Branch);

    try {
        const branchId = /^[0-9a-fA-F-]{36}$/.test(id) ? id : Number(id);
        if (!branchId) return res.status(400).json({ message: "Invalid branch ID format" });

        const branch = await branchRepository.findOne({ 
            where: { id: branchId as any }, 
            relations: ["company"]
        });
        if (!branch) return res.status(404).json({ message: "Branch not found" });

        return res.status(200).json({ message: "Success", branch });
    } catch (err) {
        console.error("Error fetching branch by ID:", err);
        return res.status(500).json({ message: "Internal server error!" });
    }
};
