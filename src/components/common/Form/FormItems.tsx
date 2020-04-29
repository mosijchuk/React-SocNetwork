import React, {FC} from "react";
// @ts-ignore
import MaterialIcon from "material-icons-react";
import s from "./formItems.module.scss";
import {WrappedFieldProps} from "redux-form";


export const Input: FC<WrappedFieldProps> = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <>
            <div className={s.form_group + " " + (hasError ? s.error : "")}>
                <input {...input} {...props}></input>
            </div>

            {hasError &&
            <div className={s.form_group + " " + (hasError ? s.error : "")}>
                <span className={s.errorMessage}>{meta.error} </span>
            </div>
            }
        </>
    );
};

export const Textarea: FC<WrappedFieldProps> = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <>
            <div className={s.form_group + " " + (hasError ? s.error : "")}>
                <textarea {...input} {...props}></textarea>
            </div>

            {hasError &&
            <div className={s.form_group + " " + (hasError ? s.error : "")}>
                <span className={s.errorMessage}>{meta.error} </span>
            </div>
            }
        </>
    );
};

const profileAvatarFileInput: FC<WrappedFieldProps> = (props) => {

    const onChange = (e: any) => {
        props.input.onChange(e.target.files[0]);
    }

    const inputElement: React.RefObject<any> = React.createRef()

    const changeAvatarClick = (e: any) => {
        e.preventDefault();
        inputElement.current.click()
    };

    const {input: {value}} = props;

    return (
        <>
            <a href="#" onClick={changeAvatarClick}>
                <MaterialIcon icon="add_a_photo" size={18}/>
            </a>
            <input
                type="file"
                ref={inputElement}
                onChange={onChange}
            />
        </>
    );
}

export default profileAvatarFileInput