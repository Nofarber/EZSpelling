import React, { useState } from 'react';

const NameForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
      name: '',
      place: '',
      details: '',
    });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

};

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="הכנס שם מלא"
      />
      <input
        type="text"
        name="place"
        value={formData.place}
        onChange={handleInputChange}
        placeholder="איפה היתה ההתנדבות"
      />
      <input
        type="text"
        name="details"
        value={formData.details}
        onChange={handleInputChange}
        placeholder="פרטים על ההתנבות"
      />
      <button onClick={handleSubmit}>שלח</button>
    </div>
  );
};

export default NameForm;
