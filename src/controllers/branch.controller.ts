import { Request, Response } from "express";
import { AppDataSource } from "../config";
import { Branch } from "../entity/branch.entity";
import { Company } from "../entity/company.entity";

export const getBranch = async (req: Request, res: Response) => {
    const branchRepository = AppDataSource.getRepository(Branch);
    const userId = req.user?.id ?? "";

    try {
        const branches = await branchRepository.find({
            // where: { company: { id: userId } },
            relations: ["company"], 
            select: { id: true, name: true, address: true },
        });

        return res.status(200).json({ message: "Success", branches });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
};

export const createBranch = async (req: Request, res: Response) => {
    // const branchRepository = AppDataSource.getRepository(Branch);
    // const companyRepository = AppDataSource.getRepository(Company);
    // const { name, address, company_id } = req.body;

    // try {
    //     const foundCompany = await companyRepository.findOne({ 
    //             where: { id: Number(company_id) } });
    //     if (!foundCompany) return res.status(404).json({ message: "Company not found" });

    //     const branch = branchRepository.create({ name, address, company_id , company: foundCompany });
    //     await branchRepository.save(branch);

    //     return res.status(201).json({ message: "Branch created", branch });
    // } catch (err) {
    //     return res.status(500).json({ success: false, message: "Internal server error!" });
    // }
};


