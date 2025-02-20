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
// import { Branch } from './branch.entity'; 

@Entity('contact')
export class Contact {
    @PrimaryGeneratedColumn('uuid')
    id: string; // UUID as a primary key
  
    // @ManyToOne(() => Branch, (branch) => branch.contact)
    // @JoinColumn({ name: 'branch_id' })
    // branch: Branch; 

    @Column({ type: 'uuid', nullable: true })
    branch_id?: string;

    @Column({ type: 'varchar', length: 30 })
    phone_number: string; 
  
    @Column({ type: 'varchar', length: 30 })
    email: string; 
  
    @CreateDateColumn()
    created_at: Date; 
  
    @UpdateDateColumn()
    updated_at: Date; 
    
}
