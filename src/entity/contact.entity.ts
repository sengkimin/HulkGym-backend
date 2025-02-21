import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,

} from 'typeorm';
// import { Company } from './company.entity'; 
import { Branch } from './branch.entity'; 

@Entity('contact')
export class Contact {
    @PrimaryGeneratedColumn('uuid')
    id: string; // UUID as a primary key
  
    @ManyToOne(() => Branch, (branch) => branch.contacts)
    @JoinColumn({ name: 'branch_id' })
    branch: Branch; 

    @Column({ type: 'varchar', length: 30 })
    phone_number: string; 
      
    @CreateDateColumn()
    created_at: Date; 
  
    @UpdateDateColumn()
    updated_at: Date; 
    
}
