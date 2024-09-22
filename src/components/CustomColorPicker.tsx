import React from 'react';
import { ChromePicker, ColorResult } from 'react-color';

interface CustomColorPickerProps {
  label: string;
  color: string;
  onChange: (color: ColorResult) => void;
}

const CustomColorPicker: React.FC<CustomColorPickerProps> = ({ label, color, onChange }) => {
  return (
    <div style={{ marginBottom: '20px', width: '48%' }}>
      <p>{label}</p>
      <ChromePicker
        color={color}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomColorPicker;
