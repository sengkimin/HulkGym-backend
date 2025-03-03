import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";


@Entity("workout_plan")
export class WorkoutPlan {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: "varchar", length: 255 })
  workout_plan_name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  
}