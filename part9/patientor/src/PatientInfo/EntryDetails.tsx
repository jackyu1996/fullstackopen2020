import React from 'react';
import {Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry} from '../types';
import {useStateValue} from '../state';
import {Icon, Segment, Header, List} from 'semantic-ui-react';

const Hospital = (e: HospitalEntry) =>{
    const [state, ] = useStateValue();
    const findNameBy = (code: string): string=>{
        if (state.diagnoses[code]) {
            return state.diagnoses[code].name;
        } else {
            return "";
        }
    };

    return (
        <>
            <Segment>
                <Header as='h2'>
                    {e.date} <Icon.Group size="large">
                        <Icon name="hospital" />
                    </Icon.Group>
                </Header>
                <Header as='h5' color='grey'><i>{e.description}</i></Header>
                <List bulleted>
                    {
                        e.diagnosisCodes ?
                            e.diagnosisCodes.map(c=><List.Item key={c}>{c} {findNameBy(c)}</List.Item>):
                            null
                    }
                </List>
            </Segment>
        </>
    );
};

const OccupationalHealthcare = (e: OccupationalHealthcareEntry) =>{
    return (
        <Segment>
            <Header as='h2'>
                {e.date} <Icon.Group size="large">
                    <Icon name="stethoscope" />
                </Icon.Group>
                <Header.Content>{e.employerName}</Header.Content>
            </Header>
            <Header as='h5' color='grey'><i>{e.description}</i></Header>
        </Segment>
    );
};

const HealthCheck = (e: HealthCheckEntry)=>{
    return (
        <Segment>
            <Header as='h2'>
                {e.date} <Icon.Group size="large">
                    <Icon name="user md" />
                </Icon.Group>
            </Header>
            <Header as='h5' color='grey'><i>{e.description}</i></Header>
            <p>
                {
                    e.healthCheckRating === 0 ?
                        <Icon name="heart" color="green" /> :
                        e.healthCheckRating === 1 ?
                            <Icon name="heart" color="yellow" /> :
                            e.healthCheckRating === 2 ?
                                <Icon name="heart" color="orange" /> :
                                <Icon name="heart" color="red" />
                }
            </p>
        </Segment>
    );
};

const EntryDetails = (e: Entry)=>{
    switch (e.type) {
        case 'Hospital':
            return <Hospital {...e}/>;
        case 'OccupationalHealthcare':
            return <OccupationalHealthcare {...e} />;
        case 'HealthCheck':
            return <HealthCheck {...e} />;
        default:
            return null;
    }
};

export default EntryDetails;
