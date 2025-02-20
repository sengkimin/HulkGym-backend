
import { Request, Response } from 'express';
import { AppDataSource } from '../config';
import { Company } from '../entity/company.entity';

const companyRepository = AppDataSource.getRepository(Company);

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred';
};

export const createCompany = async (req: Request, res: Response) => {
  try {
    const company = companyRepository.create(req.body);
    const result = await companyRepository.save(company);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
};

export const getAllCompanies = async (_req: Request, res: Response) => {
  try {
    const companies = await companyRepository.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

export const getCompanyById = async (req: Request, res: Response) => {
  try {
    const company = await companyRepository.findOneBy({ id: req.params.id });
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

export const updateCompany = async (req: Request, res: Response) => {
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

export const deleteCompany = async (req: Request, res: Response) => {
  try {
    const result = await companyRepository.delete(req.params.id);
    
    if (result.affected === 0) {
      return res.status(404).json({ message: 'Company not found' });
    }

    return res.status(200).json({ message: 'Company deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: getErrorMessage(error) });
  }
};

