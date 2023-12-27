import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import logo from './logo.svg';


interface FormData {
  messageType: string;
  from: string;
  to: string;
  optionalFeatures: Record<string, boolean>;
  input: string;
  responseText: string;
}

const initialFormData: FormData = {
  messageType: 'DM',
  from: 'SE',
  to: 'SE',
  optionalFeatures: {
      isConcise: false,
      isCreative: false,
      isOfficial: false,
    },
  input: '',
  responseText: '',
};

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleRadioChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCheckboxChange = (checkbox: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      optionalFeatures: {
        ...prevFormData.optionalFeatures,
        [checkbox]: !prevFormData.optionalFeatures[checkbox],
      },
    }));
  };

  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, input: event.target.value });
  };

  const handleSubmit = () => {
    if (!formData.input.trim()) {
      console.error('Input cannot be empty');
      setFormData({ ...formData, responseText: 'Input cannot be empty' });
      return;
    }

    setLoading(true);

    const apiUrl = 'http://localhost:8080/api/v1/text-review';
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.text())
      .then((data) => {
        console.log('Form submitted successfully:', data);
        setFormData({ ...formData, responseText: data });
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
        setFormData({ ...formData, responseText: 'Error submitting form' });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container mt-5">
      <h1>Text reviewer</h1>
      <form>
        <div className="mb-3">
          <label className="form-label">
            Message type:
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                value="EMAIL"
                checked={formData.messageType === 'EMAIL'}
                onChange={() => handleRadioChange('messageType', 'EMAIL')}
              />
              <label className="form-check-label">Email</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                value="DM"
                checked={formData.messageType === 'DM'}
                onChange={() => handleRadioChange('messageType', 'DM')}
              />
              <label className="form-check-label">Direct message</label>
            </div>
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            From:
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                value="SE"
                checked={formData.from === 'SE'}
                onChange={() => handleRadioChange('from', 'SE')}
              />
              <label className="form-check-label">Software Engineer</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                value="EM"
                checked={formData.from === 'EM'}
                onChange={() => handleRadioChange('from', 'EM')}
              />
              <label className="form-check-label">Engineering Manager</label>
            </div>
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            To:
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                value="SE"
                checked={formData.to === 'SE'}
                onChange={() => handleRadioChange('to', 'SE')}
              />
              <label className="form-check-label">Software Engineer</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                value="EM"
                checked={formData.to === 'EM'}
                onChange={() => handleRadioChange('to', 'EM')}
              />
              <label className="form-check-label">Engineering Manager</label>
            </div>
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Optional features:
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                value="isConcise"
                checked={formData.optionalFeatures.isConcise}
                onChange={() => handleCheckboxChange('isConcise')}
              />
              <label className="form-check-label">Concise</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                value="isCreative"
                checked={formData.optionalFeatures.isCreative}
                onChange={() => handleCheckboxChange('isCreative')}
              />
              <label className="form-check-label">Creative</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                value="isOfficial"
                checked={formData.optionalFeatures.isOfficial}
                onChange={() => handleCheckboxChange('isOfficial')}
              />
              <label className="form-check-label">Official</label>
            </div>
          </label>
        </div>
        <div className="mb-3">
            Text:
            <input
                type="text"
                className="form-control"
                value={formData.input}
                onChange={handleTextFieldChange}
            />
        </div>
        <div className="mb-3">
          <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
            {loading && (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            )}
            Review
          </button>

        </div>
        <div className="mb-3">
            Response Text:
                <textarea
                    value={formData.responseText}
                    rows={8}
                    readOnly
                    style={{ width: '100%', resize: 'both' }}
                    className="form-control"
                />
        </div>
      </form>
    </div>
  );
};

export default App;
