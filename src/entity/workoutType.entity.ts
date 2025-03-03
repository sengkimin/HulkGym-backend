import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { WorkoutPlan } from "./workoutPlan.entity";

@Entity("types_of_workout")
export class TypesOfWorkout {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ type: "varchar", length: 255 })
  workout_type: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => WorkoutPlan)
  @JoinColumn({ name: "workout_plan_id" })
  workoutPlan: WorkoutPlan;
}