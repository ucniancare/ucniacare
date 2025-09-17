import { Timestamp } from "@angular/fire/firestore";
import { Appointment } from "../shared-interfaces/appointment";


export class AppointmentModel {

    static fromJson(json: any): Appointment {
        return {
            id: json.id,
            userId: json.userId,
            type: json.type,
            notes: json.notes,
            date: json.date,
            time: json.time,
            prefferedDoctor: json.prefferedDoctor,
            files: json.files,
            attendingDoctors: json.attendingDoctors,
            attendingNurses: json.attendingNurses,
            status: json.status,
            metaData: json.metaData
        };
    }

    static toJsonPartial(appointment: Partial<Appointment>): any {
        return {
            ...(appointment.id !== undefined && { id: appointment.id }),
            ...(appointment.userId !== undefined && { userId: appointment.userId }),
            ...(appointment.type !== undefined && { type: appointment.type }),
            ...(appointment.notes !== undefined && { notes: appointment.notes }),
            ...(appointment.date !== undefined && { date: appointment.date }),
            ...(appointment.time !== undefined && { time: appointment.time }),
            ...(appointment.prefferedDoctor !== undefined && { prefferedDoctor: appointment.prefferedDoctor }),
            ...(appointment.files !== undefined && { files: appointment.files }),
            ...(appointment.attendingDoctors !== undefined && { attendingDoctors: appointment.attendingDoctors }),
            ...(appointment.attendingNurses !== undefined && { attendingNurses: appointment.attendingNurses }),
            ...(appointment.status !== undefined && { status: appointment.status }),
            ...(appointment.metaData !== undefined && { metaData: appointment.metaData })
        }
    }

    static toJson(appointment: Appointment): any {
        return {
            //id: appointment.id,
            userId: appointment.userId,
            type: appointment.type,
            notes: appointment.notes,
            date: appointment.date,
            time: appointment.time,
            prefferedDoctor: appointment.prefferedDoctor,
            files: appointment.files,
            attendingDoctors: appointment.attendingDoctors,
            attendingNurses: appointment.attendingNurses,
            status: appointment.status,
            metaData: appointment.metaData
        };
    }
}
