import React from 'react';

const CheckboxGroup = ({ items, progress, updateCheckbox }) => {
  return (
    <div className="checkbox-group">
      {items.map((item, index) => (
        <div key={index}>
          <label>
            <input
              type="checkbox"
              checked={progress.checkboxes[item.key] || false}
              onChange={(e) => updateCheckbox(item.key, e.target.checked)}
            />
            {item.label}
          </label>
          {item.nested && (
            <div className="nested-checkbox-group">
              <CheckboxGroup
                items={item.nested}
                progress={progress}
                updateCheckbox={updateCheckbox}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;