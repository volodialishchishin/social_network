import React, {ChangeEvent} from 'react';
import s from './ProfileStatus.module.css'

type ProfileStatusPropsType = {
    status: string
    changeStatusAC: (newStatus: string) => void
    updateStatus: (status: string) => void
}

export class ProfileStatus extends React.Component<any, any> {
    state = {
        editMode: false,
        value: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.value)
    }

    ChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        let newValue = e.currentTarget.value
        this.setState({
           value: newValue
        })
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>) {
        if(prevProps.status !== this.props.status){
            this.setState({
                status: this.props.status
            })
        }
    }

    render(){
        return this.state.editMode ?
            <div onBlur={this.deactivateEditMode}>
                <input value={this.state.value} onChange={this.ChangeStatus || '----'} autoFocus/>
            </div>
            : <div onDoubleClick={this.activateEditMode} className={s.status}>
                <span>{this.state.value}</span>
            </div>
    }
}