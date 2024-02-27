import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
});

export const Employee = mongoose.model("Employee", employeeSchema);
