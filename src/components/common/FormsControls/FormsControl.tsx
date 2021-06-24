import s from './FormsControl.module.css'

export const Textarea: React.FC<any> = ({input, meta, ...props}) => {
    const showError = meta.touched && meta.error && s.error

    return (
        <div className={s.formControl + ' ' + (showError ? s.error : '')}>
            <div>
                <textarea {...input} {...props}/>
            </div>
            {showError && <span>{meta.error}</span>}
        </div>
    )
}

export const Input: React.FC<any> = ({input, meta, ...props}) => {
    const showError = meta.touched && meta.error && s.error

    return (
        <div className={s.formControl + ' ' + (showError ? s.error : '')}>
            <div>
                <input {...input} {...props}/>
            </div>
            {showError && <span>{meta.error}</span>}
        </div>
    )
}