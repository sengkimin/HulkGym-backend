import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn} from "typeorm";

@Entity('company')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string; // UUID as a primary key
  @Column({ type: 'varchar', length: 255})
  company_name: string;

  @Column({ type: 'varchar', length: 255 })
  address: string; // Activity title

  @Column({ type: 'varchar', length: 255 })
  email: string; // Activity icon (emoji or text)

  @Column({ type: 'varchar', length: 255 })
  phone_number: number; // Number of sets

  @Column({ type: 'varchar', length: 255 })
  open_time: Date; // Number of reps per set

  @Column({ type: 'varchar', length: 255 })
  close_time: Date; // Current set (default: 1)

  @CreateDateColumn()
  createAt: Date; // Timestamp of creation

  @UpdateDateColumn()
  updateAt: Date; // Timestamp of last update

}