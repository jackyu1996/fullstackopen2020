import React from "react";
import { FormikProps, ErrorMessage } from "formik";
import { Form, DropdownProps, Dropdown } from "semantic-ui-react";
import { EntryType } from "../types";

export type EntryTypeOption = {
    value: EntryType;
    label: string;
};

export const TypeSelection = ({
    types,
    setFieldValue,
    setFieldTouched,
    changeType,
}: {
    types: EntryTypeOption[];
    setFieldValue: FormikProps<{ type: string }>["setFieldValue"];
    setFieldTouched: FormikProps<{ type: string }>["setFieldTouched"];
    changeType: (type: string) => void;
}) => {
    const field = "type";
    const onChange = (
        _event: React.SyntheticEvent<HTMLElement, Event>,
        data: DropdownProps
    ) => {
        setFieldTouched(field, true);
        setFieldValue(field, data.value);
        data.value && changeType(data.value.toString());
    };

    const stateOptions = types.map(type => ({
        key: type.value,
        text: `${type.label}`,
        value: type.value
    }));

    return (
        <Form.Field>
            <label>Type</label>
            <Dropdown
                fluid
                search
                selection
                defaultValue={stateOptions[1].value}
                options={stateOptions}
                onChange={onChange}
            />
            <ErrorMessage name={field} />
        </Form.Field>
    );
};
