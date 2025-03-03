import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import { TypesOfWorkout } from "./workoutType.entity";


@Entity("exercise")
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => TypesOfWorkout)
  @JoinColumn({ name: "workout_type_id" })
  workoutType: TypesOfWorkout;

  @Column({ type: "varchar", length: 255 })
  exercise_name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}