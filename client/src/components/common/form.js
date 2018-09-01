import React from 'react';
import ReactDOM from 'react-dom';
import './form.css';

export default class DynamicForm extends React.Component {
    state ={};
    constructor(props) {
        super(props);
        this.state = {
          errors : {}
        }

    }

    componentWillReceiveProps(props){
        props.fields.map((m) => {
            if(m.type == 'radio') this.validateOne(m.name);
            if(props.fields.hasOwnProperty(m.dependentOn) && !props.fields[m.dependentOn].hasOwnProperty('value') && props.fields[m.dependentOn].value == m.dependingValue){
                this.setState({[m.name] : m.value});
            }
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        var data = this.state;
        if(Object.keys(this.state.errors).length === 0)
        this.props.onSubmit(data);
    }

    validation = (e,r) =>{
        var regex = new RegExp(r);
        var errors = this.state.errors;        
        if(!regex.test(this.state[e])){
            errors[e] = 'Invalid'
            this.setState({errors : errors});
        }
        else {
            delete errors[e];
            this.setState({errors : errors});
        }
    }

    validateOne = (name) =>{
        var errors = this.state.errors;   
        if(!this.state.hasOwnProperty(name) || this.state[name] == null || this.state[name] == undefined){
            errors[name] = 'Field Required';
            this.setState({errors : errors});
        }
        else
        {   
            delete errors[name];
            this.setState({errors : errors});
        }
            
    }

    onChange = (e, key,input,type="single") => {
        console.log(e.target.value);
        if (type === "single") {
            this.setState({
                [key]: e.target.value  
            },() =>{
                if(input == 'radio')
                {
                    this.validateOne(key);
                }            
            });
        } else {
            // Array of values (e.g. checkbox): TODO: Optimization needed.
            let found = this.state[key] ?  
                            this.state[key].find ((d) => d === e.target.value) : false;
            
            if (found) {
                let data = this.state[key].filter((d) => {
                    return d !== found;
                });
                this.setState({
                    [key]: data
                },() =>{
                if(input == 'radio')
                    this.validateOne(key);
            });
            } else {
                this.setState({
                    [key]: [e.target.value, ...this.state[key]]
                },() =>{
                if(input == 'radio')
                    this.validateOne(key);
            });
            }
        }
    }


    renderForm = () => {
        let fields = this.props.fields;
        let formUI = fields.map((m) => {
            let key = m.key;
            let type = m.type || "text";
            let props = m.props || {};
            let name= m.name;
            let value = m.value || "";
            let visibility = 'visible';
            let regex = m.regex || null;
            let required = m.required;
            
            if(m.hasOwnProperty('dependentOn')) {
                if(this.state.hasOwnProperty(fields[m.dependentOn].name)){
                    if(this.state[fields[m.dependentOn].name] == m.dependingValue){
                        visibility = 'visible';
                    }
                    else{
                        visibility = 'hidden';
                    }
                }
                else {
                    if(fields[m.dependentOn].hasOwnProperty('value') && fields[m.dependentOn].value == m.dependingValue){
                        visibility = 'visible';
                    }
                    else{
                        visibility = 'hidden';
                    }
                }
                
            }

            let input =  <input {...props}
                    className="form-input"
                    type={type}
                    key={key}
                    name={name}
                    onKeyUp={(e) => {this.validation(key, regex)}}
                    value={this.state[name]}
                    onChange={(e)=>{this.onChange(e, name)}}
                    required={required}
                />;

            if (type == "radio") {
               input = m.options.map((o,index) => {
                   let checked = o.value == value;
                    return (
                        <React.Fragment key={'fr' + o.key}>
                            <input {...props}
                                    className="form-input"
                                    type={type}
                                    key={o.key}
                                    name={o.name}
                                    checked={checked}
                                    value={o.value}
                                    onChange={(e)=>{this.onChange(e, m.key,'radio');}}
                            />
                            <label key={"ll" +o.key }>{o.label}</label>
                        </React.Fragment>
                    );
               });
               input = <div className ="form-group-radio">{input}</div>;
            }

            if (type == "select") {
                input = m.options.map((o,index) => {
                    let checked = o.value == value;
                     return (
                            <option {...props}
                                className="form-input"
                                key={o.key}
                                value={o.value}
                                required = {index == 0 ? required : undefined}
                            >{o.value}</option>
                     );
                });
                input = <select value={this.state[name]} onChange={(e)=>{this.onChange(e, m.key)}}>{input}</select>;
             }

             if (type == "checkbox") {
                input = m.options.map((o,index) => {
                    
                    //let checked = o.value == value;
                    let checked = false;
                    if (value && value.length > 0) {
                        checked = value.indexOf(o.value) > -1 ? true: false;
                    }
                     return (
                        <React.Fragment key={"cfr" + o.key}>
                            <input {...props}
                                className="form-input"
                                type={type}
                                key={o.key}
                                name={o.name}
                                checked={checked}
                                value={o.value}
                                required = {index == 0 ? required : undefined}
                                onChange={(e)=>{this.onChange(e, m.key,"multiple")}}
                            />
                            <label key={"ll" +o.key }>{o.label}</label>
                        </React.Fragment>
                     );
                });

                input = <div className ="form-group-checkbox">{input}</div>;

             }
            if(visibility == 'visible')
            return (
                <div key={'g' + key} className="form-group">
                    <label className="form-label"
                        key={"l" + key}
                        htmlFor={key}>
                        {m.label}
                    </label>
                    {input}
                    <label className="form-label"
                        key={"l" + key}
                        htmlFor={key}
                        style={{color : 'red'}}>
                        <br />
                        {this.state.errors != undefined ? this.state.errors[key] : null}
                    </label>
                </div>
            );
        });
        return formUI;
    }

    render () {
        let title = this.props.title || "Dynamic Form";

        return (
            <div className="container-fluid">
                <h3 className="form-title text-center">{title}</h3>
                <form className="dynamic-form" onSubmit={(e)=>{this.onSubmit(e)}}>
                    {this.renderForm()}
                    <div className="form-actions">
                        <button className="btn btn-success" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}