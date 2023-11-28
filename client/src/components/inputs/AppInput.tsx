import {FormControl, FormGroup, FormLabel} from "react-bootstrap";
import React, {FC} from "react";

interface AppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    invalidFeedback?: string;
    label?: string;
    value?: string;
    setValue?: (value: string) => void;
}

const AppInput: FC<AppInputProps> = (props) => {
    const {invalidFeedback, label, id, setValue, value, ...rest} = props


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (setValue) {
            setValue(e.target.value)
        }
    }

    return (
        <FormGroup className="pb-4 mb-1 position-relative w-100" controlId={id}>
            {label && <FormLabel>{label}</FormLabel>}
            <input value={value} className="form-control" onChange={handleChange}
                   {...rest}
            />
            <FormControl.Feedback className="position-absolute" type="invalid">{invalidFeedback}</FormControl.Feedback>
        </FormGroup>
    )
}

export default AppInput
