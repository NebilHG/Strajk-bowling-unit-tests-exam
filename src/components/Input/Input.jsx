import './Input.scss';

function Input({ label, type, customClass, name, handleChange, defaultValue, disabled, id }) {
  
    return (
        <section className='input'>
            <label className='input__label'  htmlFor={id}>{ label }</label>
            <input type={ type } 
                id={id}
                className={ `input__field ${customClass ? customClass : ""}` }
                name={ name }
                onChange={ handleChange }
                defaultValue={ defaultValue ? defaultValue : '' }
                disabled={ disabled }
            />
        </section>
    )
}

export default Input;