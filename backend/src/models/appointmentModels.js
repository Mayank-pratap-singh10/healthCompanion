import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,

      required: true,
    },

    docId: {
      type: String,

      required: true,
    },

    Date: {
      type: Number,
      required: true,
    },

    slotTime: {
      type: String,
      required: true,
    },
    slotDate: {
      type: String,
      required: true,
    },
    userData: {
      type: Object,
      required: true,
    },
    docData: {
      type: Object,
      required: true,
    },

    
    

    payment: {
      type: Boolean,

      default: false,
    },

    amount: {
      type: Number,
      required: true,
    },

    cancelled: {
      type: Boolean,
      default: false,
    },
    isCompleted:{
        type:Boolean,
        default:false
    }
  },
  {
    timestamps: true,
  },
);

// Prevent double booking (same doctor, same date, same slot)
appointmentSchema.index(
  { docId: 1, Date: 1, slotTime: 1 },
  { unique: true },
);

const Appointment =mongoose.model.appointment || mongoose.model("Appointment", appointmentSchema);

export default Appointment;
