import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Icon, Divider } from "semantic-ui-react";

import { updatePatient, useStateValue, addEntry } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient, Entry, NewEntry } from "../types";
import AddEntryForm from '../AddEntryForm';

import EntryDetails from './EntryDetails';

const PatientInfo = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients }, dispatch] = useStateValue();
    const [patient, setPatient] = React.useState<Patient>(patients[id]);
    const [error, setError] = React.useState<string | undefined>();

    const submitNewEntry = async (values: NewEntry) => {
        try {
            const { data: newEntry } = await axios.post<Entry>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            setPatient({...patient, entries: patient.entries.concat(newEntry)});
            dispatch(addEntry(patient, newEntry));
        } catch (e) {
            console.error(e.response.data);
            console.error(error);
            setError(e.response.data.error);
        }
    };

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

            <Divider hidden />
            <h2>entries</h2>
            {patient.entries ? patient.entries.map(e=><EntryDetails key={e.id} {...e} />) : null}

            <Divider hidden />
            <AddEntryForm onSubmit={submitNewEntry} onCancel={()=>{console.error(error);}} />
        </>
    );
};

export default PatientInfo;
