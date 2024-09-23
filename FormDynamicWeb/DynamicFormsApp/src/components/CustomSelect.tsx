
import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

import Select from 'react-select'


interface OptionType<T> {
    [key: string]: any;
    value: string;
    label: string;
}

interface CustomSelectProps<T> {
    isDisabled?: boolean;
    isClearable?: boolean;
    isSearchable?: boolean;
    placeholder?: string;
    options?: OptionType<T>[];
    value: OptionType<T> | null | undefined;
    onChange: (option: OptionType<T> | null) => void;
    isRequired?: boolean;
}

export default function CustomSelect<T>(props: CustomSelectProps<T>) {
    const {
        value,
        placeholder = "Select...",
        isSearchable = true,
        isClearable = false,
        isDisabled = false,
        isRequired = false,
        options
    } = props;

    const [valueControl, setValueControl] = useState<OptionType<T> | null>(value || null);

    useEffect(() => {
        setValueControl(value);
    }, [value]);

    const customStyles = {
        menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
        control: (base: any, state: any) => ({
            ...base,
            fontSize: '12px',
            paddingTop: '1px',
            border: isRequired && valueControl?.value === "" 
                ? '1px solid red'
                : state.isFocused 
                    ? '1px solid blue'
                    : '1px solid #ccc',
            boxShadow: isRequired && valueControl?.value === "" 
                ? 'none' 
                : state.isFocused
                    ? '0 0 0 1px blue'
                    : 'none',
            '&:hover': {
                borderColor: !state.isFocused && isRequired && valueControl?.value === "" 
                    ? 'red'
                    : !state.isFocused
                        ? '#999'
                        : 'none'
            }
        }),
        option: (base: any, state: any) => ({ 
            ...base, 
            fontSize: '12px',
            backgroundColor: state.isSelected ? 'blue' : 'transparent',
            '&:hover': {
                backgroundColor: state.isSelected ? 'blue' : '#f0f0f0',
            },
        }),
    };

    const handleSelectChange = (option: OptionType<T> | null) => {
        props.onChange(option);
        setValueControl(option);
    };

    return (
        <Box marginRight="15px">
            <Select
                isDisabled={isDisabled}
                isClearable={isClearable}
                isSearchable={isSearchable}
                placeholder={placeholder}
                value={valueControl}
                options={options}
                onChange={(option: OptionType<T>) => handleSelectChange(option)}
                styles={customStyles}
                menuPortalTarget={document.body} 
            />
            {isRequired && valueControl?.value === "" && (
                <Typography fontSize={12} color="red">
                    Este campo es requerido
                </Typography>
            )}
        </Box>
    );
}
