import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,} from "typeorm";

@Entity('workout_plan')
export class WorkoutPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255})
  exercise_name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

}