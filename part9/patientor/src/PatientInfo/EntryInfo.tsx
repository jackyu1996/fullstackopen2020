import React from 'react';
import {Entry} from '../types';
import {useStateValue} from '../state';

const EntryInfo = (e: Entry)=>{
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
            <p>{e.date} <i>{e.description}</i></p>
            <ul>
                {
                    e.diagnosisCodes ?
                        e.diagnosisCodes.map(c=><li key={c}>{c} {findNameBy(c)}</li>):
                        null
                }
            </ul>
        </>
    );
};

export default EntryInfo;
