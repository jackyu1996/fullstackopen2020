import React from "react";
import { Grid, Button, Message } from "semantic-ui-react";
import { Formik, Form, Field } from "formik";

import { EntryType, NewEntry } from "../types";
import {
    DiagnosisSelection,
    NumberField,
    TextField,
} from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { EntryTypeOption, TypeSelection } from "./FormField";

interface Props {
    onSubmit: (values: NewEntry) => void;
    onCancel: () => void;
    error: string | undefined;
}

const entryTypeOptions: EntryTypeOption[] = [
    { value: EntryType.Hospital, label: "Hospital" },
    { value: EntryType.HealthCheck, label: "Health Check" },
    {
        value: EntryType.OccupationalHealthcare,
        label: "Occupational Health Care",
    },
];

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel, error }) => {
    const healthCheckInitialValues: NewEntry = {
        type: "HealthCheck",
        date: "",
        description: "",
        diagnosisCodes: [],
        specialist: "",
        healthCheckRating: 0,
    };

    const hospitalInitialValues: NewEntry = {
        type: "Hospital",
        date: "",
        description: "",
        diagnosisCodes: [],
        specialist: "",
        discharge: { date: "", criteria: "" }
    };

    const occupationalHealthcareInitialValues: NewEntry = {
        type: "OccupationalHealthcare",
        date: "",
        description: "",
        diagnosisCodes: [],
        specialist: "",
        employerName: "",
        sickLeave: {startDate: "", endDate: ""}
    };

    const [{ diagnoses }] = useStateValue();

    // This method still can't solve the transition of uncontrolled to controlled due to limitation of Formik
    const [initialValues, setInitialValues] = React.useState<NewEntry>(healthCheckInitialValues);

    const changeType = (type: string)=>{
        switch (type) {
            case 'HealthCheck':
                setInitialValues(healthCheckInitialValues);
            break;
            case 'Hospital':
                setInitialValues(hospitalInitialValues);
            break;
            case 'OccupationalHealthcare':
                setInitialValues(occupationalHealthcareInitialValues);
            break;
        }
    };

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={onSubmit}
            validate={(values) => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.type) {
                    errors.type = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (values.type==='HealthCheck' && isNaN(values.healthCheckRating)) {
                    errors.healthCheckRating = requiredError;
                }
                if (values.type==='Hospital' && !values.discharge) {
                    errors.discharge = requiredError;
                }
                if (values.type==='OccupationalHealthcare' && !values.employerName) {
                    errors.employerName = requiredError;
                }
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        {error && <Message negative><Message.Header>{error}</Message.Header></Message> }
                        <TypeSelection
                            setFieldTouched={setFieldTouched}
                            setFieldValue={setFieldValue}
                            types={Object.values(entryTypeOptions)}
                            changeType={changeType}
                        />
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        {
                            initialValues.type==='HealthCheck' &&
                                <Field
                                    label="healthCheckRating"
                                    name="healthCheckRating"
                                    component={NumberField}
                                    min={0}
                                    max={3}
                                />
                        }
                        {
                            initialValues.type==='Hospital' &&
                                <>
                                    <Field
                                        label='Discharge Date'
                                        placeholder="YYYY-MM-DD"
                                        name='discharge.date'
                                        component={TextField}
                                    />
                                    <Field
                                        label='Discharge Criteria'
                                        placeholder="Discharge Criteria"
                                        name='discharge.criteria'
                                        component={TextField}
                                    />
                                </>
                        }
                        {
                            initialValues.type==='OccupationalHealthcare' &&
                                <>
                                    <Field
                                        label="Employer Name"
                                        placeholder="Employer Name"
                                        name='employerName'
                                        component={TextField} />
                                    <Field
                                        label="Sick Leave Start Date"
                                        placeholder="YYYY-MM-DD"
                                        name='sickLeave.startDate'
                                        component={TextField} />
                                    <Field
                                        label="Sick Leave End Date"
                                        placeholder="YYYY-MM-DD"
                                        name='sickLeave.endDate'
                                        component={TextField} />
                                </>
                        }
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;
