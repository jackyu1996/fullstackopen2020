import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
    | {
          type: "SET_PATIENT_LIST";
          payload: Patient[];
      }
    | {
          type: "SET_DIAGNOSIS_LIST";
          payload: Diagnosis[];
      }
    | {
          type: "ADD_PATIENT";
          payload: Patient;
      }
    | {
          type: "UPDATE_PATIENT";
          payload: Patient;
      }
    | {
          type: "ADD_ENTRY";
          patient: Patient;
          payload: Entry;
      };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_PATIENT_LIST":
            return {
                ...state,
                patients: {
                    ...action.payload.reduce(
                        (memo, patient) => ({ ...memo, [patient.id]: patient }),
                        {}
                    ),
                    ...state.patients,
                },
            };
        case "SET_DIAGNOSIS_LIST":
            return {
                ...state,
                diagnoses: {
                    ...action.payload.reduce(
                        (memo, diagnosis) => ({
                            ...memo,
                            [diagnosis.code]: diagnosis,
                        }),
                        {}
                    ),
                    ...state.diagnoses,
                },
            };
        case "ADD_PATIENT":
        case "UPDATE_PATIENT":
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload,
                },
            };
        case "ADD_ENTRY":
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.patient.id]: {
                        ...action.patient,
                        entries: action.patient.entries.concat(action.payload),
                    },
                },
            };
        default:
            return state;
    }
};

export const setPatientList = (payload: Patient[]): Action => {
    return {
        type: "SET_PATIENT_LIST",
        payload,
    };
};

export const setDiagnosisList = (payload: Diagnosis[]): Action => {
    return {
        type: "SET_DIAGNOSIS_LIST",
        payload,
    };
};
export const addPatient = (payload: Patient): Action => {
    return {
        type: "ADD_PATIENT",
        payload,
    };
};

export const updatePatient = (payload: Patient): Action => {
    return {
        type: "UPDATE_PATIENT",
        payload,
    };
};

export const addEntry = (patient: Patient, payload: Entry): Action => {
    return {
        type: "ADD_ENTRY",
        patient,
        payload,
    };
};
