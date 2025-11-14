import mongoose from '../mongooseClient';
import { AcademicDeptPrograms } from '../constants';

export interface IFacultyAdvisor extends mongoose.Document {
    name: string;
    email: string;
    department: string;
    program: string;
    address: string;
    phoneNumber: string;
    passwordHash: string;
    otp?: string;
    otpExpires?: Date;
}

const facultyAdvisorSchema = new mongoose.Schema<IFacultyAdvisor>({
    name: {
        type: String,
        required: true,
        maxLength: 100,
    },
    address: {
        type: String,
        required: true,
        maxLength: 200,
    },
    phoneNumber: {
        type: String,
        required: true,
        maxLength: 15,
        match: [/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, 'Please enter a valid phone number'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    department: {
        type: String,
        required: true,
        enum: {
            values: Object.keys(AcademicDeptPrograms),
            message: '{VALUE} is not a valid department',
        },
    },
    program: {
        type: String,
        required: true,
        validate: {
            validator: function (value: string) {
                const dept = (this as any).department;
                if (!dept || !AcademicDeptPrograms[dept]) return false;
                return AcademicDeptPrograms[dept].includes(value);
            },
            message: (props) =>
                `${props.value} is not a valid program for the selected department`,
        },
    },
    passwordHash: {
        type: String,
        required: true,
    },
    otp: { type: String },
    otpExpires: { type: Date }
});

const FacultyAdvisor = mongoose.model<IFacultyAdvisor>(
    'FacultyAdvisor',
    facultyAdvisorSchema,
);
export default FacultyAdvisor;
