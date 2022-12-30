import { Tooltip } from "@mui/material";
import React from "react";
import Slider, { SliderThumb, SliderValueLabelProps } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import * as _ from 'lodash';
  
const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';


const IOSSlider = styled(Slider)(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? '#8B288F' : '#8B288F',
    height: 2,
    padding: '15px 0',
    fontFamily: 'Regular !important',
    '& .MuiSlider-thumb': {
        height: 28,
        width: 28,
        backgroundColor: '#fff',
        boxShadow: iOSBoxShadow,
        '&:focus, &:hover, &.Mui-active': {
        boxShadow:
            '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
            boxShadow: iOSBoxShadow,
        },
        },
    },
    '& .MuiSlider-valueLabel': {
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'Regular',
        top: -6,
        backgroundColor: 'whitesmoke',
        borderRadius: '8px',
        color: theme.palette.text.primary,
        '&:before': {
        display: 'none',
        },
        '& *': {
        background: 'transparent',
        color: theme.palette.mode === 'dark' ? '#fff' : '#000',
        },
    },
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-rail': {
        opacity: 0.5,
        backgroundColor: '#bfbfbf',
    },
    '& .MuiSlider-mark': {
        backgroundColor: '#bfbfbf',
        height: 8,
        width: 1,
        '&.MuiSlider-markActive': {
        opacity: 1,
        backgroundColor: 'currentColor',
        },
    '& .css-1eoe787-MuiSlider-markLabel': {
        fontFamily: 'Regular'
    }
    },
    }));

interface NumberRangeProps {
    min: number;
    max: number;
    step?: number;
    value: number;
    onChange: (
        event: Event, 
        value: number | number[], 
        activeThumb: number
    ) => void;
    valueLabelOverride?: (val: number) => string | undefined;
}

export function NumberSlider(props: NumberRangeProps) : JSX.Element {
    let marks: {value : number}[] = [];
    const { min, max, step, value, onChange, valueLabelOverride } = props;
    if (step !== undefined) {
        const steppedValues = _.range(min, max + 1, step);
        marks = steppedValues.map((val) => {
            let label = `${val}`;
            if (val >= max) {
                label = `${val}+`
            }
            if (valueLabelOverride !== undefined) {
                label = valueLabelOverride(val) || label;
            }
            return ({value: val, label: label});
        });
    }

    const  valuetext = (value: number) => {
        if (value >= max) return `${value}+`;
        return `${value}`;
    }

    return (
      <IOSSlider
            aria-label="ios slider"
            defaultValue={value}
            getAriaValueText={valuetext}
            min={min}
            max={max}
            onChange={onChange}
            marks={marks}
            valueLabelDisplay="auto"
            slotProps={{markLabel:() => {
              return {
                  style: {
                      fontFamily: 'Regular',
                      fontSize: '0.8em'
                  }
              }
            }}}
        />
    )
}

interface RangeSliderProps {
    min: number;
    max: number;
    step?: number;
    stepsPerMark?: number;
    value: number[];
    onChange: (
        event: Event, 
        value: number | number[], 
        activeThumb: number
    ) => void;
}

export function RangeSlider(props: RangeSliderProps) : JSX.Element {
    let marks: {value : number}[] = [];
    const { min, max, step, stepsPerMark, value, onChange } = props;
    if (step !== undefined) {
        let scaledStep = (!stepsPerMark) ? step: step*stepsPerMark;
        const steppedValues = _.range(min, max + 1, scaledStep);
        marks = steppedValues.map((val) => {
            let label = `${val}`;
            if (val >= max) {
                label = `${val}+`
            }
            return ({value: val, label: label});
        });
    }

    const  valuetext = (value: number) => {
        if (value >= max) return `${value}+`;
        return `${value}`;
    }

    return (
        <IOSSlider
              defaultValue={value}
              getAriaValueText={valuetext}
              min={min}
              max={max}
              onChange={onChange}
              marks={marks}
              step={step}
              valueLabelDisplay="auto"
              slotProps={{markLabel:() => {
                return {
                    style: {
                        fontFamily: 'Regular',
                        fontSize: '0.8em'
                    }
                }
              }}}
          />
      )
}