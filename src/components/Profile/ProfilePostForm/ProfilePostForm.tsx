import React, {FC} from "react";
import s from "./profilePostForm.module.scss";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../common/Form/FormItems";
import {maxLengthCreator, required} from "../../common/Form/validators";

const maxLength150 = maxLengthCreator(150);

export type ProfilePostFormData = {
    post_text: string
}


const PostForm: FC<InjectedFormProps<ProfilePostFormData, ProfilePostOwnProps> & ProfilePostOwnProps> = (props) => {

    return (
        <form
            onSubmit={props.handleSubmit}
            onKeyDown={event => {
                if (event.keyCode === 13) {
                    event.preventDefault()
                    // @ts-ignore
                    props.handleSubmit()
                }
            }}
        >
            <Field
                component={Textarea}
                name={"post_text"}
                placeholder={"Your news..."}
                cols={"30"}
                rows={"10"}
                validate={[required, maxLength150]}
            />
            <button type="submit" className={s.btn_b}>
                Post
            </button>
        </form>
    );
};

const formName = "profilePost" as string;

type ProfilePostOwnProps = {}

const ProfilePostReduxForm = reduxForm<ProfilePostFormData, ProfilePostOwnProps>({
    form: formName
})(PostForm);

type ProfilePostFormProps = {
    addPost: (postText: { post_text: string }, formName: string) => void
}
const ProfilePostForm: FC<ProfilePostFormProps> = props => {
    const onSubmit = (postText: ProfilePostFormData) => {
        props.addPost(postText, formName);
    };

    return (
        <div className={s.content}>
            <div className={s.contentArea}>
                <div className={s.contentArea_wrap}>
                    <ProfilePostReduxForm onSubmit={onSubmit}/>
                </div>
            </div>
        </div>
    );
};


export default ProfilePostForm;
