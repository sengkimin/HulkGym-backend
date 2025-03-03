import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { Company } from "./company.entity";
import { Contact } from "./contact.entity";

@Entity('branch')
export class Branch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @ManyToOne(() => Company, (company) => company.branch,)
  @JoinColumn({ name: 'company_id' })
  company: Company;
  

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;

  @OneToMany(() => Contact, (contact) => contact.branch)
  contacts: Contact[]; 
}
