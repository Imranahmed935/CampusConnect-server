import { model, Schema } from "mongoose";


const admissionSchema = new Schema({
  selectedCollege: { type: String, required: true, trim: true },
  CandidateName: { type: String, required: true, trim: true },
  subject: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  number: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  date: { type: String, required: true, trim: true },
  image: { type: String, required: true },
});


export const Admission = model("Admission", admissionSchema);
