export class Record {
    constructor(
        public appointmentID: string,
        public reminding: number,
        public description: string,
        public medicines: any,
        public disease: any
    ) { }
}