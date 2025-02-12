// src/controllers/companyController.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../config';
import { Company } from '../entity/company.entity';



const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred';
};


export const createCompany = async (req: Request, res: Response) => {
  const companyRepository = AppDataSource.getRepository(Company);
  const { email, address, company_name , phone_number, open_time, close_time,} = req.body;
  try {
    const company = new Company();
    company.email = email;
    company.address = address;
    company.company_name = company_name;
    company.phone_number = phone_number;
    company.open_time = open_time;
    company.close_time = close_time;
    await companyRepository.save(company);

    console.log(company);

    const result = await companyRepository.save(company);
    res.status(201).json({ messagcompanye: "Company created successfully", company: result });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error creating company" });
  }
};

export const getAllCompanies = async (req: Request, res: Response) => {
  const companyRepository = AppDataSource.getRepository(Company);
  try {
    const companies = await companyRepository.find();
    res.status(200).json(companies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching companies" });
  }
};

export const getCompanyById = async (req: Request, res: Response) => {
  const companyRepository = AppDataSource.getRepository(Company);
  try {
    const company = await companyRepository.findOne({ where: { id: req.params.id } });
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.status(200).json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching company" });
  }
};

export const updateCompany = async (req: Request, res: Response) => {
  const companyRepository = AppDataSource.getRepository(Company);
  try {
    const company = await companyRepository.findOneBy({ id: req.params.id });
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    const updatedCompany = companyRepository.merge(company, req.body);
    const result = await companyRepository.save(updatedCompany);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
};

// Delete a company
export const deleteCompany = async (req: Request, res: Response) => {
  const companyRepository = AppDataSource.getRepository(Company);
  try {
    const result = await companyRepository.delete(req.params.id);
    if (result.affected === 0) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};
