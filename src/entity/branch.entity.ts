import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
// import { Company } from './company.entity'; // ✅ Ensure this import exists

@Entity('branch')
export class Branch {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // @ManyToOne(() => Company, (company) => company.branch, { onDelete: 'CASCADE' })
    // @JoinColumn({ name: 'company_id' })
    // company: Company;
    @Column({ type: 'varchar', length: 255 })
    company_id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    address: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}