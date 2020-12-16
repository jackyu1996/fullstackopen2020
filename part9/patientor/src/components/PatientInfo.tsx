import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";

import { updatePatient, useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";

const PatientInfo = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients }, dispatch] = useStateValue();
    const [patient, setPatient] = React.useState<Patient>(patients[id]);

    React.useEffect(() => {
        const fetchPatient = async () => {
            try {
                const { data: fullPatient } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                setPatient(fullPatient);
                dispatch(updatePatient(fullPatient));
            } catch (e) {
                console.error(e);
            }
        };

        if (!patient || !patient.ssn) {
            fetchPatient();
        }
    }, [dispatch, id, patient, setPatient]);

    if (!patient) {
        return null;
    }

    return (
        <>
            <h2>
                {patient.name}
                {
                    patient.gender === 'male' ?
                        <Icon name="mars" /> :
                        patient.gender === 'female' ?
                            <Icon name="venus" /> :
                            <Icon name="neuter" />

                }
            </h2>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <p>Date of Birth: {patient.dateOfBirth}</p>
        </>
    );
};

export default PatientInfo;
