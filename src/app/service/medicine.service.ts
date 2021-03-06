import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Final } from "../Const";
import { BaseResponse } from "../model/BaseResponse.model";
import { Medicine } from "../model/medicine.model";
import { Disease } from "../model/disease.model";
import { Prescription } from "../model/prescription.model";
import { Regimen } from "../model/regimen.model";



@Injectable()
export class MedicineService {
    constructor(private http: HttpClient) { }
    url = `${Final.API_ENDPOINT}`;

    getMedicines() {
        return this
            .http
            .get<BaseResponse<Medicine[]>>(`${this.url}/medicine/getAllMedicines`);
    }
    getDiseases() {
        return this
            .http
            .get<BaseResponse<Disease[]>>(`${this.url}/disease/getAllDiseases`);
    }
    postMedicalRecord(appointmentID, reminding, description, medicine, disease,symptom) {
        return this
            .http
            .post<BaseResponse<Prescription[]>>(`${this.url}/medicalRecord/create`,
                {
                    appointmentID: appointmentID,
                    reminding: reminding,
                    description: description,
                    medicines: medicine,
                    diseases: disease,
                    clinicalSymptom:symptom
                })
    }
    getMedicalRecord(patientID) {
        return this
            .http
            .post<BaseResponse<Prescription[]>>(`${this.url}/medicalRecord/getMedicalRecord`,
                {
                    patientID: patientID
                });
    }
    postRegimen(username,diseaseID){
        return this
        .http
        .post<BaseResponse<Regimen>>(`${this.url}/regimen/getRegimen`,
            {
                username: username,
                diseaseIDs: diseaseID,
               
            })
    }
}