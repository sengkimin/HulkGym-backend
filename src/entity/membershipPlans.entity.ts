import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class MembershipPlan {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  // Store the price as a decimal (numeric type)
  @Column({nullable: true})
  price: string;

  @Column('simple-array')
  features: string[];

  // Timestamps for created_at and updated_at
  @CreateDateColumn()
  created_at: Date; 

  @UpdateDateColumn()
  updated_at: Date; 
}
