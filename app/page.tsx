'use client';

import { useState } from 'react';
import { CheckCircle2, AlertCircle, Loader2, RotateCcw } from 'lucide-react';

interface FormState {
  city: string;
  city_development_index: string;
  gender: string;
  relevent_experience: string;
  enrolled_university: string;
  education_level: string;
  major_discipline: string;
  experience: string;
  company_size: string;
  company_type: string;
  last_new_job: string;
  training_hours: string;
}

interface PredictionResult {
  prediction: number;
  label: string;
}

const CITY_OPTIONS = [
  { value: 'city_103', label: 'City 103' },
  { value: 'city_21', label: 'City 21' },
  { value: 'city_160', label: 'City 160' },
];

const GENDER_OPTIONS = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: '', label: 'Prefer not to say' },
];

const EXPERIENCE_OPTIONS = [
  { value: '>20', label: 'More than 20 years' },
  { value: '20', label: '20 years' },
  { value: '19', label: '19 years' },
  { value: '18', label: '18 years' },
  { value: '17', label: '17 years' },
  { value: '16', label: '16 years' },
  { value: '15', label: '15 years' },
  { value: '14', label: '14 years' },
  { value: '13', label: '13 years' },
  { value: '12', label: '12 years' },
  { value: '11', label: '11 years' },
  { value: '10', label: '10 years' },
  { value: '9', label: '9 years' },
  { value: '8', label: '8 years' },
  { value: '7', label: '7 years' },
  { value: '6', label: '6 years' },
  { value: '5', label: '5 years' },
  { value: '4', label: '4 years' },
  { value: '3', label: '3 years' },
  { value: '2', label: '2 years' },
  { value: '1', label: '1 year' },
  { value: '0', label: 'Less than 1 year' },
];

const UNIVERSITY_OPTIONS = [
  { value: 'Full time course', label: 'Full time course' },
  { value: 'Part time course', label: 'Part time course' },
  { value: 'no_enrollment', label: 'No enrollment' },
];

const EDUCATION_LEVEL_OPTIONS = [
  { value: 'Primary School', label: 'Primary School' },
  { value: 'High School', label: 'High School' },
  { value: 'Graduate', label: 'Graduate' },
  { value: 'Masters', label: "Master's" },
  { value: 'Phd', label: 'PhD' },
];

const MAJOR_DISCIPLINE_OPTIONS = [
  { value: 'STEM', label: 'STEM' },
  { value: 'Business Degree', label: 'Business Degree' },
  { value: 'Arts', label: 'Arts' },
  { value: 'Other', label: 'Other' },
];

const COMPANY_SIZE_OPTIONS = [
  { value: '<10', label: 'Less than 10 employees' },
  { value: '10-49', label: '10-49 employees' },
  { value: '50-99', label: '50-99 employees' },
  { value: '100-499', label: '100-499 employees' },
  { value: '500-999', label: '500-999 employees' },
  { value: '1000-4999', label: '1000-4999 employees' },
  { value: '5000-9999', label: '5000-9999 employees' },
  { value: '10000+', label: '10000+ employees' },
];

const COMPANY_TYPE_OPTIONS = [
  { value: 'Pvt Ltd', label: 'Private Limited' },
  { value: 'Funded Startup', label: 'Funded Startup' },
  { value: 'Public Sector', label: 'Public Sector' },
  { value: 'Partnership', label: 'Partnership' },
];

const LAST_NEW_JOB_OPTIONS = [
  { value: '>4', label: 'More than 4 years ago' },
  { value: '4', label: '4 years ago' },
  { value: '3', label: '3 years ago' },
  { value: '2', label: '2 years ago' },
  { value: '1', label: '1 year ago' },
  { value: '0', label: 'Less than 1 year ago' },
];

export default function Home() {
  const [form, setForm] = useState<FormState>({
    city: 'city_103',
    city_development_index: '0.92',
    gender: '',
    relevent_experience: 'Has relevant experience',
    enrolled_university: 'no_enrollment',
    education_level: 'Graduate',
    major_discipline: 'STEM',
    experience: '>20',
    company_size: '50-99',
    company_type: 'Pvt Ltd',
    last_new_job: '1',
    training_hours: '36',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError(null);
  };

  const handleReset = () => {
    setForm({
      city: 'city_103',
      city_development_index: '0.92',
      gender: '',
      relevent_experience: 'Has relevant experience',
      enrolled_university: 'no_enrollment',
      education_level: 'Graduate',
      major_discipline: 'STEM',
      experience: '>20',
      company_size: '50-99',
      company_type: 'Pvt Ltd',
      last_new_job: '1',
      training_hours: '36',
    });
    setResult(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const cdi = parseFloat(form.city_development_index);
      if (isNaN(cdi) || cdi < 0 || cdi > 1) {
        throw new Error('City Development Index must be between 0 and 1');
      }

      const trainingHours = parseInt(form.training_hours, 10);
      if (isNaN(trainingHours) || trainingHours < 0) {
        throw new Error('Training hours must be a non-negative number');
      }

      const payload = {
        city: form.city,
        city_development_index: cdi,
        gender: form.gender || undefined,
        relevent_experience: form.relevent_experience,
        enrolled_university: form.enrolled_university || undefined,
        education_level: form.education_level || undefined,
        major_discipline: form.major_discipline || undefined,
        experience: form.experience || undefined,
        company_size: form.company_size || undefined,
        company_type: form.company_type || undefined,
        last_new_job: form.last_new_job || undefined,
        training_hours: trainingHours,
      };

      const response = await fetch(
        'https://job-change-prediction-api.vercel.app/predict',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail || `Server error: ${response.status}`,
        );
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      console.error('[v0] Prediction error:', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        color: 'var(--color-text-primary)',
        minHeight: '100vh',
        padding: '24px 16px',
      }}
    >
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <h1
            style={{
              fontSize: '32px',
              fontWeight: 700,
              marginBottom: '8px',
            }}
          >
            Job Change Predictor
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
            Analyze candidate likelihood to seek a new position
          </p>
        </div>

        {/* Result Card */}
        {result && (
          <div
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              border: `1px solid var(--color-success)`,
              borderRadius: 'var(--radius-lg)',
              padding: '20px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <CheckCircle2
              size={24}
              style={{ color: 'var(--color-success)', flexShrink: 0 }}
            />
            <div>
              <h3
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--color-text-secondary)',
                  marginBottom: '4px',
                }}
              >
                Prediction Result
              </h3>
              <p
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                }}
              >
                {result.label}
              </p>
            </div>
          </div>
        )}

        {/* Error Card */}
        {error && (
          <div
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              border: `1px solid var(--color-error)`,
              borderRadius: 'var(--radius-lg)',
              padding: '20px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <AlertCircle
              size={24}
              style={{ color: 'var(--color-error)', flexShrink: 0 }}
            />
            <div>
              <h3
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--color-text-secondary)',
                  marginBottom: '4px',
                }}
              >
                Error
              </h3>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--color-text-primary)',
                }}
              >
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            border: `1px solid var(--color-border)`,
          }}
        >
          {/* Two-column form grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              marginBottom: '24px',
            }}
          >
            {/* City */}
            <div>
              <label htmlFor="city">City Tier *</label>
              <select
                id="city"
                value={form.city}
                onChange={(e) => handleChange('city', e.target.value)}
                required
              >
                {CITY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* City Development Index */}
            <div>
              <label htmlFor="cdi">City Development Index *</label>
              <input
                id="cdi"
                type="number"
                min="0"
                max="1"
                step="0.01"
                value={form.city_development_index}
                onChange={(e) =>
                  handleChange('city_development_index', e.target.value)
                }
                required
              />
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                value={form.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
              >
                {GENDER_OPTIONS.map((opt) => (
                  <option key={opt.value || 'empty'} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Relevant Experience */}
            <div>
              <label htmlFor="relevent_experience">
                Relevant Experience *
              </label>
              <select
                id="relevent_experience"
                value={form.relevent_experience}
                onChange={(e) =>
                  handleChange('relevent_experience', e.target.value)
                }
                required
              >
                <option value="No relevant experience">
                  No relevant experience
                </option>
                <option value="Has relevant experience">
                  Has relevant experience
                </option>
              </select>
            </div>

            {/* Enrolled University */}
            <div>
              <label htmlFor="enrolled_university">Enrolled University</label>
              <select
                id="enrolled_university"
                value={form.enrolled_university}
                onChange={(e) =>
                  handleChange('enrolled_university', e.target.value)
                }
              >
                {UNIVERSITY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Education Level */}
            <div>
              <label htmlFor="education_level">Education Level</label>
              <select
                id="education_level"
                value={form.education_level}
                onChange={(e) =>
                  handleChange('education_level', e.target.value)
                }
              >
                {EDUCATION_LEVEL_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Major Discipline */}
            <div>
              <label htmlFor="major_discipline">Major Discipline</label>
              <select
                id="major_discipline"
                value={form.major_discipline}
                onChange={(e) =>
                  handleChange('major_discipline', e.target.value)
                }
              >
                {MAJOR_DISCIPLINE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Years of Experience */}
            <div>
              <label htmlFor="experience">Years of Experience</label>
              <select
                id="experience"
                value={form.experience}
                onChange={(e) => handleChange('experience', e.target.value)}
              >
                {EXPERIENCE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Company Size */}
            <div>
              <label htmlFor="company_size">Company Size</label>
              <select
                id="company_size"
                value={form.company_size}
                onChange={(e) => handleChange('company_size', e.target.value)}
              >
                {COMPANY_SIZE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Company Type */}
            <div>
              <label htmlFor="company_type">Company Type</label>
              <select
                id="company_type"
                value={form.company_type}
                onChange={(e) => handleChange('company_type', e.target.value)}
              >
                {COMPANY_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Last New Job */}
            <div>
              <label htmlFor="last_new_job">Last New Job</label>
              <select
                id="last_new_job"
                value={form.last_new_job}
                onChange={(e) => handleChange('last_new_job', e.target.value)}
              >
                {LAST_NEW_JOB_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Training Hours */}
            <div>
              <label htmlFor="training_hours">Training Hours *</label>
              <input
                id="training_hours"
                type="number"
                min="0"
                value={form.training_hours}
                onChange={(e) =>
                  handleChange('training_hours', e.target.value)
                }
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end',
            }}
          >
            <button
              type="button"
              onClick={handleReset}
              disabled={loading}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                backgroundColor: 'var(--color-bg-tertiary)',
                color: 'var(--color-text-primary)',
                border: `1px solid var(--color-border)`,
                borderRadius: 'var(--radius-md)',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'all 0.2s',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.5 : 1,
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    'var(--color-border)';
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  'var(--color-bg-tertiary)';
              }}
            >
              <RotateCcw size={16} />
              Reset
            </button>

            <button
              type="submit"
              disabled={loading}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                backgroundColor: 'var(--color-accent)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                fontSize: '14px',
                fontWeight: 600,
                transition: 'all 0.2s',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    'var(--color-accent-light)';
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  'var(--color-accent)';
              }}
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? 'Analyzing...' : 'Get Prediction'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
