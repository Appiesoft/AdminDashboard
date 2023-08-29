import React from 'react';
import Select, { components } from 'react-select';
const { ValueContainer, Placeholder } = components;

const CustomValueContainer = ({ children, ...props }) => {
    return (
        <ValueContainer {...props}>
            <Placeholder {...props} isFocused={props.isFocused}>
                {props.selectProps.placeholder}
            </Placeholder>
            {React.Children?.map(children, (child) => (child && child.type !== Placeholder ? child : null))}
        </ValueContainer>
    );
};

const SelectField = ({ options, field, error, placeholder, isMulti, disable }) => {
    return (
        <Select
            inputRef={field.ref}
            options={options}
            className="react-select"
            isDisabled={disable}
            classNamePrefix="react-select"
            defaultValue={
                isMulti
                    ? field.value === []
                        ? field.value
                        : options.filter((option) => field.value?.includes(option.value))
                    : field.value === ''
                    ? field.value
                    : options.filter((option) => option.value === field.value)
            }
            value={
                isMulti
                    ? field.value === []
                        ? field.value
                        : options.filter((option) => field.value?.includes(option.value))
                    : field.value === ''
                    ? field.value
                    : options.filter((option) => option.value === field.value)
            }
            // defaultValue={field.value}
            // value={field.value}
            isMulti={isMulti}
            onChange={(val) => {
                isMulti ? field.onChange(val ? val.map((option) => option.value) : []) : field.onChange(val.value);
            }}
            components={{
                ValueContainer: CustomValueContainer,
            }}
            placeholder={placeholder}
            styles={{
                valueContainer: (provided) => ({
                    ...provided,
                    overflow: 'visible',
                }),
                container: (provided) => ({
                    ...provided,
                }),
                control: (baseStyles) => ({
                    ...baseStyles,
                    borderColor: error && '#fa5c7c !important',
                    height: 'calc(2.9rem + 2px)',
                    backgroundColor: disable && '#eef2f7 !important',
                }),
                singleValue: (baseStyles) => ({
                    ...baseStyles,
                    color: 'black !important',
                }),
                placeholder: (baseStyles, state) => ({
                    ...baseStyles,
                    fontWeight: 600,
                    position: state.hasValue || state.selectProps.inputValue ? 'absolute' : 'sticky',
                    top: state.hasValue || state.selectProps.inputValue ? -15 : 0,
                    transform:
                        (state.hasValue && 'scale(0.85) translateY(-0.4rem) translateX(-0.5rem)!important') ||
                        (state.selectProps.inputValue &&
                            'scale(0.85) translateY(-0.4rem) translateX(-0.5rem)!important'),
                    backgroundColor: 'transparent',
                    backdropFilter: (state.selectProps.inputValue && 'blur(5px)') || (state.hasValue && 'blur(5px)'),
                    color: error ? '#fa5c7c !important' : '#667085',
                }),
            }}
        />
    );
};

export default SelectField;
